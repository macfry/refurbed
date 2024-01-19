<script setup lang="ts">
import { PropType } from 'vue';
import { IProduct } from './../types/products';

defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true,
    },
});

const addToCart = (id: number) => {
    // to change
    // let product = state.products[id];
    // product.quantity = 1;
    // product.stock = product.stock - 1;
    // state.cart.push(product);
};
</script>

<template>
    <img class="w-32" :src="product.picture" />
    <h3 class="text-xl mb-2">{{ product.name }}</h3>
    <p class="mb-2">{{ product.price }}</p>
    <button
        class="
        py-2
        px-4
        bg-blue-500
        hover:bg-blue-700
        text-white
        rounded-lg
        shadow-md
        float-right
        "
        @click="addToCart(product.id)"
        :disabled="product.stock < 0"
    >
        Add to cart
    </button>
</template>