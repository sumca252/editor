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
        <h1 class="text-2xl font-bold">Codemode</h1>
        <div class="flex justify-between items-center">
            <button
                @click="saveFile"
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
                    mr-2
                "
            >
                <i class="fas fa-floppy-disk mr-2"></i>
                Save
            </button>
            <button
                @click="executeCode"
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
                    mr-2
                "
            >
                <i class="fa-solid fa-terminal mr-2"></i>
                Execute code
            </button>
        </div>
    </div>
    <div class="container mx-auto max-w-screen-xl p-4">
        <Codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '700px' }"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions"
            @ready="handleReady"
            border
        />
    </div>
</template>
<script setup>
/**
 * imports
 */
import { ref, shallowRef } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useUserStore } from "@/store/user";
import CodeService from "@/services/code.service.js";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";

/**
 * config for codemirror
 */
const extensions = [javascript(), dracula];

/**
 * refs
 */
const view = shallowRef();
const code = ref(`const add = (num1, num2) => {
    return num1 + num2;
}

console.log(add(1, 2)); // output: 3
`);

/**
 * store
 */
const userStore = useUserStore();

/**
 * methods
 */

const handleReady = (payload) => {
    view.value = payload.view;
};

const executeCode = async () => {
    try {
        const code = btoa(view.value.state.doc.toString());
        const response = await CodeService.executeCode(code);
        const output = atob(response.data.data);
        if (response.status != 201) {
            view.value.dispatch({
                changes: {
                    from: 0,
                    to: view.value.state.doc.length,
                    insert: `Error: ${response.data.message}`,
                },
            });
        }

        view.value.dispatch({
            changes: {
                from: 0,
                to: view.value.state.doc.length,
                insert: `Output: ${output}`,
            },
        });
    } catch (error) {
        throw new Error(error);
    }
};

const saveFile = async () => {
    // save file to database as blob
    try {
        const code = view.value.state.doc.toString();
        const data = btoa(code);

        const response = await CodeService.saveCode({
            author: userStore.user.email,
            code: data,
        });

        if (response.status != 201) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }

        await Swal.fire({
            title: "Success!",
            text: "File saved successfully!",
            icon: "success",
            confirmButtonText: "Ok",
        });

        saveCodeAsFile(code);
    } catch (error) {
        throw new Error(error);
    }
};

const saveCodeAsFile = (code) => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });

    saveAs(blob, "code.js");
};
</script>
