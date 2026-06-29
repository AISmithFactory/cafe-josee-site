// routes/ownership.tsx — /ownership route. Composition lives in content/ownership.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Ownership } from "../content/ownership";

export const Route = createFileRoute("/ownership")({
  head: () => ({
    meta: [
      { title: "Your hub, your data · AI Smith" },
      { name: "description", content: "Owned by you from day one, run by us. Export any time, take the whole instance, and a written safety net. Independence built into how it is owned." },
      { property: "og:title", content: "Your hub, your data · AI Smith" },
      { property: "og:description", content: "Owned by you from day one, run by us. Export any time, take the whole instance, and a written safety net. Independence built into how it is owned." },
    ],
  }),
  component: Ownership,
});
