import { createFileRoute } from "@tanstack/react-router";
import { Drankkaart } from "../content/drankkaart";

export const Route = createFileRoute("/drankkaart")({
  head: () => ({
    meta: [
      { title: "Drankkaart, Café Josee Borgerhout" },
      { name: "description", content: "Koffie, thee, fris en huisgemaakte limonade bij Café Josee, met de prijzen van hun eigen kaart." },
      { property: "og:title", content: "Drankkaart, Café Josee" },
      { property: "og:description", content: "Koffie, thee, fris en huisgemaakte limonade." },
    ],
  }),
  component: Drankkaart,
});
