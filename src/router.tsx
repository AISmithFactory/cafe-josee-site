// src/router.tsx — TanStack Start router factory. The Start Vite plugin requires this
// entry; it wires the generated routeTree to the router used for SSR/prerender + client.
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
