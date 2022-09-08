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
            <h1 class="text-2xl font-bold">Update Text</h1>
        </div>
        <div class="mx-auto max-w-screen-xl p-4">
            <form class="w-full pb-10" @submit.prevent="updateText">
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
                        Update text
                    </button>
                </div>
            </form>

            <QuillEditor
                theme="snow"
                ref="editor"
                placeholder="Enter content"
                v-model:content="content"
                contentType="html"
            />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import EditorService from "@/services/editor.service.js";

export default {
    name: "UpdateText",
    data() {
        return {
            title: "",
            content: ref(""),
        };
    },

    mounted() {},
    methods: {
        async updateText() {
            try {
                let updatedData = {
                    title: this.title,
                    content: JSON.stringify(this.content),
                };

                let response = await EditorService.updateData(
                    this.$route.params.id,
                    updatedData
                );

                if (response.status === 200) {
                    this.$router.push({ name: "Home" });
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        try {
            let response = await EditorService.getDataById(
                this.$route.params.id
            );

            this.title = response.data.data.title;

            this.$refs.editor.setHTML(JSON.parse(response.data.data.content));
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style>
.ql-editor {
    min-height: 500px;
}
</style>