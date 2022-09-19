<template>
    <button
        class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
        "
    >
        <i :class="icon" />
        {{ text }}
    </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});
</script>

<style>
</style>