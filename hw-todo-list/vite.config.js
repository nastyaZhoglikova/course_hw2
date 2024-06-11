import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "todoList",
      filename: "todoListRemoteEntry.js",
      exposes: {
        "./TodoList": "./src/App.jsx",
      },
      shared: ["react", "react-dom", 'axios', 'zustand', '@supabase/supabase-js', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },})
