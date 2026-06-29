// routes/cultural.tsx — /cultural route. Composition lives in content/cultural.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Cultural } from "../content/cultural";

export const Route = createFileRoute("/cultural")({
  head: () => ({
    meta: [
      { title: "AI Smith for cultural organisations" },
      { name: "description", content: "Supporters, events, documents, and grant drafting in one place built for a cultural non-profit. Owned by the organisation. Running today at Zuidgeluid." },
      { property: "og:title", content: "AI Smith for cultural organisations" },
      { property: "og:description", content: "Supporters, events, documents, and grant drafting in one place built for a cultural non-profit. Owned by the organisation. Running today at Zuidgeluid." },
    ],
  }),
  component: Cultural,
});
