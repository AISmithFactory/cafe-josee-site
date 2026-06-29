// routes/website.tsx — /website route. Composition lives in content/website.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Website } from "../content/website";

export const Route = createFileRoute("/website")({
  head: () => ({
    meta: [
      { title: "The website option · AI Smith" },
      { name: "description", content: "An optional add-on, not the main product. If you also need a public website, we can build it on the same foundation, so the whole presence is yours to keep." },
      { property: "og:title", content: "The website option · AI Smith" },
      { property: "og:description", content: "An optional add-on, not the main product. If you also need a public website, we can build it on the same foundation, so the whole presence is yours to keep." },
    ],
  }),
  component: Website,
});
