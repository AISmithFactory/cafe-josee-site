import { createFileRoute } from "@tanstack/react-router";
import { Apero } from "../content/apero";

export const Route = createFileRoute("/apero")({
  head: () => ({
    meta: [
      { title: "Apero op vrijdag en zaterdag, Cafe Josee" },
      { name: "description", content: "Sinds 14 augustus 2026 open op vrijdag en zaterdag van 17.00 tot 23.00 uur, met spritz en het Josee Borrelbord." },
      { property: "og:title", content: "Apero op vrijdag en zaterdag, Cafe Josee" },
      { property: "og:description", content: "Vrijdag en zaterdag van 17.00 tot 23.00 uur." },
    ],
  }),
  component: Apero,
});
