import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/user";

import BaseView from "@/views/BaseView.vue";
import CreateView from "@/views/CreateView.vue";

import ListAllView from "@/views/ListAllView.vue";
import UpdateView from "@/views/UpdateView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import CodeModeView from "@/views/CodeModeView.vue";

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
                    requiresAuth: true,
                },
            },
            {
                path: "/editor/create",
                name: "CreateText",
                component: CreateView,
                meta: {
                    title: "Create Text",
                    requiresAuth: true,
                },
            },
            {
                path: "/editor/update/:id",
                name: "UpdateText",
                component: UpdateView,
                meta: {
                    title: "Update Text",
                    requiresAuth: true,
                },
            },
            {
                path: "/editor/codemode",
                name: "CodeMode",
                component: CodeModeView,
                meta: {
                    title: "Code Mode",
                    requiresAuth: true,
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
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            title: "Login",
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Editor`;

    const userStore = useUserStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!userStore.isLoggedIn) {
            next({ path: "/login" });
            return;
        }
    }
    next();
});

export default router;
