import { createRouter, createWebHistory } from "vue-router";
import Base from "@/views/Base.vue";
import ListAll from "@/views/ListAll.vue";
import CreateText from "@/views/CreateText.vue";
import UpdateText from "@/views/UpdateText.vue";

const routes = [
    {
        path: "/",
        name: "Base",
        component: Base,
        children: [
            {
                path: "/",
                name: "Home",
                component: ListAll,
                meta: {
                    title: "Home",
                },
            },
            {
                path: "/editor/create",
                name: "CreateText",
                component: CreateText,
                meta: {
                    title: "Create Text",
                },
            },
            {
                path: "/editor/update/:id",
                name: "UpdateText",
                component: UpdateText,
                meta: {
                    title: "Update Text",
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Editor`;
    next();
});

export default router;
