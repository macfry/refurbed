<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    options: {
        type: Array as PropType<string[]>,
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
            :selected="option === props.default"
            :value="option"
        >
            {{ option }}
        </option>
    </select>
</template>