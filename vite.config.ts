import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import viteReact from "@vitejs/plugin-react";

// aismith-site-seed — TanStack Start (Vite plugin) targeting Netlify, all routes
// prerendered to static HTML (SSG). The `pages` list is the seed's reference instance;
// a build reskins content and updates this list to the client's actual route set.
export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [
        { path: "/" },
        { path: "/restaurants" },
        { path: "/cultural" },
        { path: "/ownership" },
        { path: "/plans" },
        { path: "/website" },
        { path: "/privacy" },
      ],
    }),
    netlify(),
    viteReact(),
  ],
});
