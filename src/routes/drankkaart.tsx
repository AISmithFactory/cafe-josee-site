import { createFileRoute } from "@tanstack/react-router";
import { Drankkaart } from "../content/drankkaart";

export const Route = createFileRoute("/drankkaart")({
  head: () => ({
    meta: [
      { title: "Drankkaart, Cafe Josee Borgerhout" },
      { name: "description", content: "Koffie, thee, fris en huisgemaakte limonade bij Cafe Josee, met de prijzen van hun eigen kaart." },
      { property: "og:title", content: "Drankkaart, Cafe Josee" },
      { property: "og:description", content: "Koffie, thee, fris en huisgemaakte limonade." },
    ],
  }),
  component: Drankkaart,
});
