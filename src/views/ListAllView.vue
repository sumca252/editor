<template>
    <div
        class="
            flex flex-wrap
            justify-between
            items-center
            mx-auto
            max-w-screen-xl
            p-6
        "
    >
        <h1 class="text-2xl font-bold">All Documents</h1>
        <RouterLink
            :to="{ name: 'CreateText' }"
            class="
                bg-transparent
                hover:bg-blue-500
                text-blue-700
                font-semibold
                hover:text-white
                py-2
                px-4
                border border-blue-500
                hover:border-transparent
                rounded
            "
        >
            <i class="fas fa-plus mr-2"></i>
            Create new text
        </RouterLink>
    </div>
    <div>
        <div
            class="
                grid grid-cols-1
                sm:grid-cols-1
                md:grid-cols-3
                lg:grid-cols-3
                xl:grid-cols-3
                gap-4
                mx-auto
                max-w-screen-xl
                p-6
            "
        >
            <div v-for="(item, index) in documents" :key="index">
                <div
                    class="
                        p-6
                        max-w-full
                        bg-white
                        rounded-lg
                        border border-gray-200
                        shadow-md
                        dark:bg-gray-800 dark:border-gray-700
                    "
                >
                    <RouterLink
                        :to="{ name: 'UpdateText', params: { id: item._id } }"
                    >
                        <h5
                            class="
                                mb-6
                                text-2xl
                                font-bold
                                tracking-tight
                                text-gray-900
                                dark:text-white
                            "
                        >
                            {{ item.title }}
                        </h5>
                    </RouterLink>

                    <RouterLink
                        :to="{ name: 'UpdateText', params: { id: item._id } }"
                        class="
                            text-underlined
                            inline-flex
                            items-center
                            py-2
                            px-3
                            text-sm
                            font-medium
                            text-center text-white
                            bg-blue-700
                            rounded-lg
                            hover:bg-blue-800
                            focus:ring-4 focus:outline-none focus:ring-blue-300
                            dark:bg-blue-600
                            dark:hover:bg-blue-700
                            dark:focus:ring-blue-800
                        "
                    >
                        <i class="fas fa-eye mr-2"></i>
                        View
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 * imports
 */
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import EditorService from "@/services/editor.service";

/**
 * refs
 */
const documents = ref({});

/**
 * store
 */
const userStore = useUserStore();

/**
 * methods
 */
const getDocuments = async () => {
    try {
        const email = userStore.getUserEmail;
        const response = await EditorService.getAllData();
        let temp = [];
        if (response.status === 200) {
            temp = response.data.data.filter((doc) => {
                if (doc.author === email || doc.allowed_users.includes(email)) {
                    return doc;
                }
            });
            documents.value = temp;
        }
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * lifecycle hooks
 */
onMounted(() => {
    getDocuments();
});
</script>
