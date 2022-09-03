import { createRouter, createWebHistory } from "vue-router";
import Base from "@/views/Base.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Base",
        component: Base,
        children: [
            {
                path: "/",
                name: "Home",
                component: Home,
                meta: {
                    title: "Home",
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
