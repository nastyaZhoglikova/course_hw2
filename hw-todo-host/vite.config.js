import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    federation({
      name: "host-app",
      remotes: {
        list: "http://localhost:5172/assets/todoListRemoteEntry.js",
        auth: "http://localhost:5171/assets/todoAuthRemoteEntry.js",
        action: "http://localhost:5173/assets/todoActionRemoteEntry.js",
        // list: "https://hw-todo-list.vercel.app/assets/todoListRemoteEntry.js",
        // auth: "https://hw-todo-auth.vercel.app/assets/todoAuthRemoteEntry.js",
        // action: "https://hw-todo-action.vercel.app/assets/todoActionRemoteEntry.js",
      },
      shared: ["react", "react-dom", "@supabase/auth-ui-react", "@supabase/supabase-js", 'zustand', 'axios'],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
