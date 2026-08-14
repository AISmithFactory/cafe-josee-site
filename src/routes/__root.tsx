// routes/__root.tsx -- root layout + document shell (TanStack Start). SPINE wiring.
// Owns the HTML shell so `lang` is hard-set here (S7.2), not left to the scaffold.
// HeadContent renders the merged root + per-route head() (S7.1).
import * as React from "react";
import {
  createRootRoute, Outlet, useRouterState, HeadContent, Scripts,
} from "@tanstack/react-router";
import { SiteHeader, SiteFooter, SkipLink } from "../components/spine";
import { nav, footerColumns, socials, legal, seo, facts } from "../content/site.config";
import "../styles/tokens.css";
import "../styles/spine.css";

// The real mark, extracted from the card Cafe Josee publishes as its own profile image:
// two teal cups over a green dome. Keyed off the printed card ground so it sits on any tone.
const Logo = (
  <span className="logo-lockup" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <img src="/cafe-josee-mark.png" alt="" width={26} height={34} style={{ display: "block" }} />
    <span>Cafe Josee</span>
  </span>
);

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <RootDocument>
      <SkipLink />
      <SiteHeader
        logo={Logo}
        nav={nav}
        currentPath={path}
        memberLink={undefined}
        cta={<a className="btn btn-action" href={facts.phoneHref}>Bel {facts.phone}</a>}
      />
      <Outlet />
      <SiteFooter
        logo={Logo}
        tagline="Buurtbar aan het Te Boelaerpark."
        address={<>{facts.address}<br />{facts.phone}</>}
        columns={footerColumns}
        socials={socials}
        legal={legal}
        legalLinks={[{ label: "Privacy", href: "/privacy" }]}
      />
    </RootDocument>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "Cafe Josee, buurtbar in Borgerhout" },
      { name: "description", content: "Koffie, ontbijt, lunch en taart aan het Te Boelaerpark. Sinds kort ook apero op vrijdag en zaterdag." },
      { property: "og:title", content: "Cafe Josee" },
      { property: "og:description", content: "Buurtbar met koffie, brunch, lunch, taart en apero aan het Te Boelaerpark." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_BE" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Demo/production privacy switch (S7): noindex while seo.noindex is true.
      ...(seo.noindex ? [{ name: "robots", content: "noindex,nofollow" }] : []),
      // NOTE: no og:image asset ships with the concept (declared in the charter);
      // add a 1200x630 card before go-live.
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://lh3.googleusercontent.com" },
      { rel: "icon", href: "/cafe-josee-mark.png" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..800&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: RootLayout,
});
