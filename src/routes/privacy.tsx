// routes/privacy.tsx -- /privacy. Renders the CORE PrivacyNotice from site.config (S7.4).
import { createFileRoute } from "@tanstack/react-router";
import { PrivacyNotice } from "../components/spine";
import { privacy } from "../content/site.config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacyverklaring, Cafe Josee" },
      { name: "description", content: "Hoe deze site met je gegevens omgaat." },
    ],
  }),
  component: () => <PrivacyNotice {...privacy} />,
});
