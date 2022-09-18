import { createApp } from "vue";
import "@/assets/style.css";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import axios from "axios";

axios.defaults.baseURL = window.location.origin.includes("localhost")
    ? "http://localhost:3000/api"
    : "https://jsramverk-editor-isal-20.azurewebsites.net/api";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);

app.use(store).use(router).component("QuillEditor", QuillEditor).mount("#app");
