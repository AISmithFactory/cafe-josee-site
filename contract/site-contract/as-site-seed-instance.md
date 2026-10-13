# AI Smith — Public-Site Seed: INSTANCE (reskinnable layer)

**Version 0.11.6 -- 13 October 2026.** The per-site half of the public-site seed. Companion to
`as-site-seed-spine.md` (the frozen layer), `as-site-spine-standard.md` (v0.9),
`as-site-build-agent.md`, `as-site-intake-standard.md`, and `as-fleet-organisation.md`.

> **What this is.** The **per-site** layer of the fleet public-site seed, skinned and
> composed for **AI Smith** — the spine's first instance. This is the worked example a new
> site is **cloned from and reskinned**: edit `tokens.css`, fill `site.config` + content
> pages, set per-route meta. The frozen spine it composes against lives in
> `as-site-seed-spine.md`. Together the two docs are the markdown-of-record for the old
> `aismith-site-seed.zip` — no zip re-upload needed.

> **Seed provenance.** Folded from `aismith-site-seed-v0.7.zip`. AS instance specifics:
> palette "Ink, Paper, Ember"; `--action`/`--accent` = Ember Deep `#9E4E1E` / Ember
> `#C0632E`; fonts Bricolage Grotesque (display) + Inter (body); contact is
> **mailto-only** (`contact@aismith.io`) — the spine's forms and the two edge functions
> ship but are mounted on no page; `seo.noindex` is the demo↔production switch; host =
> Netlify (Pro) for the front end + Supabase Edge Functions for server logic, **never**
> Lovable Cloud. (No host exceptions remain — SK migrated off Lovable publish onto Netlify
> on 29 Jun 2026, fleet-wide.)

---

## Layer contract (what an agent edits here)

This is everything a build touches. Per the spine standard the agent **only** edits
`tokens.css`, `src/content/*`, and `site.config`; route files carry per-route `head()` meta
(S7.1) and the `__root` shell sets `lang` + chrome wiring (S7/S2.4). The component library
and `spine.css` are **never** touched — those are in `as-site-seed-spine.md`.

**To manufacture a new site:** clone this layer → reskin `tokens.css` (keep every token
NAME; check each text/bg pair clears WCAG AA, use `--accent-text` for accent text on light,
S2.3) → fill `site.config.tsx` and compose `content/*` from spine components (set each
`Section` tone for banner rhythm; write no structural CSS, S3.2) → set per-route meta →
default no DB → fill `<slug>-site-charter.md` → run the public-site audit
(`as-site-audit-prompt.md`).

**Step 0 (S5.4), before the first build prompt:** provision no managed backend (never Lovable
Cloud or any other auto-provisioned data surface). A `no-db` site provisions no database. Server-side paths: the shared `AISmith-functions`
`contact` backbone (no per-site project — onboard via a `CONTACT_TENANTS` key) and, only if the
site runs a newsletter, its own functions-only Supabase project (AS-owned org, empty of tables).

## File manifest (code)

| File | Lines |
|---|---|
| `src/styles/tokens.css` | 57 |
| `src/content/site.config.tsx` | 62 |
| `src/content/home.tsx` | 86 |
| `src/content/restaurants.tsx` | 71 |
| `src/content/cultural.tsx` | 82 |
| `src/content/ownership.tsx` | 72 |
| `src/content/plans.tsx` | 77 |
| `src/content/website.tsx` | 57 |
| `src/routes/__root.tsx` | 75 |
| `src/routes/index.tsx` | 16 |
| `src/routes/privacy.tsx` | 18 |
| `src/routes/restaurants.tsx` | 16 |
| `src/routes/cultural.tsx` | 16 |
| `src/routes/ownership.tsx` | 16 |
| `src/routes/plans.tsx` | 16 |
| `src/routes/website.tsx` | 16 |
| `functions/contact.ts` | 55 |
| `functions/newsletter.ts` | 47 |
| `public/sitemap.xml` | 11 |
| `public/robots.txt` | 6 |

## File manifest (repo-level), and the four this pair still does not classify

Added at site-contract **1.8.19**. The manifest above covers the files this document reproduces
verbatim. It never covered the toolchain and configuration files the seed repo actually ships, and
neither did `as-site-seed-spine.md`: measured on 2026-08-14 against seed `d719e03b`, **nine of the
seed's 59 tracked files (15.3%) were declared by neither half of the pair that calls itself the
markdown-of-record for the full seed.** One of the nine, `src/router.tsx`, is declared SEED-SPINE
in `as-site-seed-spine.md`. Four are declared SEED-INSTANCE here. **Four are not classified, and
that is a statement rather than an omission** (see below).

**Declared SEED-INSTANCE.** A site is expected to differ; no check fires. None is reproduced
verbatim below, because each is either lifecycle-dependent or machine-generated, and a verbatim
copy of a file that is supposed to change is a copy that starts drifting on day one.

| File | Why per site |
|---|---|
| `netlify.toml` | Carries the demo-noindex `X-Robots-Tag` header block that the seed's own comment instructs a builder to REMOVE at production promotion, plus a publish dir tied to the site's build. Its content differs by lifecycle stage, not only by client. |
| `public/_headers` | The header half of the same demo noindex, and the same removal instruction. Note that the promotion step must touch BOTH this file and `netlify.toml`, which nothing currently checks. |
| `package-lock.json` | Machine-generated. Two installs of an identical `package.json` a week apart resolve different transitive trees and different integrity hashes, so byte-identity across sites is not merely unexpected, it is unreachable. |
| `backlog.md` | The repo's own work list, per the convention in force since 2026-07-09. Its content is that repo's lane, by definition. |

**NOT CLASSIFIED, and handed back rather than decided.** Each of these four is spine in its
structure and instance in at least one field, so forcing it into either box would either freeze a
value a build is instructed to change or licence a site to edit a substrate it must not. They are
NOT in the `verify.mjs` baseline, and a baseline that covered them would report red on a legitimate
build. **AND THE BUILD PROMPT IS LICENSED TO EDIT THE NAMED FIELD, which is what NOT CLASSIFIED means here rather than an omission (operator ruling, site-contract 1.8.29).** For each of the four, the FIELD named in the third column is the whole of what a build may change and the second column is invariant; a build that edits anything else in those files has diverged, and the absence of a classification is not a licence to treat the file as instance.

| File | The structure that is invariant | The field that is not |
|---|---|---|
| `vite.config.ts` | The plugin triple (`tanstackStart`, `netlify`, `viteReact`) and `prerender: { enabled, crawlLinks, failOnError }` | The `pages` array. `prompts/builds/site-build.md` instructs a builder to *update `vite.config.ts` `pages` to match*, and the file's own comment calls its list "the seed's reference instance". A file the build prompt tells you to edit cannot be frozen. |
| `package.json` | `type`, the three scripts, and the seven-package pinned dependency set that `SCAFFOLD.md` exists to record | `name` (per repo by definition) and any dependency a site legitimately adds. |
| `tsconfig.json` | The `compilerOptions` block, which is the substrate's contract with `tsc` | `include`, and `paths` for a site that adds a component library needing an alias. |
| `.gitignore` | The eight entries the substrate requires, `src/routeTree.gen.ts` among them and load-bearing | Additions. A site that ignores one more build artifact has not diverged, and byte-identity would call it a spine violation. |

**The contradiction underneath all four, which is not this document's to settle.** The "Before you
start" block below states that this seed "ships source files only (**no** `package.json`,
`app.config`, router entry, `routeTree.gen.ts`, or HTML shell)", and `SCAFFOLD.md`'s "Who supplies
what" assigns the same files to the scaffold. **The seed repo ships all of them.** So the pair
either describes a seed that no longer exists or the repo carries files it is not supposed to, and
the four above cannot be classified until that is ruled on. Raised 2026-08-14, not resolved.

## Build-guidance docs (appendix, embedded below)

| File | Lines |
|---|---|
| `README.md` | 90 |
| `SCAFFOLD.md` | 45 |
| `aismith-site-charter.md` | 86 |
| `functions/DEPLOY.md` | 41 |

## To reconstruct
Recreate each file at the path in its heading, verbatim, alongside the spine layer from
`as-site-seed-spine.md`. The four appendix `.md` files (README, SCAFFOLD, charter, DEPLOY)
sit at the repo paths shown. Rezip the union to regenerate `aismith-site-seed.zip`.

---

## 1 · Skin (the one style file edited per site)

### `src/styles/tokens.css`

