<template>
    <HeaderItem />
    <router-view />
</template>

<script>
import HeaderItem from "@/components/Header/Header.vue";
export default {
    name: "BaseItem",
    components: {
        HeaderItem,
    },
};
</script>

<style>
</style>