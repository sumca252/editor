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
                                mb-2
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
                    <p
                        class="
                            mb-3
                            font-normal
                            text-gray-700
                            dark:text-gray-400
                        "
                    >
                        {{ item.content }}
                    </p>
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
import { ref } from "vue";
import EditorService from "@/services/editor.service.js";

const documents = ref({});

const getDocuments = async () => {
    try {
        let response = await EditorService.getAllData();

        documents.value = response.data.data;
        documents.value.forEach((item) => {
            let regex = /(<([^>]+)>)/gi; // regex to remove html tags
            item.content = JSON.parse(item.content); // parse content to JSON
            item.content = item.content // remove html tags
                .replace(regex, "")
                .substring(0, 100);
        });
    } catch (error) {
        console.log(error);
    }
};

// created hook
getDocuments();
</script>
