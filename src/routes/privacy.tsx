// routes/privacy.tsx — /privacy. Renders the CORE PrivacyNotice from site.config (S7.4).
import { createFileRoute } from "@tanstack/react-router";
import { PrivacyNotice } from "../components/spine";
import { privacy } from "../content/site.config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy · AI Smith" },
      { name: "description", content: "How AI Smith handles your personal data." },
    ],
  }),
  component: () => <PrivacyNotice {...privacy} />,
});
