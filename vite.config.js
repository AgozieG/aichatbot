import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: 'public',
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? "/" : "/aichatbot/",
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
});


