import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: "./dist",
        sourcemap: true,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: "assets/js/[name].js",
                chunkFileNames: "assets/js/[name].js",
                assetFileNames: "assets/style/[name].[ext]",
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    base: "./",
});