```css
/* ============================================================================
   tokens.css — THE SKIN.  The only file you edit to re-skin a site.
   AI Smith instance ("Ink, Paper, Ember").  Conforms to as-site-spine-standard
   §S2 + Appendix A: fixed semantic token NAMES, only the VALUES change per site.

   Contract (S2):
   - Spine components reference these names ONLY — never a raw hex, never a
     colour-named token. Re-skinning = change values here, touch nothing else.
   - Accent used AS TEXT on a light surface uses --accent-text (AA-safe),
     never --accent.  (Ember #C0632E on Paper = 3.81:1 → fails AA;
     Ember Deep #9E4E1E on Paper = 5.42:1 → passes.)
   - Every text/bg pair below clears WCAG AA.
   ============================================================================ */

:root {
  /* ---- colour roles -------------------------------------------------------*/
  --bg:            #F8F5EF;            /* Paper — page background              */
  --bg-alt:        #E7E1D7;            /* Mist  — alternating section bg       */
  --surface:       #FFFFFF;            /* card / panel bg                      */
  --surface-warm:  #F3EEE6;            /* secondary card bg                    */
  --text:          #1E1D1B;            /* Iron  — primary text                 */
  --text-soft:     #5E574F;            /* soft secondary text (Anvil family, darkened to clear AA on Mist: 5.47) */
  --line:          rgba(30, 29, 27, .12);
  --line-soft:     rgba(30, 29, 27, .07);
  --line-input:    rgba(30, 29, 27, .55);  /* form-field EDGE: 3.0 owed vs field + card (WCAG 1.4.11): 3.72 on Paper, 4.05 on white, 3.12 on Mist */

  --action:        #9E4E1E;            /* Ember Deep — CTA fill behind white text (5.42:1) */
  --action-strong: #7E3D15;            /* pressed / chunky shadow              */
  --accent:        #C0632E;            /* Ember — fills, marks, large display, on-dark glow */
  --accent-text:   #9E4E1E;            /* Ember Deep — accent AS TEXT on light (AA-safe; default value) */
  --accent-on-dark:#E0915F;            /* Ember lightened — accent AS TEXT on dark/slate (Iron 6.73, Slate 5.43); spine.css uses it for .em/.eyebrow/.btn-ghost in dark sections */
  --highlight:     #C0632E;            /* secondary accent / dots / dividers   */

  --on-dark:       #F8F5EF;            /* text on dark / accent sections       */
  --on-dark-soft:  rgba(248, 245, 239, .82);
  --rule-on-dark:  rgba(248, 245, 239, .18);  /* hairline divider on dark (Paper @ low alpha) */
  --dark:          #1E1D1B;            /* Iron — institutional dark section bg */
  --dark-alt:      #26302E;            /* Slate — optional second dark (grant/cultural register) */

  /* ---- type ---------------------------------------------------------------*/
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body:    'Inter', -apple-system, system-ui, sans-serif;
  /* --font-logo not used for AI Smith (wordmark is set in --font-display)     */

  /* ---- geometry -----------------------------------------------------------*/
  --max:        1240px;
  --gutter:     clamp(20px, 4.5vw, 64px);
  --radius:     12px;
  --radius-lg:  20px;
  --radius-pill: 999px;

  /* ---- elevation / motion -------------------------------------------------*/
  --shadow-color: 30, 29, 27;          /* Iron RGB triplet — compose shadows via rgba(var(--shadow-color), a) */
  --shadow:     0 18px 40px -26px rgba(var(--shadow-color), .45);
  --shadow-lg:  0 28px 54px -24px rgba(var(--shadow-color), .5);
  --tilt:       -1.2deg;              /* decorative rotation; set 0deg to disable */

  /* ---- OPTIONAL slots (declare only if the brand needs them) --------------
     Secondary-palette hues (S4.6): up to six --hue-N / --hue-N-ink pairs
     (+ optional --hue-N-soft). Each declared pair must clear WCAG AA; the
     Section `hue` prop maps to them, undeclared slots fall back to the tone.
     AI Smith declares none (single-accent brand). Example (ZG family):
       --hue-1: #F4C542;  --hue-1-ink: #213847;   (mustard)
       --hue-2: #EE5FA0;  --hue-2-ink: #FFFFFF;   (rose/magenta)
     Card background override: --card-bg (EventCard ground; defaults to --surface). */
}
```

---

## 2 · Content (site.config + page composition)

### `src/content/site.config.tsx`

```tsx
// site.config.ts — PER-SITE CONTENT.  This + pages + tokens.css are all you edit.
// AI Smith instance.  No secret lives here; integration endpoints are public routes
// to edge functions that hold their keys in env (S6).
import type { NavItem, FooterColumn, Social } from "../components/spine/chrome";

export const site = {
  name: "AI Smith",
  // S2.4: fonts loaded in __root.tsx <head>; values set in tokens.css
  contactEmail: "contact@aismith.io",
  // The production host. public/sitemap.xml and robots.txt name it, verify.mjs [4] checks the
  // sitemap against it, and the root head builds its absolute og: URLs on it (`og` below).
  canonicalHost: "https://aismith.io",

  // S6: contactAction = the SHARED AISmith-functions /contact URL when a form replaces mailto;
  // newsletterAction = this site's OWN functions-only project URL if a newsletter is mounted.
  // Empty while unmounted (contact is mailto-only, newsletter omitted). See DEPLOY.md.
  integrations: {
    contactAction: "",     // → shared AISmith-functions /contact endpoint when mounted (mailto: until then)
    newsletterAction: "",  // → functions/newsletter.ts (Brevo) when mounted
    booking: "https://cal.com/aismith",  // Cal.com embed/link (optional)
  },

  // S5: data posture — declared in aismith-site-charter.md as "no-db, static-in-repo"

  // verify.mjs [6] LOGO — brand mark KIND, gated by the audit. Default "image" forces the
  // real extracted mark; a text wordmark is legal ONLY when declared. AI Smith's mark is
  // genuinely typographic, so the reference declares it. Client sites omit (default "image").
  brandMark: { kind: "wordmark" },
};

// Demo = true (public but not crawlable; shareable for feedback). Production = false.
export const seo = { noindex: true };

// THE LINK-PREVIEW FILL POINT (R221, the site-seed limb). The root head builds every og:image
// and twitter: tag from this block and `site.canonicalHost`, so a fork fills it here and
// nowhere else. og:image is ABSOLUTE on the site's own host, because WhatsApp, Slack and
// LinkedIn do not resolve a relative path: a relative og:image reads as configured and renders
// as nothing. The card is a 1200 x 630 LANDSCAPE image under 300 KB in /public, because
// WhatsApp shows a near-square image as a small thumbnail and can drop a large one.
// public/og-card.png ships as a PLACEHOLDER that says so on its face, so an unfilled fork
// shares a visibly unfilled card rather than a silent text-only one. Replace the file, then
// the alt text; keep type, width and height true to the file.
export const og = {
  image: "/og-card.png",
  type: "image/png",
  width: 1200,
  height: 630,
  alt: "Placeholder link-preview card: replace public/og-card.png before launch",
  // language_TERRITORY, the same language as <html lang="en-GB"> in __root, and verify.mjs [4]
  // fails the two when they disagree. The fleet's Dutch-language sites use nl_BE.
  locale: "en_GB",
};

export const nav: NavItem[] = [
  { label: "What we make", href: "/" },
  { label: "For restaurants", href: "/restaurants" },
  { label: "For cultural orgs", href: "/cultural" },
  { label: "Ownership", href: "/ownership" },
  { label: "Plans", href: "/plans" },
];

export const footerColumns: FooterColumn[] = [
  { title: "What we make", links: [
    { label: "For restaurants", href: "/restaurants" },
    { label: "For cultural orgs", href: "/cultural" },
  ]},
  { title: "The promise", links: [
    { label: "Your hub, your data", href: "/ownership" },
    { label: "Plans", href: "/plans" },
    { label: "Website option", href: "/website" },
  ]},
  { title: "Talk", links: [
    { label: "Start a conversation", href: "mailto:contact@aismith.io" },
    { label: "contact@aismith.io", href: "mailto:contact@aismith.io" },
  ]},
];

const ig = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.25" fill="currentColor" />
  </svg>
);
export const socials: Social[] = [
  { label: "Instagram", href: "https://instagram.com/aismith", icon: ig },
];

// S8.3 / footer rule: AI Smith is the public brand; the operating entity is not foregrounded.
export const legal = "AI Smith · Antwerp, Belgium · Concept site 2026";

// S7.4: privacy-notice data. The build agent fills this from the manifest `legal` block;
// it must reflect the site's ACTUAL subprocessors, not generic boilerplate. AS is mailto-only
// (no Resend/Brevo mounted) and ships no map, so only the host is a processor here.
export const privacy = {
  controller: { name: "AI Smith", email: "contact@aismith.io" },
  subprocessors: [
    { name: "Netlify", purpose: "hosting and server logs", location: "EU/US", link: "https://www.netlify.com/privacy/" },
  ],
  effectiveDate: "23 June 2026",
  mapsEmbed: false,
  lang: "en" as const,   // AI Smith is an English-language site (S7.4 supports nl | en)
};
```

