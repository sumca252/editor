import { createStore } from "vuex";
import editor from "./modules/editor";

const store = createStore({
    modules: {
        editor,
    },
});

export default store;
