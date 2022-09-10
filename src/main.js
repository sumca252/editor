import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import axios from "axios";

axios.defaults.baseURL =
    import.meta.env.VITE_AZURE_API_URL || "http://localhost:3000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

createApp(App)
    .use(store)
    .use(router)
    .component("QuillEditor", QuillEditor)
    .mount("#app");
