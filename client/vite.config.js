import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },

  optimizeDeps: {
    include: ["yup"],   // <-- this fixes yup not found
  },

  build: {
    commonjsOptions: {
      include: [/shared/, /node_modules/],   // IMPORTANT for shared folder
    }
  }
});
