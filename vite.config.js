import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  server: {
    proxy: {
      "/ws": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      },
      "/app": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/topic": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ["sockjs-client"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
