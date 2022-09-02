<template>
    <header>
        <nav
            class="
                bg-white
                border-gray-200
                px-4
                lg:px-6
                py-2.5
                dark:bg-gray-800
            "
        >
            <div
                class="
                    flex flex-wrap
                    justify-between
                    items-center
                    mx-auto
                    max-w-screen-xl
                "
            >
                <router-link :to="{ name: 'Home' }" class="flex items-center">
                    <span
                        class="
                            self-center
                            text-xl
                            font-semibold
                            whitespace-nowrap
                            dark:text-white
                        "
                        >Editor</span
                    >
                </router-link>
                <div class="flex items-center lg:order-2">
                    <ButtonItem
                        text="Save"
                        icon="fa-solid fa-floppy-disk mr-2"
                    />
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import ButtonItem from "@/components/Button/Button.vue";
export default {
    name: "HeaderItem",
    components: {
        ButtonItem,
    },
};
</script>

<style>
</style>