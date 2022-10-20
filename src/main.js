import "@/assets/style.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import App from "@/App.vue";
import { QuillEditor } from "@vueup/vue-quill";
import axios from "axios";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

const url = "https://jsramverk-editor-isal-20.azurewebsites.net/api";

axios.defaults.baseURL = url;


const app = createApp(App);

app.use(createPinia())
    .use(router)
    .component("QuillEditor", QuillEditor)
    .mount("#app");
