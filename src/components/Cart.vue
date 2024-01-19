<script setup lang="ts">
import { reactive, watch } from 'vue';
import { IProduct } from '@/types/products';
import { store } from '@/store';

interface ICartState {
    cart: IProduct[];
    totalNet: number;
    totalVat: number;
    total: number;
}

const props = defineProps({
    countryCode: {
        type: String,
        required: true,
    }
});

const state = reactive<ICartState>({
    cart: [],
    totalNet: 0,
    totalVat: 0,
    total: 0,
});

const totalNet = (cart: IProduct[]): number => {
    const total = cart.map(({ price, quantity }) => (quantity ?? 0) * price)
        .reduce((acc, curr) => acc + curr, 0);
    return total ?? 0;
};

watch(
    [() => store.state.cart, () => props.countryCode], 
    ([cart, countryCode]) => {
        state.cart = cart;
        state.totalNet = totalNet(cart);

        // add get rates by countryCode
    }, 
    { deep: true }
);
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