### `src/content/home.tsx`

```tsx
// pages/home.tsx — PER-SITE COMPOSITION.  Built entirely from spine components.
// No bespoke structural CSS (S3.2): tone rhythm + cards + band only.
// Copy from the AI Smith positioning canon; ownership is one confident touch + link.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, MediaCard } from "../components/spine";

export function Home() {
  return (
    <main id="main">
      {/* HERO — paper. Frame + promise; master fill is vertical-neutral (S: AS rule). */}
      <Section tone="paper" pad="lg">
        <Eyebrow>The work, already done.</Eyebrow>
        <PageTitle size="hero">
          Software that already speaks <Em>your organisation</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. We don't hand you another tool to learn and run. We hand you
          the thing already running, built for how your kind of organisation works, and <Em>it learns
          yours as you go.</Em>
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="/restaurants">See it for your work</Btn>
          <Btn variant="line" href="/ownership">How it stays yours</Btn>
        </div>
      </Section>

      {/* WHY NOW — alt */}
      <Section tone="alt">
        <Eyebrow>Why now</Eyebrow>
        <SecTitle>The tool era is closing. The done-for-you era is opening.</SecTitle>
        <Lead>
          A café, a music school, a small non-profit, or a fifty-person organisation drowning in its
          own tools. None of them want another login to learn. <Em>So we don't arrive with software.
          We arrive with the work already done.</Em>
        </Lead>
      </Section>

      {/* DOORS — paper, two MediaCards */}
      <Section tone="paper">
        <Eyebrow>Two front doors, open now</Eyebrow>
        <SecTitle>Tell us what you run.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 34 }}>
          <MediaCard category="Hospitality" title="Restaurants & small hospitality"
            body="Rotas, team, menus, content, payments. One place that already speaks restaurant, running today at Simone's Kitchen, Antwerp."
            href="/restaurants" more="See it for restaurants" />
          <MediaCard category="Cultural & grant-funded" title="Cultural & non-profit organisations"
            body="Supporters, events, documents, and the funding paperwork in one place, with help drafting the grant sections. Running today at Zuidgeluid."
            href="/cultural" more="See it for cultural orgs" />
        </div>
      </Section>

      {/* SUPPORT BEAT — dark.  The retention moat; gets its weight here. */}
      <Section tone="dark">
        <Eyebrow>The part no one else gives a small organisation</Eyebrow>
        <SecTitle>It knows your business. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your work, your people, your voice. It drafts the
          repetitive writing, and it gets a little sharper every month you run it.
        </Lead>
      </Section>

      {/* OWNERSHIP — one confident present-tense touch + link (full detail lives on /ownership) */}
      <Section tone="paper">
        <Eyebrow>Yours to keep</Eyebrow>
        <SecTitle>We run it. You own it.</SecTitle>
        <Lead>
          <Em>Owned by you.</Em> Your data, your content, your code. Yours from day one, while we run
          it for you.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">How it stays yours &rarr;</Btn>
        </div>
      </Section>

      {/* CLOSE BAND — slate */}
      <Band tone="slate"
        heading="Come tell us what you run. We'll show you yours."
        sub="A short conversation, no pitch deck. We'll walk you through the place running closest to yours, and tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
```

### `src/content/restaurants.tsx`

```tsx
// pages/restaurants.tsx — Door 1. Composed from spine; AS voice; no prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Restaurants() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>For restaurants & small hospitality</Eyebrow>
        <PageTitle size="xl">
          Software that already speaks <Em>restaurant</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. Run your whole place from one spot that already speaks restaurant,
          and learns your menu, your suppliers, your team as you go.
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="#runs">See it running</Btn>
          <Btn variant="line" href="/plans">What it costs</Btn>
        </div>
      </Section>

      <Section tone="alt" id="runs">
        <SecTitle>One place that already speaks restaurant.</SecTitle>
        <Lead>
          Rotas, team, menus, content, payments, documents, the lot, in software built for how a
          restaurant actually runs. Not another tool to learn. The work, set up and run for you.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Team & rotas" v="Who's on, who's covering, who's paid what. Shifts and stays in one calendar everyone can see." />
          <InfoCard k="Menus & dishes" v="Your dishes, sections, and prices, written once, reused everywhere from the kitchen to the card." />
          <InfoCard k="Suppliers" v="Where each thing comes from, kept straight, so the answer is one search, not a hunt through messages." />
          <InfoCard k="Content & social" v="Posts and reels drafted in your house voice, from your own menu, ready to schedule." />
          <InfoCard k="Payments" v="Bookings, memberships, takeaway, taken and tracked, with the VAT sorted the way your place works." />
          <InfoCard k="Documents" v="Compliance papers, agreements, the things you lose in email, held safely, found instantly." />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>The part no one else gives a small kitchen</Eyebrow>
        <SecTitle>It knows your business. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your menu, your suppliers, your team, your voice.
          It drafts the repetitive writing, and it gets a little sharper every month you run it.
        </Lead>
      </Section>

      <Section tone="paper">
        <Eyebrow>Running a real restaurant</Eyebrow>
        <SecTitle>Simone's Kitchen, Antwerp.</SecTitle>
        <Lead>
          A plant-based restaurant with rooms runs its whole operation on its own hub: team and rotas,
          menus and content, payments, documents. The menu cards and the social posts are drafted from
          its own kitchen, in its own voice.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">How it stays yours &rarr;</Btn>
        </div>
      </Section>

      <Band tone="slate"
        heading="Come and see the place running closest to yours."
        sub="A short conversation, no pitch deck. We'll tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
```

### `src/content/cultural.tsx`

```tsx
// pages/cultural.tsx — Door 2. Ownership weighted a little earlier (grant/public-money
// buyers ask for it). Still no prose em-dashes; slate register for the institutional tone.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Cultural() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>For cultural & grant-funded organisations</Eyebrow>
        <PageTitle size="xl">
          Software that already speaks <Em>culture</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. Supporters, events, documents, and the funding paperwork in one
          place built for how a cultural non-profit works, with an assistant that knows your programmes
          and helps draft the grant sections.
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="#runs">See it running</Btn>
          <Btn variant="line" href="/plans">What it costs</Btn>
        </div>
      </Section>

      <Section tone="alt" id="runs">
        <SecTitle>Run the organisation, not the admin.</SecTitle>
        <Lead>
          One place built for how a cultural organisation actually works. It belongs to the
          organisation, in formats you keep. Independent by design.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Supporters" v="Members, donors, and contacts in one place, kept current, ready when you need to reach them." />
          <InfoCard k="Events & programmes" v="What's on, where, and who's involved, with the details in one calendar your whole team can see." />
          <InfoCard k="Documents" v="Agreements, reports, and the papers a board and a funder expect, held safely and found fast." />
          <InfoCard k="Grant drafting" v="An assistant that knows your programmes and helps draft the funding sections, in your own words." />
          <InfoCard k="Communications" v="Newsletters and posts drafted in your voice, from your own events, ready for you to approve." />
          <InfoCard k="Accountability" v="The trail a public-money organisation needs, kept as you go, not pieced together at year end." />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>The part no one else gives a small organisation</Eyebrow>
        <SecTitle>It knows your programmes. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your programmes, your supporters, your funders,
          your voice. It helps draft the grant sections, and it gets a little sharper every month.
        </Lead>
      </Section>

      <Section tone="slate">
        <Eyebrow>Independence, built in</Eyebrow>
        <SecTitle>Owned by the organisation, the whole time.</SecTitle>
        <Lead>
          Your data and your content belong to the organisation from day one, in standard formats. We
          run it for you. Exit rights, data control, and a written continuity clause hold the whole
          time we work together. It cannot be locked in or bought out from under you.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">Read the full promise &rarr;</Btn>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Running a real organisation</Eyebrow>
        <SecTitle>Zuidgeluid, Antwerp.</SecTitle>
        <Lead>
          A music-education non-profit runs its supporters, events, and grant drafting on its own hub.
          The funding sections are drafted from its own programmes, in its own voice.
        </Lead>
      </Section>

      <Band tone="dark"
        heading="Tell us what your organisation runs."
        sub="A short conversation, no pitch deck. We'll show you the organisation running closest to yours, and tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
```

### `src/content/ownership.tsx`

