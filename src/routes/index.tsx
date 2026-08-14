import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../content/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Café Josee, buurtbar in Borgerhout" },
      { name: "description", content: "Koffie, ontbijt, lunch en taart op de hoek van de Vosstraat, aan het Te Boelaerpark. Sinds 14 augustus ook apero op vrijdag en zaterdag." },
      { property: "og:title", content: "Café Josee, buurtbar in Borgerhout" },
      { property: "og:description", content: "Koffie, ontbijt, lunch en taart aan het Te Boelaerpark." },
    ],
  }),
  component: Home,
});
