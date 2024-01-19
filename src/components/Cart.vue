<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { IProduct } from '@/types/products';
import { store } from '@/store';
import { EMethods, ICurrencyResponse, ICurrencyResponseError, IRatesResponse } from '@/types/api';
import { API_CURRENCY_KEY, API_CURRENCY_URL, API_VAT_PUBLIC_KEY, API_VAT_URL } from '@/config';

interface ICartState {
    cart: IProduct[];
    totalNet: number;
    totalVat: number;
    total: number;
}

const props = defineProps({
    market: {
        type: String,
        required: true,
    }
});

const abortController = new AbortController();

const state = reactive<ICartState>({
    cart: [],
    totalNet: 0,
    totalVat: 0,
    total: 0,
});

const loading = ref(false);
const error = ref<string | null>(null);

const totalNet = (cart: IProduct[]): number => {
    const total = cart.map(({ price, quantity }) => (quantity ?? 0) * price)
        .reduce((acc, curr) => acc + curr, 0);
    return total ?? 0;
};

const exchangeRates = async () => {
    loading.value = true;
    error.value = null;

    try {
        const options = {
            method: EMethods.GET,
            signal: abortController.signal,
        };
        const url = `${API_CURRENCY_URL}live?access_key=${API_CURRENCY_KEY}&source=EUR`;
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ICurrencyResponseError | ICurrencyResponse;
        if (!data.success) {
            throw new Error(`${data.error.info}`)
        }
        return data as ICurrencyResponse;
    } catch (err) {
        if (error?.name !== 'CanceledError') {
            error.value = err?.message ?? 'Something goes wrong.';
        }
        return null;
    } finally {
        loading.value = false;
    }
};

const vatRates = async () => {
    loading.value = true;
    error.value = null;

    try {
        const options = {
            method: EMethods.GET,
            signal: abortController.signal,
            headers: { 'X-API-KEY': API_VAT_PUBLIC_KEY },
        };
        const url = `${API_VAT_URL}rates`;
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as IRatesResponse;
        return data;
    } catch (err) {
        if (error?.name !== 'CanceledError') {
            error.value = err?.message ?? 'Something goes wrong.';
        }
        return null;
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await exchangeRates();
    await vatRates();
});

watch(
    [() => store.state.cart, () => props.market], 
    ([cart, market]) => {
        state.cart = cart;
        state.totalNet = totalNet(cart);

        // add get rates by countryCode
    }, 
    { deep: true }
);

onBeforeUnmount(() => {
    abortController.abort();
});
</script>

<template>
    <div class="p-4 m-4 bg-white shadow-md">
        <h2 class="text-2xl mb-2">Cart</h2>
        <hr />
        <table class="table-fixed">
            <thead>
            <tr>
                <th class="w-1/2 text-left p-2">Product</th>
                <th class="w-1/4 p-2">Quantity</th>
                <th class="w-1/4 text-right p-2">Price</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="product in state.cart" :key="product.id">
                <td class="p-2">{{ product.name }}</td>
                <td class="p-2">{{ product.quantity }}</td>
                <td class="p-2">{{ product.price }}</td>
            </tr>
            </tbody>
        </table>
        <hr />
        <p class="m-2">Net: {{ state.totalNet }}</p>
        <p class="m-2">VAT: {{ state.totalVat }}</p>
        <p class="m-2 font-bold">Total: {{ state.total }}</p>
    </div>
</template>