```tsx
// pages/ownership.tsx — THE deep ownership page (the only one). Guarantee, three tiers,
// exit kit, honest boundary. No prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Ownership() {
  return (
    <main id="main">
      <Section tone="dark" pad="lg">
        <Eyebrow>Your hub, your data</Eyebrow>
        <PageTitle size="lg">
          Owned by you. Run by us.
        </PageTitle>
        <Lead>
          Yours from day one: your data, your content, your knowledge, in standard formats. We run it
          for you, but we never hold it hostage. Your hub cannot be locked in, bought out, or shut down
          out from under you. Independence is built into how it is owned, not a promise about us.
        </Lead>
      </Section>

      <Section tone="paper">
        <Eyebrow>Three things you can always do</Eyebrow>
        <SecTitle>Owned and operated, kept separate.</SecTitle>
        <Lead>
          You are the owner from day one, even while we hold the keys day to day. Operation is ours
          while you stay. Ownership is yours throughout.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Export your data, any time" v="In standard formats you can open anywhere. The same right GDPR already gives you, made easy." />
          <InfoCard k="Take the whole instance" v="The database transfers to your own organisation and the code to your own account. The live hub, not a pile of files." />
          <InfoCard k="A written safety net" v="A written right to invoke that transfer yourselves, including if AI Smith ever stops operating." />
        </div>
      </Section>

      <Section tone="alt">
        <Eyebrow>The exit kit</Eyebrow>
        <SecTitle>If you ever leave, here is exactly what you get.</SecTitle>
        <Lead>
          No rebuild, no hostage. Leaving happens by transfer, not extraction, and it is never
          refusable beyond settling what is already owed.
        </Lead>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="The database" v="Your project transferred into your own organisation, with all your data intact." />
          <InfoCard k="The code" v="The repository transferred to your account, with the environment and a plain runbook, so another team can pick it up." />
          <InfoCard k="A final export" v="A clean copy of everything, and a short support window for questions." />
          <InfoCard k="Your own keys" v="Your model API key swapped in for ours, so the assistant keeps working under your account." />
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>The honest boundary</Eyebrow>
        <SecTitle>What you keep, and what stops.</SecTitle>
        <Lead>
          You keep a working hub as of the day you leave. What stops is us running, maintaining, and
          improving it, and the assistant stops compounding, because the managed service and the
          standard's updates were ours. Leaving is easy and allowed. What you lose is the thing that
          kept getting better.
        </Lead>
        <p className="lead" style={{ marginTop: 14 }}>
          While you stay, you are the data controller and we are the processor under a written
          agreement. The ownership is continuous, not an exit-only event.
        </p>
      </Section>

      <Band tone="slate"
        heading="Independence you can put in front of a board."
        sub="We'll make the guarantee concrete for your organisation: what you own, and exactly how leaving would work."
        actions={<Btn href="mailto:contact@aismith.io">Start a conversation</Btn>}
      />
    </main>
  );
}
```

### `src/content/plans.tsx`

```tsx
// pages/plans.tsx — the managed plan. "retainer" language, never "subscription".
// Ownership right and the 12-month term stated separately. VAT explicit. No prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, TierCard, InfoCard } from "../components/spine";

export function Plans() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>A managed plan, not another tool</Eyebrow>
        <PageTitle size="lg">
          Low to start. Monthly after.
        </PageTitle>
        <Lead>
          We set it up and we run it. The price is for the running and the learning, both monthly
          things, not for the build. Price it against the hours it removes and the tools it replaces,
          never against a website.
        </Lead>
      </Section>

      <Section tone="alt">
        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <TierCard
            label="Managed plan"
            price="€195"
            per="/ month, managed · excl. VAT"
            items={[
              "Your hub, built for your trade and running",
              "The assistant, grounded in your own knowledge",
              "A generous monthly AI allowance, included",
              "We run it, watch it, and keep it current",
              "No revenue share. Your income is entirely yours",
              "Yours to export, or take whole, any time",
            ]}
            cta={<Btn href="mailto:contact@aismith.io">Start a conversation</Btn>}
          />
          <div>
            <Eyebrow>Two things, said separately</Eyebrow>
            <SecTitle>Fair both ways.</SecTitle>
            <p className="lead" style={{ marginTop: 14 }}>
              <Em>You can always take your hub.</Em> The ownership right. Yours to keep, forever,
              whatever happens.
            </p>
            <p className="lead" style={{ marginTop: 10 }}>
              <Em>You commit for the first year.</Em> A single, straightforward 12-month managed term,
              because we built it without charging upfront.
            </p>
            <p className="lead" style={{ marginTop: 10 }}>
              A capped, generous monthly AI allowance is included. Most organisations never reach it.
              It is there so one heavy month never turns into a surprise.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Straight answers</Eyebrow>
        <SecTitle>Questions about cost.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="Why a monthly plan and not a one-off build?" v="A one-off build is a tool you are then left to run. The value here is the running and the compounding knowledge, both monthly things, so the price is monthly too." />
          <InfoCard k="What does the 12-month term cover?" v="A simple managed term: we run, maintain, and keep improving your hub across the year. Your hub and your data are yours regardless, the whole time and after." />
          <InfoCard k="Is there a revenue share?" v="No. You run your own operation. Your takings, funding, and income are entirely yours. We charge the managed plan, nothing on top." />
          <InfoCard k="Isn't it cheaper to just get a website?" v="A website is the shop window. What you are buying here is the system that runs the place behind it. We can build the website too, if you want." />
        </div>
      </Section>

      <Band tone="slate"
        heading="Let's price it against your actual work."
        sub="Tell us what you run and how big the team is, and we'll give you a real number, and show you the place running closest to yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/website">See the website option</Btn>
        </>}
      />
    </main>
  );
}
```

### `src/content/website.tsx`

```tsx
// pages/website.tsx — the optional public-site add-on (positioning §5B). No prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Website() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>Optional add-on</Eyebrow>
        <PageTitle size="lg">
          Want your website on it too?
        </PageTitle>
        <Lead>
          An extra, if you need it. Not the main product. The product is the hub that runs your
          operation. If you also need a public website, we can build it on the same foundation, so your
          shop window and your back office are one system you own.
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="mailto:contact@aismith.io">Ask about it</Btn>
          <Btn variant="line" href="/plans">Back to the plan</Btn>
        </div>
      </Section>

      <Section tone="alt">
        <Eyebrow>If you want the whole presence</Eyebrow>
        <SecTitle>One foundation, two surfaces.</SecTitle>
        <Lead>
          Built as separate apps on one stack you own. The public site and the operation keep their
          own boundaries, but share a single home. Standard formats, portable.
        </Lead>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="Public website" v="What the world sees: pages, news, sign-ups." />
          <InfoCard k="Your hub" v="What runs the place: the operation behind it." />
        </div>
        {/* A linked public/ binary, so verify.mjs [11] compares a real file on every build (R109) */}
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn variant="ghost" href="/og-card.png">See the preview card a shared link shows &rarr;</Btn>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>When it makes sense</Eyebrow>
        <SecTitle>Add it only if it helps.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="Already have a site you like" v="Keep it, and we work behind it. The hub runs your operation quietly behind the site you already have. No rebuild needed. And if you ever want it rebuilt on the same foundation, that option is open too." />
          <InfoCard k="Starting fresh, or outgrown your old one" v="We build the public site on the same foundation as your hub. Your whole presence, yours to keep." />
        </div>
        <p className="lead" style={{ marginTop: 22 }}>
          <Em>Not sure you need it?</Em> You probably don't, and that is fine. The hub stands on its
          own. If a website would help, we'll tell you straight, and price it as the add-on it is.
        </p>
      </Section>

      <Band tone="slate"
        heading="The hub first. The website only if it earns its place."
        sub="Tell us what you run, and we'll tell you plainly whether the website option is worth it for you."
        actions={<Btn href="mailto:contact@aismith.io">Ask about it</Btn>}
      />
    </main>
  );
}
```

---

## 3 · Routes (`__root` shell + per-route meta)

### `src/routes/__root.tsx`

```tsx
// routes/__root.tsx — root layout + document shell (TanStack Start). SPINE wiring.
// Owns the HTML shell so `lang` is hard-set here (S7.2), not left to the scaffold.
// HeadContent renders the merged root + per-route head() (S7.1). The durable value
// (components + tokens + composition) is framework-agnostic.
import * as React from "react";
import {
  createRootRoute, Outlet, useRouterState, HeadContent, Scripts,
} from "@tanstack/react-router";
import { SiteHeader, SiteFooter, SkipLink } from "../components/spine";
import { nav, footerColumns, socials, legal, site, seo, og } from "../content/site.config";
import "../styles/tokens.css";
import "../styles/spine.css";

const Logo = <>AI<span className="dot">·</span>Smith</>;

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
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
        cta={<a className="btn btn-action" href="mailto:contact@aismith.io">Start a conversation</a>}
      />
      <Outlet />
      <SiteFooter
        logo={Logo}
        tagline="The work, already done."
        address={<>{site.contactEmail}</>}
        columns={footerColumns}
        socials={socials}
        legal={legal}
        legalLinks={[{ label: "Privacy", href: "/privacy" }]}
      />
    </RootDocument>
  );
}

export const Route = createRootRoute({
  // Root defaults; each content route adds its own head() which overrides title/description.
  head: () => ({
    meta: [
      { title: "AI Smith · Software that already speaks your organisation" },
      { name: "description", content: "Made to fit. Yours to keep. Software built for how your organisation works, run for you, and yours to keep." },
      { property: "og:title", content: "AI Smith" },
      { property: "og:description", content: "Made to fit. Yours to keep." },
      { property: "og:type", content: "website" },
      // Link-preview card (R221): filled from `og` in src/content/site.config, ABSOLUTE on
      // site.canonicalHost because a relative og:image is not resolved by the apps that matter.
      { property: "og:image", content: new URL(og.image, site.canonicalHost).href },
      { property: "og:image:type", content: og.type },
      { property: "og:image:width", content: String(og.width) },
      { property: "og:image:height", content: String(og.height) },
      { property: "og:image:alt", content: og.alt },
      { property: "og:locale", content: og.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Demo↔production privacy switch (S7): noindex when seo.noindex is true (src/content/site.config).
      ...(seo.noindex ? [{ name: "robots", content: "noindex,nofollow" }] : []),
    ],
    links: [
      // S2.4 — fonts loaded by the app (swap for @fontsource self-hosting in production).
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: RootLayout,
});
```

