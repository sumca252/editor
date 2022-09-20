<template>
    <div>
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
            <h1 class="text-2xl font-bold">Create Text</h1>
        </div>
        <div class="mx-auto max-w-screen-xl p-4">
            <form class="w-full pb-10" @submit.prevent="saveText">
                <div class="flex items-center border-b border-gray-500 py-2">
                    <input
                        class="
                            appearance-none
                            bg-transparent
                            border-none
                            w-full
                            text-gray-700
                            mr-3
                            py-1
                            px-2
                            leading-tight
                            focus:outline-none
                        "
                        type="text"
                        placeholder="Enter title"
                        v-model="title"
                    />
                    <button
                        class="
                            flex-shrink-0
                            bg-gray-500
                            hover:bg-gray-700
                            border-gray-500
                            hover:border-gray-700
                            text-sm
                            border-4
                            text-white
                            py-1
                            px-2
                            rounded
                        "
                        type="submit"
                    >
                        <i class="fas fa-floppy-disk mr-2"></i>
                        Save text
                    </button>
                </div>
            </form>
            <QuillEditor
                theme="snow"
                ref="editor"
                placeholder="Enter content"
                v-model:content="content"
                contentType="delta"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EditorService from "@/services/editor.service.js";

const title = ref("");
const content = ref("");
const router = useRouter();
const editorRef = ref(null);

/**
 * Method to save text
 */
const saveText = async () => {
    try {
        console.log("Data to be saved", content);
        let response = await EditorService.saveData({
            title: title.value,
            content: JSON.stringify(content.value),
        });

        if (response.status === 201) {
            router.push({ name: "Home" });
        }
    } catch (error) {
        console.log(error);
    }
};
</script>


<style>
.ql-editor {
    min-height: 500px;
}
</style>