import { createFileRoute } from "@tanstack/react-router";
import { Praktisch } from "../content/praktisch";

export const Route = createFileRoute("/praktisch")({
  head: () => ({
    meta: [
      { title: "Openingsuren en adres, Café Josee Borgerhout" },
      { name: "description", content: "Vosstraat 2, 2140 Borgerhout. Openingsuren, kaart en contact voor Café Josee." },
      { property: "og:title", content: "Openingsuren en adres, Café Josee" },
      { property: "og:description", content: "Vosstraat 2, 2140 Borgerhout. Openingsuren, kaart en contact." },
    ],
  }),
  component: Praktisch,
});
