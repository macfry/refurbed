<script setup lang="ts">
import { PropType } from 'vue';
import { IMarketOption } from './../types/products';

const props = defineProps({
    options: {
        type: Array as PropType<IMarketOption[]>,
        required: true,
    },
    default: {
        type: String,
    },
});

const emits = defineEmits(['update:modelValue']);

const onChage = (event: Event) => {
    const selectedOption = event.target?.value ?? '';
    emits('update:modelValue', selectedOption);
};
</script>

<template>
    <select
        class="bg-white text-xs border border-gray-200 rounded p-2 float-right"
        @change="onChage"
     >
        <option 
            v-for="option in props.options" 
            :selected="option.value === props.default"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>