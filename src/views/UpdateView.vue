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
            <div class="flex justify-between items-center">
                <button
                    @click="exportAsPDF"
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
                    <i class="fas fa-download"></i>
                    Export as PDF
                </button>
                <button
                    @click="sendInviteToEditDocument"
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
                    <i class="fa-solid fa-envelope"></i>
                    Send invite
                </button>
            </div>
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
                        type="text"
                        name="email"
                        placeholder="Seperate emails with commas"
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
                toolbar="#toolbar"
            >
                <template #toolbar>
                    <div id="toolbar">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                        <button class="ql-strike"></button>
                        <button
                            id="custom-button"
                            @click="addComment"
                            class="
                                flex
                                items-center
                                justify-center
                                bg-gray-500
                                hover:bg-gray-700
                                border-gray-500
                                hover:border-gray-700
                                text-md
                                border-4
                            "
                        >
                            comment
                        </button>
                    </div>
                </template>
            </QuillEditor>
            <div id="comments" class="mt-5" v-if="comments.length > 0">
                <h1
                    class="text-2xl font-bold mb-2 dark:text-gray-50 text-black"
                >
                    Comments
                </h1>
                <div
                    id="comments-bubble"
                    class="
                        flex flex-col
                        justify-start
                        items-start
                        w-full
                        h-full
                        p-1
                        py-2
                        rounded
                    "
                >
                    <span
                        class="
                            darK:border-gray-700
                            dark:bg-gray-800 dark:text-blue-300
                            bg-white
                            text-blue-600
                            border border-gray-300
                            text-xs
                            rounded
                            px-3
                            py-3
                            mb-2
                            cursor-pointer
                            w-full
                        "
                        v-for="comment in comments"
                        :key="comment._id"
                    >
                        <span class="no-underline text-gray-700">
                            <span class="no-underline"
                                >{{ comment.author }}
                                <span
                                    class="text-black comment underline"
                                    @click="markComment(comment)"
                                >
                                    {{ comment.comment }}
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 * imports
 */
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { io } from "socket.io-client";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";

import EditorService from "@/services/editor.service";
import EmailService from "@/services/email.service";
import { useUserStore } from "@/store/user";

/**
 * socket
 */
const url = window.location.origin.includes("localhost")
    ? "http://localhost:3000"
    : "https://jsramverk-editor-isal-20.azurewebsites.net";

const socket = io(url);

/**
 * refs
 */
const editorRef = ref({});
const email = ref("");
const title = ref("");
const content = ref("");
const docRef = ref(false);

const comments = ref([]);
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

const exportAsPDF = () => {
    const quill = editorRef.value.getQuill();
    const content = quill.root.innerHTML;

    const options = {
        margin: 1,
        filename: `${title.value}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // console.log("exporting editor content as pdf");
    html2pdf().from(content).set(options).save();
};

const addComment = () => {
    const quill = editorRef.value.getQuill();
    const selection = quill.getSelection();

    if (selection) {
        // console.log("selection", selection);
        Swal.fire({
            title: "Add comment",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Add",
            showLoaderOnConfirm: true,
            preConfirm: async (comment) => {
                if (comment) {
                    comments.value.push({
                        documentId: route.params.id,
                        author: userStore.user.email,
                        range: JSON.stringify(selection),
                        comment: comment,
                    });

                    let reponse = await EditorService.insertComment({
                        documentId: route.params.id,
                        author: userStore.user.email,
                        range: JSON.stringify(selection),
                        comment: comment,
                    });

                    if (reponse.status === 200) {
                        await updateText();
                        quill.formatText(
                            selection.index,
                            selection.length,
                            "background",
                            "yellow"
                        );

                        Swal.fire({
                            title: "Comment added",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    }
};

const getCommentsByDocumentId = async () => {
    try {
        let response = await EditorService.getCommentsByDocumentId(
            route.params.id
        );

        if (response.status === 200) {
            comments.value = response.data.data.filter((comment) => {
                if (comment.documentId === route.params.id) {
                    return comment;
                }
            });

            comments.value.forEach((comment) => {
                const quill = editorRef.value.getQuill();
                const range = JSON.parse(comment.range);

                quill.formatText(
                    range.index,
                    range.length,
                    "background",
                    "yellow"
                );

                // console.log("comment: ", comment.comment);
            });
        } else {
            comments.value = [];
        }
    } catch (error) {
        console.log("error", error);
    }
};

const markComment = (comment) => {
    const quill = editorRef.value.getQuill();
    const range = JSON.parse(comment.range);

    quill.setSelection(range.index, range.length);
};

const sendInviteToEditDocument = async () => {
    const from = import.meta.env.MAILGUN_FROM_EMAIL;

    const html = `
            <div class="mb-6">
                <label
                    for="email"
                    class="
                        float-left
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-gray-900
                        dark:text-gray-300
                    "
                    >From</label
                >
                <select
                    id="emailFrom"
                    class="
                        bg-gray-50
                        border border-gray-300
                        text-gray-900 text-sm
                        rounded-lg
                        focus:ring-blue-500 focus:border-blue-500
                        block
                        w-full
                        p-2.5
                        dark:bg-gray-700
                        dark:border-gray-600
                        dark:placeholder-gray-400
                        dark:text-white
                        dark:focus:ring-blue-500
                        dark:focus:border-blue-500
                    "
                >
                    <option>${import.meta.env.VITE_MAILGUN_FROM_EMAIL}</option>
                    <option>${
                        import.meta.env.VITE_MAILGUN_FROM_EMAIL_ONE
                    }</option>
                    <option>${
                        import.meta.env.VITE_MAILGUN_FROM_EMAIL_TWO
                    }</option>
                </select>
            </div>
            <div class="mb-6">
                <label
                    for="email"
                    class="
                        float-left
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-gray-900
                        dark:text-gray-300
                    "
                    >To</label
                >
                <select
                    id="emailTo"
                    class="
                        bg-gray-50
                        border border-gray-300
                        text-gray-900 text-sm
                        rounded-lg
                        focus:ring-blue-500 focus:border-blue-500
                        block
                        w-full
                        p-2.5
                        dark:bg-gray-700
                        dark:border-gray-600
                        dark:placeholder-gray-400
                        dark:text-white
                        dark:focus:ring-blue-500
                        dark:focus:border-blue-500
                    "
                >
                    <option>${import.meta.env.VITE_MAILGUN_FROM_EMAIL}</option>
                    <option>${
                        import.meta.env.VITE_MAILGUN_FROM_EMAIL_ONE
                    }</option>
                    <option>${
                        import.meta.env.VITE_MAILGUN_FROM_EMAIL_TWO
                    }</option>
                </select>
            </div>
           
            `;
    try {
        // swall alert input email

        Swal.fire({
            title: "Invite a user to edit document",
            html: html,
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Send invite",
            showLoaderOnConfirm: true,
            preConfirm: async (status) => {
                if (status) {
                    const emailTo = document.getElementById("emailTo").value;
                    const emailFrom =
                        document.getElementById("emailFrom").value;

                    try {
                        const response =
                            await EmailService.sendInviteToEditDocument({
                                from: emailFrom,
                                to: emailTo,
                                documentId: route.params.id,
                            });

                        if (response.status === 200) {
                            Swal.fire({
                                title: "Invite sent successfully",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title: "Error sending invite",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
            backdrop: true,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * lifecycle Hooks
 */

onMounted(() => {
    getDataById();
    getCommentsByDocumentId();
    editorRef.value.getQuill().focus();
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

#custom-button {
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    width: inherit;
}
</style>