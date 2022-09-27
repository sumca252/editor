import { createRouter, createWebHistory } from "vue-router";
import BaseView from "@/views/BaseView.vue";
import CreateView from "@/views/CreateView.vue";
import ListAllView from "@/views/ListAllView.vue";
import UpdateView from "@/views/UpdateView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
    {
        path: "/",
        name: "BaseView",
        component: BaseView,
        children: [
            {
                path: "/",
                name: "Home",
                component: ListAllView,
                meta: {
                    title: "Home",
                },
            },
            {
                path: "/editor/create",
                name: "CreateText",
                component: CreateView,
                meta: {
                    title: "Create Text",
                },
            },
            {
                path: "/editor/update/:id",
                name: "UpdateText",
                component: UpdateView,
                meta: {
                    title: "Update Text",
                },
            },
        ],
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
        meta: {
            title: "Register",
        },
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
