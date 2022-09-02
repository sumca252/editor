import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Base",
        component: () => import("@/views/Base.vue"),
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import("@/views/Home.vue"),
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
