import { createRouter, createWebHashHistory } from "vue-router";

const routes: Array<any> = [
    {
        path: "/",
        name: "file",
        component: () =>
            import("@/pages/file-page.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import("@/pages/search-page.vue")
    },
    {
        path: "/picture",
        name: "picture",
        component: () =>
            import("@/pages/picture-page.vue")
    },
    {
        path: "/video",
        name: "video",
        component: () =>
            import("@/pages/video-page.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
