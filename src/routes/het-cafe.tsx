import { createFileRoute } from "@tanstack/react-router";
import { HetCafe } from "../content/hetcafe";

export const Route = createFileRoute("/het-cafe")({
  head: () => ({
    meta: [
      { title: "Het cafe en de buurt, Cafe Josee Borgerhout" },
      { name: "description", content: "De zaal, de open keuken en de Boelaerbuurt rond Cafe Josee, op de hoek van de Vosstraat en de Gitschotellei." },
      { property: "og:title", content: "Het cafe en de buurt, Cafe Josee" },
      { property: "og:description", content: "De zaal, de open keuken en de Boelaerbuurt." },
    ],
  }),
  component: HetCafe,
});
