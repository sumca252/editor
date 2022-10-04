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
                    <label class="text-gray-600 font-bold">Shared</label>
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
                        type="email"
                        name="email"
                        v-model="email"
                        :disabled="!docRef"
                    />
                </div>
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
                        name="title"
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
                ref="editorRef"
                placeholder="Enter content"
                v-model:content="content"
                contentType="delta"
                @textChange="onTextChange"
            />
        </div>
    </div>
</template>
<script setup>
/**
 * imports
 */
import { ref, onMounted, watch, watchEffect, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { io } from "socket.io-client";
import EditorService from "../services/editor.service";
import { useUserStore } from "../store/user";

/**
 * socket
 */
const socket = io("https://jsramverk-editor-isal-20.azurewebsites.net");

/**
 * refs
 */
const editorRef = ref({});
const email = ref("");
const title = ref("");
const content = ref("");
const docRef = ref(false);

/**
 * store
 */

const userStore = useUserStore();

/**
 * router
 */
const route = useRoute();
const router = useRouter();

/**
 * methods
 */
const updateText = async () => {
    try {
        let updatedData = {
            title: title.value,
            content: JSON.stringify(content.value),
            email: email.value,
        };

        let response = await EditorService.updateData(
            route.params.id,
            updatedData
        );

        if (response.status === 200) {
            router.push({ name: "Home" });
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getDataById = async () => {
    try {
        let response = await EditorService.getDataById(route.params.id);

        email.value = response.data.data.allowed_users;
        title.value = response.data.data.title;
        editorRef.value.setContents(JSON.parse(response.data.data.content));

        if (response.data.data.author === userStore.user.email) {
            docRef.value = true;
        }
    } catch (error) {
        console.log(error);
    }
};

const onTextChange = (delta) => {
    socket.emit("send-changes", delta, route.params.id);
};

/**
 * lifecycle Hooks
 */

onMounted(() => {
    getDataById();
    socket.emit("update-document", route.params.id);

    socket.on("receive-changes", (document) => {
        editorRef.value.getQuill().updateContents(document.delta.ops);
    });
});

onUnmounted(() => {
    socket.disconnect();
});
</script>

<style>
.ql-editor {
    min-height: 500px;
}
</style>