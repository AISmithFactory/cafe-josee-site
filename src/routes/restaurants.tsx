// routes/restaurants.tsx — /restaurants route. Composition lives in content/restaurants.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Restaurants } from "../content/restaurants";

export const Route = createFileRoute("/restaurants")({
  head: () => ({
    meta: [
      { title: "AI Smith for restaurants · Software that speaks restaurant" },
      { name: "description", content: "One place that runs rotas, menus, content, and payments, built for how a restaurant works and yours to keep. Running today at Simone's Kitchen, Antwerp." },
      { property: "og:title", content: "AI Smith for restaurants · Software that speaks restaurant" },
      { property: "og:description", content: "One place that runs rotas, menus, content, and payments, built for how a restaurant works and yours to keep. Running today at Simone's Kitchen, Antwerp." },
    ],
  }),
  component: Restaurants,
});
