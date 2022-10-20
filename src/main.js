import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/style.css";

import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
const url =  "https://jsramverk-editor-isal-20.azurewebsites.net/api";

axios.defaults.baseURL = url;

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);

app.use(createPinia())
    .use(router)
    .component("QuillEditor", QuillEditor)
    .mount("#app");
