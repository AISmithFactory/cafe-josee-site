// routes/index.tsx — / route. Composition lives in content/home.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../content/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Smith · Software that already speaks your organisation" },
      { name: "description", content: "Made to fit. Yours to keep. Software built for how your organisation works, run for you, and yours to keep." },
      { property: "og:title", content: "AI Smith · Software that already speaks your organisation" },
      { property: "og:description", content: "Made to fit. Yours to keep. Software built for how your organisation works, run for you, and yours to keep." },
    ],
  }),
  component: Home,
});