### `src/routes/index.tsx`

```tsx
// routes/index.tsx — / route. Composition lives in content/home.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../content/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Smith · Software that already speaks your organisation" },
      { name: "description", content: "Made to fit. Yours to keep. Software built for how your organisation works, run for you, and yours to keep." },
      { property: "og:title", content: "AI Smith · Software that already speaks your organisation" },
      { property: "og:description", content: "Made to fit. Yours to keep. Software built for how your organisation works, run for you, and yours to keep." },
    ],
  }),
  component: Home,
});
```

### `src/routes/privacy.tsx`

```tsx
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
```

### `src/routes/restaurants.tsx`

```tsx
// routes/restaurants.tsx — /restaurants route. Composition lives in content/restaurants.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Restaurants } from "../content/restaurants";

export const Route = createFileRoute("/restaurants")({
  head: () => ({
    meta: [
      { title: "AI Smith for restaurants · Software that speaks restaurant" },
      { name: "description", content: "One place that runs rotas, menus, content, and payments, built for how a restaurant works and yours to keep. Running today at Simone's Kitchen, Antwerp." },
      { property: "og:title", content: "AI Smith for restaurants · Software that speaks restaurant" },
      { property: "og:description", content: "One place that runs rotas, menus, content, and payments, built for how a restaurant works and yours to keep. Running today at Simone's Kitchen, Antwerp." },
    ],
  }),
  component: Restaurants,
});
```

### `src/routes/cultural.tsx`

```tsx
// routes/cultural.tsx — /cultural route. Composition lives in content/cultural.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Cultural } from "../content/cultural";

export const Route = createFileRoute("/cultural")({
  head: () => ({
    meta: [
      { title: "AI Smith for cultural organisations" },
      { name: "description", content: "Supporters, events, documents, and grant drafting in one place built for a cultural non-profit. Owned by the organisation. Running today at Zuidgeluid." },
      { property: "og:title", content: "AI Smith for cultural organisations" },
      { property: "og:description", content: "Supporters, events, documents, and grant drafting in one place built for a cultural non-profit. Owned by the organisation. Running today at Zuidgeluid." },
    ],
  }),
  component: Cultural,
});
```

### `src/routes/ownership.tsx`

```tsx
// routes/ownership.tsx — /ownership route. Composition lives in content/ownership.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Ownership } from "../content/ownership";

export const Route = createFileRoute("/ownership")({
  head: () => ({
    meta: [
      { title: "Your hub, your data · AI Smith" },
      { name: "description", content: "Owned by you from day one, run by us. Export any time, take the whole instance, and a written safety net. Independence built into how it is owned." },
      { property: "og:title", content: "Your hub, your data · AI Smith" },
      { property: "og:description", content: "Owned by you from day one, run by us. Export any time, take the whole instance, and a written safety net. Independence built into how it is owned." },
    ],
  }),
  component: Ownership,
});
```

### `src/routes/plans.tsx`

```tsx
// routes/plans.tsx — /plans route. Composition lives in content/plans.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Plans } from "../content/plans";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Plans · AI Smith" },
      { name: "description", content: "A managed plan, low to start and monthly after. We set it up and run it. No revenue share. Yours to export or take whole, any time. Prices exclude VAT." },
      { property: "og:title", content: "Plans · AI Smith" },
      { property: "og:description", content: "A managed plan, low to start and monthly after. We set it up and run it. No revenue share. Yours to export or take whole, any time. Prices exclude VAT." },
    ],
  }),
  component: Plans,
});
```

### `src/routes/website.tsx`

```tsx
// routes/website.tsx — /website route. Composition lives in content/website.tsx.
// head() carries per-route SEO meta (S7.1, template requirement); root head() supplies the rest.
import { createFileRoute } from "@tanstack/react-router";
import { Website } from "../content/website";

export const Route = createFileRoute("/website")({
  head: () => ({
    meta: [
      { title: "The website option · AI Smith" },
      { name: "description", content: "An optional add-on, not the main product. If you also need a public website, we can build it on the same foundation, so the whole presence is yours to keep." },
      { property: "og:title", content: "The website option · AI Smith" },
      { property: "og:description", content: "An optional add-on, not the main product. If you also need a public website, we can build it on the same foundation, so the whole presence is yours to keep." },
    ],
  }),
  component: Website,
});
```

---

## 4 · Edge functions (contact = shared backbone; newsletter = per-site; both mounted on no page in AS build)

### `functions/contact.ts` — NOT shipped per site (shared backbone)

Contact is **not a per-site function** in the current model. It runs on the **shared,
multi-tenant `contact` endpoint** of the `AISmith-functions` Supabase project; the canonical
source lives in the Factory repo at **`functions/contact/index.ts`** and is **not reproduced
here** (a per-site copy is exactly what drifted — the pre-v0.8 `contact.ts` this seed used to
ship hardcoded a single `ALLOWED_ORIGIN` + destination). A new site does **no** contact deploy:

- **Onboard = one key.** Add the site's origin to the `CONTACT_TENANTS` secret
  (`"https://<site-domain>": { "to": "<inbox>", "from"?, "subject"? }`). No source change, no redeploy.
- **Built in (server-side):** origin allowlist = CORS (no wildcard); destination resolved from the
  map, **never** from the request body; honeypot + per-origin rate-limit drop abuse; `OPTIONS -> 204`
  must carry **no** body (the café-Kamiel 2026-06-20 regression — keep an OPTIONS test on any change).
  Secrets: `RESEND_API_KEY`, `CONTACT_FROM_DEFAULT` (a full mailbox on `send.aismith.io`).
- **Front end:** `fetch` the shared URL
  (`POST https://<aismith-functions-ref>.supabase.co/functions/v1/contact`); the `site.config`
  `contactAction` holds it (empty / `mailto:` while unmounted). No `supabase-js`.

See `functions/README.md` (Factory) for the endpoint contract and the regression watch.

### `functions/newsletter.ts`

```ts
// functions/newsletter.ts — Supabase Edge Function (Deno) behind /functions/v1/newsletter.
// S6: adds a contact to a Brevo list. Keys in env (BREVO_API_KEY, BREVO_LIST_ID), never
// client-side. No DB access, no service-role, no stored data. UNLIKE contact (the shared
// AISmith-functions backbone), newsletter has no shared backbone yet, so it stays a PER-SITE
// function deployed into the site's own functions-only Supabase project. Deploy + secrets:
// see functions/DEPLOY.md. Unmounted in the concept build (footer omits the newsletter).
const ALLOWED_ORIGIN = "https://aismith.io"; // the site's domain, exact

const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST")
    return new Response("Method Not Allowed", { status: 405, headers: cors });

  try {
    const body = await req.json();
    const email = String(body.email ?? "").slice(0, 200);
    if (!email.includes("@"))
      return new Response(JSON.stringify({ error: "invalid email" }),
        { status: 400, headers: { ...cors, "content-type": "application/json" } });

    const key = Deno.env.get("BREVO_API_KEY");
    const listId = Number(Deno.env.get("BREVO_LIST_ID") ?? 1);
    if (!key)
      return new Response(JSON.stringify({ error: "not configured" }),
        { status: 500, headers: { ...cors, "content-type": "application/json" } });

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json" },
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    });
    if (!res.ok && res.status !== 204)
      return new Response(JSON.stringify({ error: "subscribe failed" }),
        { status: 502, headers: { ...cors, "content-type": "application/json" } });

    return new Response(JSON.stringify({ ok: true }),
      { headers: { ...cors, "content-type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "bad request" }),
      { status: 400, headers: { ...cors, "content-type": "application/json" } });
  }
});
```

