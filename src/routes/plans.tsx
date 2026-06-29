// routes/plans.tsx — /plans route. Composition lives in content/plans.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Plans } from "../content/plans";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Plans · AI Smith" },
      { name: "description", content: "A managed plan, low to start and monthly after. We set it up and run it. No revenue share. Yours to export or take whole, any time. Prices exclude VAT." },
      { property: "og:title", content: "Plans · AI Smith" },
      { property: "og:description", content: "A managed plan, low to start and monthly after. We set it up and run it. No revenue share. Yours to export or take whole, any time. Prices exclude VAT." },
    ],
  }),
  component: Plans,
});
