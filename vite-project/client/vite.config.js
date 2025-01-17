import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs", // Explicitly set the path if needed
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:8800",
          changeOrigin: true,
        },
      },
    },
  

  },
});