---

## 5 · Static (shipped by the template)

### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Static sitemap shipped by the site template (S7.1). Canonical host is
     https://aismith.io (the production domain; demo serves the same file noindexed). -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aismith.io/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://aismith.io/restaurants</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aismith.io/cultural</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aismith.io/ownership</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://aismith.io/plans</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://aismith.io/website</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>
```

### `public/robots.txt`

```text
# Canonical host: https://aismith.io (Netlify). The crawl is allowed on purpose so
# the noindex meta governs: a demo build sets seo.noindex=true (site.config) for a public-but-
# -uncrawlable site; production sets it false. Do NOT add a Disallow here (see charter §SEO).
User-agent: *
Allow: /
Sitemap: https://aismith.io/sitemap.xml
```

---

## 6 · Build-guidance docs (appendix)

These four markdown files ship inside the seed repo at the paths shown. They are
guidance, not site code; an agent reads them for scaffold/Step-0/host model and the
per-site charter spec.

### `README.md`

````markdown
# Public Site — TEMPLATE (AI Smith instance)

The fleet-manufacturable public-site seed. Conforms to `as-site-spine-standard.md`.
This copy is skinned and composed for **AI Smith** — the spine's first instance.

## The contract in one breath
**Spine never changes. Skin is one file. Content is config.** A new site =
clone this → re-skin `tokens.css` → fill `content/site.config` + `content/*` → compose
pages from spine components → pick optional modules. **No spine file is edited.**

## Before you start: scaffold + Step 0 (read first)
This seed is an **overlay, not a whole project.** It ships source files only (no
`package.json`, `app.config`, router entry, `routeTree.gen.ts`, or HTML shell). The build is
**agent-direct**: Claude Code clones the runnable substrate (`AISmithFactory/aismith-site-seed`,
a fresh **TanStack Start + SSR** scaffold), then writes these files into the repo over it.
- **Pin the scaffold version** (check `package.json`). This seed was authored against the
  **TanStack Start / Router v1** API surface: `createRootRoute`, `createFileRoute`, `head()`,
  `HeadContent`, `Scripts`. If the substrate differs, adapt the four route/`__root` touchpoints;
  the durable value (tokens + spine.css + components + composition) is framework-agnostic React.
- **Step 0 — backend posture (S5.4), before the first build prompt.** This site is
  **`no-db`**: **provision no managed backend** (never Lovable Cloud or any other auto-provisioned
  data surface). A provisioned backend behind a no-db site is a data surface the charter forbids
  and the audit fails. (This is the inverse of the hub lesson, where you *connect* Supabase first.)
  Only an anon-view read-pipe site connects anything, and then only the hub's existing project,
  read-only.
- `__root.tsx` owns the document shell here: it hard-sets `<html lang="en-GB">` and renders
  `HeadContent` + `Scripts`. Do not let the substrate supply a second shell.
- **The agent writes every file into the repo** — `.tsx` files are authored directly, not pasted,
  so the old paste-loop hazards (angle-bracket stripping, a per-prompt file ceiling) do not apply.
  See `SCAFFOLD.md` for the pinned build target and `functions/DEPLOY.md` for the Supabase Edge
  Function shape and its repo-via-pipe deploy.

## Layout
```
src/styles/tokens.css         THE SKIN — the only style file you edit per site (S2)
src/styles/spine.css          THE SPINE structure — never edit per site (S3.2)
src/components/spine/          the component library — never edit per site
  primitives.tsx               Wrap, Section(tone), Band, Display, SecTitle, Eyebrow, Lead, Em, Btn
  cards.tsx                    MediaCard, TierCard, EventCard, StatCard, InfoCard
  chrome.tsx                   SiteHeader, SiteFooter, SkipLink
  forms.tsx                    ContactForm, NewsletterForm
  index.ts                     barrel (+ where optional modules are added per charter)
src/content/site.config.tsx    PER-SITE: nav, footer, socials, legal, integrations, brandMark (inline logo SVG; brandMark.kind gates verify [6])
src/content/*.tsx              PER-SITE: page composition (home, restaurants, cultural, ownership, plans, website)
src/routes/__root.tsx          document shell (lang) + chrome wiring + root <head>/fonts (S7/S2.4)
src/routes/*.tsx               one per page; each carries head() with per-route SEO meta (S7.1)
public/sitemap.xml, robots.txt static, shipped by the template (S7.1)
functions/  (contact = SHARED AISmith-functions backbone, NOT shipped per site — see §4/DEPLOY.md)
functions/newsletter.ts        edge fn — Brevo, env secret (S6)
aismith-site-charter.md        the §9 charter the audit checks against
```

## To manufacture a new site (Agent Builder)
1. **Re-skin:** edit `tokens.css` values only. Keep every token NAME. Check each
   text/bg pair clears WCAG AA; use `--accent-text` for any accent text on light (S2.3).
2. **Content:** fill `site.config.tsx` (nav, footer, socials, legal, integration
   routes). Compose pages in `content/*` from spine components — set each `Section`'s
   `tone` to build the banner rhythm. Write no structural CSS (S3.2).
3. **Modules:** enable optional modules in `spine/index.ts` per the site's charter
   (S3.3). A marketing site ships none; a media site (like ZG) ships several.
4. **Data:** default no DB. If the site must show live hub data, add the **one**
   declared read-only doorway and a bridge note (S5/S6.4) — never share a hub DB.
5. **Charter:** fill `<site>-site-charter.md`. Run the public-site audit (spine doc §4).

## Hard gates (the audit will fail the build otherwise)
- No raw hex / colour-named token in component code (S2.2).
- No service-role key, no secret, no hub-DB write anywhere client-side (S6).
- Separate app from any hub — never combined (S1.2).
- At most one declared read-only doorway, RLS on any exposed view (S6.4).

## Notes
- **Host model.** Host = **Netlify (Pro)** — a static/prerendered front end, custom domain
  via CNAME/ALIAS to Netlify, automatic SSL. Server-side runtime = **Supabase Edge Functions**
  in the site's **own functions-only Supabase** (AS-owned org, empty of tables for a concept;
  **never Lovable Cloud**). Demo↔production is configuration, not a rebuild: flip
  `seo.noindex` (`src/content/site.config.tsx`) and point the domain (+ mount functions if a
  form replaces a mailto). No host move. Netlify hosts the front end only — no server logic.
- Stack: TanStack Start + SSR (see "Before you start" above for the version + scaffold
  contract). `__root.tsx` owns the shell and sets `lang`; each route file sets its own
  `head()` meta. The durable value (tokens + spine.css + components + composition) is
  framework-agnostic React.
- Fonts via Google Fonts link in `__root` for the concept build; self-host with
  `@fontsource` for production.
- Contact is **mailto-only** in this build (`contact@aismith.io`). The spine's
  `ContactForm` / `NewsletterForm` and the two edge functions ship but are **not mounted**
  on the AS site (see charter). A PLACEHOLDER `public/og-card.png` ships behind an absolute
  `og:image`; replace it with a branded card before launch.
- This seed is intentionally free of WordPress survival CSS (`#masthead` hide,
  `.entry-content` resets, `100vw` bleed hacks, Fluent-Forms overrides). On this stack
  you own the document.
````

### `SCAFFOLD.md`

````markdown
# SCAFFOLD — known-good build target

This seed is an **overlay**, not a whole project. The build is agent-direct: Claude Code clones
the runnable substrate (`AISmithFactory/aismith-site-seed`, a fresh **TanStack Start + SSR**
scaffold) and writes these files into the repo over it. Pin the scaffold here so the next build
diffs against a known-good baseline instead of "whatever today's substrate gives."

## API surface the seed targets (TanStack Start / Router v1)
- `createRootRoute`, `createFileRoute`
- route `head()` returning `{ meta: [...], links: [...] }`
- `HeadContent` + `Scripts` in the root document shell (`__root.tsx` owns `<html lang>`)
- file-based routing under `src/routes` with a generated `routeTree.gen.ts`

## Versions — fill from the first successful build, do NOT guess
Record the exact versions from `package.json` after the first green build, commit this
file, and treat it as the baseline the next agent diffs against.
```
scaffold starter/preset: ____   (the exact template the substrate scaffolded from — name it)
node:                    ____
@tanstack/react-start:   ____
@tanstack/react-router:  ____
vite:                    ____
```
Naming the **starter/preset** makes the baseline reproducible; the version pins make it
diffable. Backfill all five from AS's own first green build, then the next site diffs
against a real baseline instead of "whatever today's substrate gives."
If a future scaffold differs, the four route/`__root` touchpoints adapt; the durable value
(tokens + spine.css + components + composition) is framework-agnostic React.

## Who supplies what
- **Scaffold supplies:** `package.json`, app/vite config, router entry, `routeTree.gen.ts`,
  `/public` served at web root, the SSR server entry.
- **This seed supplies:** `src/styles/*`, `src/components/spine/*`, `src/content/*`,
  `src/routes/*` (incl. the `__root` shell), `functions/*`, `public/sitemap.xml` +
  `robots.txt`, the charter.

## Step 0 (before the first build prompt)
Provision no managed backend (never Lovable Cloud or any other auto-provisioned data surface).
This is a `no-db` site (S5.4); nothing to connect. See README + charter.

## Host / deploy
Host = **Netlify (Pro)**; server-side runtime = **Supabase Edge Functions** in
the site's own functions-only Supabase (never Lovable Cloud). Demo↔production = flip
`seo.noindex` + point the domain. Netlify hosts the front end only. See README "Host model" and
`functions/DEPLOY.md`.
````

### `aismith-site-charter.md`

```markdown
# AI Smith — Site Charter

Per-site declaration for the public marketing site. Conforms to
`as-site-spine-standard.md` §9. This is the spec the public-site audit checks the repo
against.

**Site:** AI Smith (aismith) · the spine's first instance / testing ground
**URL:** demo = the Netlify demo URL (`<slug>.demos.aismith.io`) with `seo.noindex=true` (public
but uncrawlable); production = `aismith.io` with `seo.noindex=false`. Same build, configuration-only
switch.

## Skin (S2)
- Palette: "Ink, Paper, Ember" — values filled in `src/styles/tokens.css`.
  `--action`/`--accent` map to Ember Deep `#9E4E1E` / Ember `#C0632E`; accent-as-text
  uses `--accent-text` (Ember Deep, AA-safe).
- Fonts: `--font-display` = Bricolage Grotesque, `--font-body` = Inter (loaded in
  `__root.tsx`; self-host via `@fontsource` for production).
- Deliberately distinct from Know Thyself (Fraunces) — AS uses Bricolage Grotesque.

## Content model (S8.1)
- **static-in-repo.** Pages composed in `src/content/*` from spine components. No CMS,
  no hub edit-flow.

## SEO & assets (S7)
- Per-route `head()` on every route (title, description, OG); `lang="en-GB"` hard-set in
  `__root`; `public/sitemap.xml` + `public/robots.txt` shipped.
- **The concept build ships a PLACEHOLDER link-preview card**, `public/og-card.png` (1200 x 630,
  saying on its face that it is a placeholder), behind an ABSOLUTE `og:image` with its type,
  width, height and alt, plus `og:locale` and `twitter:card` `summary_large_image`, all filled
  from `og` and `site.canonicalHost` in `site.config` (R221). Replace the card with a branded
  one under 300 KB, and its alt text, before launch.
- `sitemap.xml`/`robots.txt` use `https://aismith.io` as the canonical host. The crawl is
  allowed on purpose so the `noindex` meta governs: `seo.noindex` (`site.config`) is the
  demo↔production switch — true on the shareable demo, false in production.

## Data posture (S5)
- **no-db.** No database, no Supabase client anywhere in the shipped site. No read-pipe.
- Therefore S6.4 (read-pipe doorway) is **N/A** for this site.
- **Step 0 (S5.4):** at project creation, **provision no managed backend** (never Lovable
  Cloud or any other auto-provisioned data surface). A no-db site provisions no database.
  Nothing to connect.

## Optional modules enabled (S3.3)
- **None.** Content-light marketing site. (No marquee, lightbox, gallery, audio, video
  facade, score/step grids, timeline, team, map.) Core spine only.

## Integrations (S6 — endpoints public, secrets in env)
- **Live contact path in THIS build: `mailto:contact@aismith.io`.** Every contact CTA here is a
  mailto — the intended concept MVP. (Production default for a real site is the `ContactForm`
  posting to the shared contact endpoint below; mailto is the concept-demo exception, not the
  fleet default.)
- **Declared, not yet mounted.** The spine's `ContactForm` / `NewsletterForm` **ship but are
  mounted on no page** in this build (footer omits the newsletter); until a form replaces mailto
  they are uncalled. (Capability on the shelf, not live integration.)
- **Contact = shared backbone (no per-site function).** The form posts to the multi-tenant
  `contact` endpoint on the shared **`AISmith-functions`** Supabase project — canonical source
  `functions/contact/` in the Factory repo, **not reproduced per site**. Onboarding a site is a
  **config change, never a code change**: add one key to the `CONTACT_TENANTS` secret
  (`origin -> {to, from?, subject?}`). Origin allowlist is the CORS control; the destination is
  resolved server-side (never from the request body); honeypot + per-origin rate-limit drop abuse.
  Secret: `RESEND_API_KEY` (+ `CONTACT_FROM_DEFAULT`). See `functions/DEPLOY.md`.
- **Newsletter = per-site function (Brevo).** No shared newsletter backbone exists, so this stays
  a per-site Supabase Edge Function deployed into the site's own functions-only project when
  mounted: `/functions/v1/newsletter` (Brevo; `BREVO_API_KEY`, `BREVO_LIST_ID` in env), CORS
  locked to the site domain. See `functions/newsletter.ts` + `functions/DEPLOY.md`.
- **Runtime:** Supabase Edge Functions (Deno, `Deno.serve`), public (`--no-verify-jwt`), no DB
  access, no service-role, no stored data, no `supabase-js` in the bundle — the front end only
  `fetch`es the function URL. They never auto-deploy. Not the classic Netlify/Cloudflare shapes.
- Booking → Cal.com link/embed (optional; no key client-side).
- **No service-role key, no secret, no hub-DB write anywhere client-side.**

## Deploy target (S8.2)
- **Host = Netlify (Pro):** static/prerendered front end (SSG all routes, so
  view-source carries per-route meta), custom domain via CNAME/ALIAS to Netlify, automatic SSL.
- **Server-side runtime = Supabase Edge Functions** in the site's own functions-only project.
  Netlify hosts the front end only — no server logic. Per `as-fleet-organisation.md` §7 host model.
- Demo↔production is configuration only: the `seo.noindex` toggle + the domain (+ optional
  function mount). No host move, no rebuild.

## §8 transfer unit (S8.3)
- Own repo + own host + edge-function env. No DB to transfer. Independently portable;
  not entangled with any hub.

## Footer / brand rule
- Public brand is **AI Smith**; the operating legal entity is not foregrounded in
  client-facing chrome. Legal line: "AI Smith · Antwerp, Belgium · Concept site 2026."
```

### `functions/DEPLOY.md`

````markdown
# Functions — deploy

Two different models, on purpose:

## contact — shared backbone (no per-site deploy)
`contact` is **not** a per-site function. Every AI Smith site posts to the **one** multi-tenant
`contact` endpoint on the shared **`AISmith-functions`** Supabase project. The source is
canon-tracked in the Factory repo (`functions/contact/`) and deployed from there; writes to the
live shared project are support-track / human-gated (one bad change hits every tenant).

**Onboard this site:** add one key to the `CONTACT_TENANTS` secret on the shared project —
`"https://<site-domain>": { "to": "<inbox>", "from"?, "subject"? }`. No source change, no
redeploy. Then point the front end's `contactAction` at
`https://<aismith-functions-ref>.supabase.co/functions/v1/contact`. Origin allowlist is the CORS
control; destination is server-side; honeypot + per-origin rate-limit are built in.
(Regression watch: `OPTIONS -> 204` must carry no body.)

## newsletter — per-site function (Brevo)
No shared newsletter backbone exists, so newsletter is a **per-site** Supabase Edge Function in
the site's **own** functions-only Supabase project (AS-owned org, empty of tables), mounted only
if the site runs a newsletter. Set secrets and deploy into that project:

```bash
supabase secrets set BREVO_API_KEY=... BREVO_LIST_ID=...   # newsletter
supabase functions deploy newsletter --no-verify-jwt        # public; CORS locked in-handler
```

Front end calls it by `fetch`:
```
POST https://<site-project-ref>.supabase.co/functions/v1/newsletter
```
The front end ships **no** `supabase-js` / DB client — it only `fetch`es the function URL.

## Do NOT
- Do **not** use classic Netlify Functions (`exports.handler = (event, context) =>`) or the
  old dual `export default` / `export const onRequestPost` shape — this fleet runs Supabase
  Edge Functions (`Deno.serve`) only.
- Do **not** provision tables in any site Supabase project. It is functions-only; a no-db site
  that grows a data surface fails the audit.
- Do **not** reproduce or fork the shared `contact` function per site — onboard via the
  `CONTACT_TENANTS` key instead.
````
---

## Changelog

- **v0.11.6 -- 13 Oct 2026:** **THE APPENDIX FILE TABLE EQUALS ITS OWN FOUR BLOCKS** (member M4 of `prompts/dispatch/plan-ubuntu26-2026-10-13.md` v0.2 SS5.2, the table half of `backlog.md`'s row on the site seed's truncated SCAFFOLD.md and functions/DEPLOY.md; riding site-contract 1.8.31 -> **1.8.32**, batched with hub-contract 1.7.23 on the operator's ruling 67 of 2026-10-13, the cut that pins the stamped runners to `ubuntu-24.04`). *Build-guidance docs* declared 91, 45, 75 and 61 lines for `README.md`, `SCAFFOLD.md`, `aismith-site-charter.md` and `functions/DEPLOY.md`; re-measured at this version as the lines between each block's opening and closing fence, the blocks hold 90, 45, 86 and 41, and the table now says so (the code review of #1382, F3, measured 89, 45, 83 and 41 at v0.11.4 by the same count, and v0.11.5's re-embed moved the README and charter blocks). `functions/DEPLOY.md`'s 41 is its block's, an excerpt since v0.11.5 (Q8). No block moves and nothing else in the file moves; the seed half of that row (SCAFFOLD.md and functions/DEPLOY.md whole, no Lovable) is a seed PR and stays on the row. *File manifest (code)* is NOT re-measured here: it is not that row's table, and it disagrees with its own blocks on six rows and declares a seventh, `functions/contact.ts`, that has no block (raised in this cut's PR). A RECORD for the T3 register (`backlog.md`'s PENDING-PROMOTION row): no rule rides this entry. No em dashes.
- **v0.11.5 -- 11 Oct 2026:** **RE-EMBEDDED from the seed at `aismith-site-seed` `main` `3bd5c28c736adbb62634ac0d5595cc8179566bd5` (W14, #25, on W13's `9118d969`, #24), riding site-contract 1.8.30 -> 1.8.31, coupled with hub-contract 1.7.21** (`prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E17). FOUR file blocks are replaced WHOLE by the seed's file at that sha: `src/styles/tokens.css` (W13's `--line-input`), `src/content/site.config.tsx` (the `og` fill point), `src/routes/__root.tsx` (the absolute `og:image` block and `<html lang="en-GB">`) and `src/content/website.tsx` (W14's link to `/og-card.png`, R109's seed half). **Two of the four were drifting BEFORE W13** (`tokens.css`, which lacked the seed's optional-slot comment block, and `site.config.tsx`, which carried a longer `[6] LOGO` comment): both differed at `b8074088` already, and the whole-block re-embed discharges that drift with W13's. **Measured before and after**: of the twenty compared file blocks, five differed at `3bd5c28` (these four and `functions/DEPLOY.md`), fifteen EQUAL; after the re-embed every compared block reads EQUAL against `git show 3bd5c28:<path>`. **`functions/DEPLOY.md` is NOT re-embedded and leaves the compared set** (the controller's Q8 ruling, *measured, not guessed*): the seed's file has ONE commit in its whole history, `fe87d12` (2026-06-29, the seed's first scaffold), at 21 lines, byte-equal to this block's first 21 lines and ending where the block's inner `bash` fence opens; no seed commit ever held the block's remaining lines (`git log --all -S'functions deploy newsletter'` over the seed returns none), while this file has carried all 41 since its first Factory commit `b0ad6bc` (2026-06-20). So the seed never held them, and the block is what SS6's heading already calls it, one of FOUR build-guidance files, an excerpt beside `README.md`, `SCAFFOLD.md` and `aismith-site-charter.md`, none of them compared. **Three stale appendix sentences take the seed's own reading**: the README excerpt's *No `og:image` asset ships yet* and the charter excerpt's *No `og:image` asset in the concept build* now name the placeholder card behind an absolute `og:image` (the seed charter's SS SEO and assets), and both excerpts' `lang="en"` read `en-GB` (the seed's `README.md` and charter, W13's R221 seed limb). The re-embedded `site.config.tsx` carries one em dash of the seed's own (its `[6] LOGO` comment) where the old block carried one; this entry adds none. **This doc's changelog is classified for the T3 register (R167)**: seven entries, v0.11.4 to v0.9, ALL RECORDS, no promotion owed (v0.11.4's licence sentence lives in the repo-level file manifest, v0.11.2's `brandMark` rule in `site.config`, v0.11.0's contact and newsletter split in SS4 and `functions/DEPLOY.md`).
- **v0.11.4 -- 20 Sep 2026:** **THE FOUR NOT-CLASSIFIED FILES GAIN THE LICENCE SENTENCE, WHICH IS WHAT *NOT CLASSIFIED* MEANS HERE RATHER THAN AN OMISSION** (E1, row 034; site-contract 1.8.28 -> **1.8.29**, the UNCOUPLED cut; `prompts/dispatch/plan-cut-1829-2026-09-19.md` v0.2 SS4b). Operator ruling 2026-09-17, quoted in the row: *No third class. They stay unclassified and the build prompt is licensed to edit the named field.* For each of the four, the FIELD named in the third column is the whole of what a build may change and the second column is invariant; a build that edits anything else in those files has diverged. **The four-file table and the `verify.mjs` baseline do not move.** No em-dashes.
- **v0.11.3 — 14 Aug 2026:** **The repo-level file manifest**, and the first honest statement of
  what this pair does not cover. Nine of the seed's 59 tracked files were classified by neither
  half of the markdown-of-record (measured 2026-08-14 at seed `d719e03b`). `netlify.toml`,
  `public/_headers`, `package-lock.json` and `backlog.md` are declared SEED-INSTANCE here;
  `src/router.tsx` is declared SEED-SPINE in `as-site-seed-spine.md` v0.13.3 and enters the
  `verify.mjs` baseline (25 files to 26). **`vite.config.ts`, `package.json`, `tsconfig.json` and
  `.gitignore` are NOT classified**, with the invariant half and the variable half of each named,
  because each is spine in structure and instance in a field and a coin toss would either freeze a
  value the build prompt instructs a builder to change or licence editing the substrate. The
  scaffold-versus-seed contradiction they all rest on is raised and left open. Matches
  site-contract **1.8.19**.

- **v0.11.2 — 29 Jun 2026:** Added the `site.config` **`brandMark`** declaration ({ kind: "image" | "wordmark", src? }) now read by `verify.mjs` [6]. Default `image` forces the real extracted mark; a text wordmark is legal only when explicitly declared. The AI Smith reference mark is genuinely typographic, so this instance declares `kind: "wordmark"` (it would otherwise fail the new gate). Promoted: site-contract 1.6.12 → 1.6.13.

- **v0.11.1 — 29 Jun 2026:** Lovable retired (host + authoring). At-a-glance host note: no host exceptions remain (SK migrated off Lovable publish onto Netlify 29 Jun). The "Before you start" scaffold block, the embedded `SCAFFOLD.md`/README/charter templates, and the Step-0 backend-posture lines de-Lovabled — build is agent-direct (Claude Code clones `aismith-site-seed`, writes files into the repo, no paste-loop), demo URL is the Netlify demo subdomain, and backend posture reads "provision no managed backend" (Lovable Cloud stays the named banned backend).
- **v0.11.0 — 26 Jun 2026:** Folded cafe-kamiel bucket-4 Patch 2 (the seed shelf described the
  pre-v0.8 contact model). **Contact** is now documented as the **shared `AISmith-functions`
  backbone** — the seed no longer reproduces a divergent per-site `contact.ts`; it points at the
  canonical Factory source (`functions/contact/`) and the **one-key `CONTACT_TENANTS` onboarding**
  (no per-site deploy; origin-allowlist CORS, server-side destination, honeypot, rate-limit,
  OPTIONS-204-no-body). **Newsletter** is made **explicitly per-site** (Brevo; no shared backbone
  exists), resolving the prior "site's own project" contradiction by intent rather than papering
  over it. `DEPLOY.md` split into the two models; Integrations (S6) + §4 header updated. *Assumption
  flagged for review:* the concept build keeps its `mailto:` CTAs (production default = the form to
  the shared endpoint); newsletter stays per-site until/unless a shared newsletter backbone is added.

- **v0.9.1 — 22 Jun 2026:** Tone map moved out of `tokens.css` to `spine.css` (frozen layer,
  `as-site-seed-spine.md` v0.9.1), per the 22 Jun decision — `tokens.css` is now variables-only
  (the `verify.mjs` gate requires it).
- **v0.9 — 22 Jun 2026:** Folded proposal item **F** (host model). Host across the at-a-glance
  note, the README "Host model", `robots.txt` canonical-host comment, and the "Host / deploy"
  + "Deploy target (S8.2)" blocks now read **Netlify (Pro)** in place of Lovable publish (custom
  domain via CNAME/ALIAS; Netlify hosts the front end only). The old "never Netlify/Cloudflare"
  wording is corrected — Lovable Cloud is still never used. SK is the fleet-wide parked
  Lovable-publish legacy exception. Supabase Edge Fu