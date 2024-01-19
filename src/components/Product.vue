<script setup lang="ts">
import { PropType } from 'vue';
import { IProduct } from './../types/products';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';

const store = useStore();

defineProps({
    product: {
        type: Object as PropType<IProduct>,
        required: true,
    },
});

const addToCart = (product: IProduct) => {
    store.commit(MutationTypes.ADD_TO_CART, product);
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
        @click="addToCart(product)"
        :disabled="product.stock < 1"
    >
        Add to cart
    </button>
</template>