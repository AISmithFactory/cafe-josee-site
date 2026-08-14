import { createFileRoute } from "@tanstack/react-router";
import { HetCafe } from "../content/hetcafe";

export const Route = createFileRoute("/het-cafe")({
  head: () => ({
    meta: [
      { title: "Het café en de buurt, Café Josee Borgerhout" },
      { name: "description", content: "De zaal, de open keuken en de Boelaerbuurt rond Café Josee, op de hoek van de Vosstraat en de Gitschotellei." },
      { property: "og:title", content: "Het café en de buurt, Café Josee" },
      { property: "og:description", content: "De zaal, de open keuken en de Boelaerbuurt." },
    ],
  }),
  component: HetCafe,
});
