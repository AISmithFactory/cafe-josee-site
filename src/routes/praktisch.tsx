import { createFileRoute } from "@tanstack/react-router";
import { Praktisch } from "../content/praktisch";

export const Route = createFileRoute("/praktisch")({
  head: () => ({
    meta: [
      { title: "Openingsuren en adres, Cafe Josee Borgerhout" },
      { name: "description", content: "Vosstraat 2, 2140 Borgerhout. Openingsuren, kaart en contact voor Cafe Josee." },
      { property: "og:title", content: "Openingsuren en adres, Cafe Josee" },
      { property: "og:description", content: "Vosstraat 2, 2140 Borgerhout. Openingsuren, kaart en contact." },
    ],
  }),
  component: Praktisch,
});
