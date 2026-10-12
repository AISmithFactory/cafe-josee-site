# AI Smith — Public-Site Seed: SPINE (frozen layer)

**Version 0.13.8 -- 11 October 2026.** The code half of the public-site seed. Companion to
`as-site-spine-standard.md` (v0.13.0), `as-site-instance` (the reskinnable layer),
`as-site-build-agent.md`, and `as-stack-blueprint.md`. Runnable
implementation-of-record: **`AISmithFactory/aismith-site-seed`** — core spine files are
reproduced verbatim below; **optional modules live in the repo** (`src/components/spine/
modules/`, one file + co-located CSS each) and are listed here by inventory, not copied
(the >2-modules fold, contract-patch #116; a second full copy would only drift).

> **What this is.** The **frozen** layer of the fleet public-site seed — `spine.css` plus
> the component library. Reproduced **verbatim** for every site; **no file here is ever
> edited per site** (spine-standard S3.2). A build diff that touches anything in this doc
> is a fail. The per-site layer (skin, content, routes, functions) lives in
> `as-site-seed-instance.md`. This pair is the markdown-of-record for what used to be the
> `aismith-site-seed.zip` snapshot — it removes the need to re-upload the zip.

> **Seed provenance.** Folded from `aismith-site-seed-v0.7.zip` (the host-model fold:
> `aismith.io` throughout, both edge functions on `Deno.serve` with CORS locked to the
> site domain, Supabase Edge runtime). Spine files are instance-agnostic — they carry no
> AS-specific values.

---

## Layer contract (why this is its own doc)

`Spine never changes. Skin is one file. Content is config.` The spine is the invariant
shared by **every** site in the fleet: structural CSS (`spine.css`) and the React
component library. A new site copies this layer **as-is**, then reskins
`tokens.css` and composes `src/content/*` — see `as-site-seed-instance.md`.

- **Never edit per site** (S3.2). No raw hex or colour-named values here — components read
  design tokens defined in `tokens.css` (S2.2).
- Optional modules are switched on per site by **direct import** from
  `spine/modules/<name>` (never via the barrel — a barrel re-export would bundle every
  module's CSS everywhere), per the site's charter (S3.3). A marketing site ships none;
  a media site (e.g. ZG) ships several.
- The component surface: `primitives.tsx` (Wrap, Section(tone), Band(eyebrow), Display,
  SecTitle, Eyebrow, Lead, Em, Btn(+paper), Crumb), `cards.tsx` (MediaCard(loc, seam
  stamp, meta pill), TierCard, EventCard(posterHref, posterLead), StatCard, InfoCard),
  `chrome.tsx` (SiteHeader, SiteFooter, SkipLink), `forms.tsx` (ContactForm(placeholder
  selects), NewsletterForm(name+email default)).

## File manifest

| File | Role |
|---|---|
| `src/styles/spine.css` | structural CSS incl. tone map + S4.6 hue slots (six) + fx layer |
| `src/components/spine/index.ts` | CORE barrel (modules never re-exported) |
| `src/components/spine/primitives.tsx` | Wrap, Section(tone,hue,fx), Band(ambient,eyebrow), type + Btn(paper) + Crumb |
| `src/components/spine/cards.tsx` | MediaCard(pill,stamp,loc,placements,ground), TierCard(hue,icon), EventCard(noposter,posterHref,posterLead), StatCard, InfoCard |
| `src/components/spine/chrome.tsx` | SiteHeader, SiteFooter, SkipLink |
| `src/components/spine/forms.tsx` | ContactForm, NewsletterForm |
| `src/components/spine/legal.tsx` | PrivacyNotice (S7.4) |
| `src/components/spine/modules/` | optional modules, **by inventory below** — verbatim source in the repo |

**Repo-level files declared SEED-SPINE (site-contract 1.8.19).** The manifest above covers the
spine LAYER, which is two directories. That is not the same set as the files that are frozen: a
file can be spine by classification and live outside `src/components/spine/` and
`src/styles/spine.css`. Until 1.8.19 the seed shipped nine files that neither this document nor
`as-site-seed-instance.md` classified, and `verify.mjs`'s baseline could not have reached one
even had they been declared. The four that remain unclassified are named in the instance doc.

| File | Role | Why spine |
|---|---|---|
| `src/router.tsx` | TanStack Start router factory: wires `routeTree.gen` to the router used for SSR/prerender and client | 18 lines of substrate wiring with no per-site surface. It names no client, no route set, no domain and no key; a site that differs here has edited the substrate rather than skinned it. In the `verify.mjs` baseline as of this version (25 files to 26). |

## To reconstruct
Recreate each file at the path in its heading, verbatim. Together with
`as-site-seed-instance.md` this is the full seed; rezip the union to regenerate
`aismith-site-seed.zip`.

---

### `src/styles/spine.css`

```css
/* ============================================================================
   spine.css — THE SPINE (structure).  NEVER edited per site (S3.2).
   References semantic tokens ONLY — no raw hex, no colour-named token (S2.2).
   De-WordPress'd port of the proven ZG grammar: the Kadence/Fluent-Forms
   survival CSS (#masthead hide, .entry-content resets, 100vw bleed hacks,
   !important form overrides) is intentionally absent — on this stack we own
   the document (§8 strip note).
   ============================================================================ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body); font-size: 16px; line-height: 1.62;
  color: var(--text); background: var(--bg);
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }

/* skip link (S7.2) */
.skip { position: absolute; left: -999px; top: 0; z-index: 200;
  background: var(--text); color: var(--on-dark); padding: 10px 16px; border-radius: var(--radius); }
.skip:focus { left: 12px; top: 12px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto; }
}

/* ---- layout ---------------------------------------------------------------*/
.wrap { max-width: var(--max); margin: 0 auto; padding-left: var(--gutter); padding-right: var(--gutter); }

/* ---- vertical rhythm (v0.13, #122 item 1: the ZG FLOW_CSS bridge folded) ----------
   Flow spacing for composed prose/grids inside a .wrap; titles, body and grids no
   longer butt together on content-rich pages. Spacing between spine roles is spine
   grammar; per-site extra spacing stays composition (S3.2). */
.wrap .eyebrow + * { margin-top: 14px; }
.wrap .sec-title + p, .wrap .sec-title + .lead { margin-top: 18px; }
.wrap p + p, .wrap .lead + p { margin-top: 12px; }
.wrap .sec-title + .grid, .wrap p + .grid, .wrap .lead + .grid,
.wrap .grid + .grid, .wrap .grid + p, .wrap .grid + .eyebrow,
.wrap p + .eyebrow, .wrap .grid + h3, .wrap p + h3 { margin-top: 26px; }
.wrap h3 + p { margin-top: 8px; }
.wrap .actions { margin-top: 18px; }

.section { background: var(--sec-bg, var(--bg)); color: var(--sec-text, var(--text));
  padding: clamp(56px, 7vw, 104px) 0; position: relative; }
.section .lead, .section .sec-soft { color: var(--sec-soft, var(--text-soft)); }
.section.pad-sm { padding: clamp(36px, 4vw, 56px) 0; }
.section.pad-lg { padding: clamp(72px, 9vw, 128px) 0; }

/* reveal-on-scroll (componentised; respects reduced-motion above) */

/* ---- type -----------------------------------------------------------------*/
.display { font-family: var(--font-display); font-weight: 800; line-height: .92; letter-spacing: -.03em; }
.page-title { margin: 14px 0 18px; }
.page-title.s-hero { font-size: clamp(44px, 8vw, 104px); }
.page-title.s-xl   { font-size: clamp(40px, 7vw, 88px); }
.page-title.s-lg   { font-size: clamp(38px, 6.5vw, 80px); }
.sec-title { font-family: var(--font-display); font-weight: 800;
  font-size: clamp(30px, 5vw, 56px); line-height: 1.0; letter-spacing: -.02em; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px;
  font-weight: 700; font-size: .72rem; letter-spacing: .16em; text-transform: uppercase; }
  /* ink: the hue-ink rule below the S4.6 hue slots. Its two tone-keyed arms are RETIRED. */
.lead { font-size: clamp(17px, 1.6vw, 20px); line-height: 1.55; font-weight: 500; max-width: 54ch; }
.em { color: var(--sec-accent, var(--tone-accent, var(--accent-text))); }   /* accent ink: hue, then tone, then the light default (S2.3 / S4.6) */
/* Hue-as-TEXT variants (#122 item 6c, operator-ruled IN 2026-07-30): colour a word in
   the brand's hue family on a LIGHT ground. The text twin of the S4.6 background slots,
   by the --accent/--accent-text precedent: raw hue fills fail AA as text, so a skin
   declares a darkened --hue-N-text (AA-gated vs the light grounds, verify [2]).
   Undeclared = inert: the word keeps the title colour (currentColor). Light-ground
   device only; on dark tones use .em. */
.em-hue-1 { color: var(--hue-1-text, currentColor); }
.em-hue-2 { color: var(--hue-2-text, currentColor); }
.em-hue-3 { color: var(--hue-3-text, currentColor); }
.em-hue-4 { color: var(--hue-4-text, currentColor); }
.em-hue-5 { color: var(--hue-5-text, currentColor); }
.em-hue-6 { color: var(--hue-6-text, currentColor); }

/* ---- S3.2a type roles -- STANDALONE classes -------------------------------
   A spine type role is a STANDALONE class; a component may compose it, it must not
   own it. Every class in this block carries TYPE ONLY -- no colour, no background,
   no position -- so a role can be composed on any tone without carrying a ground
   claim into it. Ground and ink stay with whatever sets the ground: the COMPONENT
   for a card, the SECTION for everything else. For accent ink compose `.em`, which
   is already tone-aware. The four card components below now reference these rather
   than redeclaring the values. */
.cat        { font-weight: 700; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; }
.pill       { font-weight: 800; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase;
  padding: 5px 11px; border-radius: var(--radius-pill); }
.loc        { font-weight: 700; font-size: 12.5px; line-height: 1.5; }
.card-title { font-family: var(--font-display); font-weight: 800; font-size: 22px; }
.card-text  { font-size: 14px; font-weight: 500; line-height: 1.5; }
.price      { font-family: var(--font-display); font-weight: 800; font-size: 38px; line-height: 1; }
.num        { font-family: var(--font-display); font-weight: 800; font-size: clamp(48px, 6vw, 76px); line-height: .92; }
.lbl        { font-weight: 600; font-size: 14.5px; max-width: 22ch; }
/* The seven roles the S3.2a sweep of 2026-08-27 measured as owed (worker-1, session
   local_3b1ccee9, at seed f3904f1d, zuidgeluid-site b860a20a, aismith-site 7d612412;
   plan-site-1824-2026-08-27.md v1.2 M2). Each is TYPE ONLY on the same terms as the eight
   above: the ground, the ink and the box stay with whatever composes the role. Values are
   taken from the cited site source; where two sites drift on a number the LIVE NAMED
   component wins and the drift is an M6 conversion question, not a second class. None of
   the seven is carried by a seed component today (the sweep measured seed inline type at
   ZERO), so they land here unreferenced and the sites convert to them at M6. */
.sec-quote  { font-family: var(--font-display); font-weight: 800;
  font-size: clamp(19px, 2.1vw, 27px); line-height: 1.26; letter-spacing: -.015em; }
.namelist   { font-family: var(--font-display); font-weight: 600; font-size: 15px; line-height: 1.85; }
.galcredit  { font-weight: 700; font-size: 13px; letter-spacing: .03em; }
.galcredit a { font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
.display-line { font-family: var(--font-display); font-weight: 900;
  font-size: clamp(28px, 4vw, 52px); line-height: 1.02; letter-spacing: -.02em; }
.kicker     { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px;
  letter-spacing: .06em; text-transform: uppercase; }
.tag        { font-weight: 500; font-size: 13px; }
.num-sm     { font-family: var(--font-display); font-weight: 800; font-size: 30px; line-height: 1; }

/* ---- Section tone map (moved here from tokens.css, S2.2) -------------------
   Spine-invariant: fixed tone enum x fixed token names, identical on every site, no literal
   colour -- so it lives in the frozen layer and the per-site tokens.css stays variables-only. */
[data-tone="paper"]   { --sec-bg: var(--bg);        --sec-text: var(--text);    --sec-soft: var(--text-soft);
                        --tone-bg: var(--bg); --tone-text: var(--text); --tone-soft: var(--text-soft); --tone-accent: var(--accent-text); }
[data-tone="alt"]     { --sec-bg: var(--bg-alt);    --sec-text: var(--text);    --sec-soft: var(--text-soft);
                        --tone-bg: var(--bg-alt); --tone-text: var(--text); --tone-soft: var(--text-soft); --tone-accent: var(--accent-text); }
[data-tone="surface"] { --sec-bg: var(--surface);   --sec-text: var(--text);    --sec-soft: var(--text-soft);
                        --tone-bg: var(--surface); --tone-text: var(--text); --tone-soft: var(--text-soft); --tone-accent: var(--accent-text); }
[data-tone="dark"]    { --sec-bg: var(--dark);      --sec-text: var(--on-dark); --sec-soft: var(--on-dark-soft);
                        --tone-bg: var(--dark); --tone-text: var(--on-dark); --tone-soft: var(--on-dark-soft); --tone-accent: var(--accent-on-dark); }
[data-tone="slate"]   { --sec-bg: var(--dark-alt);  --sec-text: var(--on-dark); --sec-soft: var(--on-dark-soft);
                        --tone-bg: var(--dark-alt); --tone-text: var(--on-dark); --tone-soft: var(--on-dark-soft); --tone-accent: var(--accent-on-dark); }
[data-tone="accent"]  { --sec-bg: var(--accent);    --sec-text: var(--on-dark); --sec-soft: var(--on-dark-soft);
                        --tone-bg: var(--accent); --tone-text: var(--on-dark); --tone-soft: var(--on-dark-soft); --tone-accent: var(--on-dark); }

/* ---- S4.6 optional hue slots — secondary-palette sections -----------------
   A SKIN that declares --hue-N (+ --hue-N-ink, optional --hue-N-soft) in
   tokens.css re-grounds any [data-hue="N"] section in that hue; undeclared
   slots fall back to the tone (tone = register, hue = brand family).
   Every declared --hue-N / --hue-N-ink pair must clear WCAG AA (S2).
   SIX SLOTS (R112): a site with six categories needs six, and sz-site's six takken
   reached --hue-6 only through an inline var() marked delete-on-fold. Every hue-keyed
   family below carries all six (the slots, .em-hue-N, data-hue-bar, data-hue-tint), and
   verify.mjs [2] fails a family that drops one. */
[data-hue="1"] { --sec-accent: var(--hue-1-accent, var(--tone-accent)); --sec-bg: var(--hue-1, var(--tone-bg)); --sec-text: var(--hue-1-ink, var(--tone-text)); --sec-soft: var(--hue-1-soft, var(--hue-1-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }
[data-hue="2"] { --sec-accent: var(--hue-2-accent, var(--tone-accent)); --sec-bg: var(--hue-2, var(--tone-bg)); --sec-text: var(--hue-2-ink, var(--tone-text)); --sec-soft: var(--hue-2-soft, var(--hue-2-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }
[data-hue="3"] { --sec-accent: var(--hue-3-accent, var(--tone-accent)); --sec-bg: var(--hue-3, var(--tone-bg)); --sec-text: var(--hue-3-ink, var(--tone-text)); --sec-soft: var(--hue-3-soft, var(--hue-3-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }
[data-hue="4"] { --sec-accent: var(--hue-4-accent, var(--tone-accent)); --sec-bg: var(--hue-4, var(--tone-bg)); --sec-text: var(--hue-4-ink, var(--tone-text)); --sec-soft: var(--hue-4-soft, var(--hue-4-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }
[data-hue="5"] { --sec-accent: var(--hue-5-accent, var(--tone-accent)); --sec-bg: var(--hue-5, var(--tone-bg)); --sec-text: var(--hue-5-ink, var(--tone-text)); --sec-soft: var(--hue-5-soft, var(--hue-5-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }
[data-hue="6"] { --sec-accent: var(--hue-6-accent, var(--tone-accent)); --sec-bg: var(--hue-6, var(--tone-bg)); --sec-text: var(--hue-6-ink, var(--tone-text)); --sec-soft: var(--hue-6-soft, var(--hue-6-ink, var(--tone-soft))); background: var(--sec-bg); color: var(--sec-text); }

/* ---- a hue as a BAND or TINT, without grounding (R120) ---------------------
   [data-hue] above GROUNDS whatever carries it: it sets background, color and the four
   --sec-* inks, so a wrapper that wanted a hue only for a stripe or a light wash handed the
   hue's full inks to its children (sz-site's tak cards rendered white text on a tint).
   [data-hue-tint="N"] is the declared way to borrow a hue WITHOUT that: it sets ONE custom
   property, --hue-tint, and nothing else. No background, no color, no --sec-*, so the
   element keeps the ground and the inks it already had. A band or tint reads the property,
   e.g. `border-top: 6px solid var(--hue-tint)` or a color-mix() wash in the site's own
   composition. Precedent: .tier-card[data-hue-bar] (--tier-bar), which already keys a hue
   without grounding. An undeclared slot falls back to --accent, as --tier-bar does.
   verify.mjs [2] fails a [data-hue-tint] block that sets a ground or an ink. */
[data-hue-tint="1"] { --hue-tint: var(--hue-1, var(--accent)); }
[data-hue-tint="2"] { --hue-tint: var(--hue-2, var(--accent)); }
[data-hue-tint="3"] { --hue-tint: var(--hue-3, var(--accent)); }
[data-hue-tint="4"] { --hue-tint: var(--hue-4, var(--accent)); }
[data-hue-tint="5"] { --hue-tint: var(--hue-5, var(--accent)); }
[data-hue-tint="6"] { --hue-tint: var(--hue-6, var(--accent)); }

/* ---- the hue-ink rule (operator ruling 2026-09-06) ------------------------
   ONE rule, keyed by SELECTOR, for the two selectors that held out against it.
   Ink follows the SECTION GROUND -- hue, then tone, then the light default --
   and never [data-tone]. The chain is the same shape for both; only the ROLE
   differs, because that is what the selector is for.

   WHAT IT REPLACES, and both were the same defect reached two ways. `.eyebrow`
   carried `--accent-text` with `[data-tone="dark"]/[slate]` and `[data-tone="accent"]`
   arms; `.crumb a` carried `--sec-soft` with a `[data-tone="dark"]/[slate]` arm.
   `[data-hue]` re-grounds the section but cannot reach inside a selector keyed on
   [data-tone], so on a hue ground each arm painted the TONE's ink on the HUE's
   ground -- a cell no model deriving ink from the tone can see.

   EXACTLY EQUIVALENT ON EVERY TONE-ONLY CASE, which is why it is a collapse and
   not a restyle. The six tone blocks above set --tone-accent and --sec-soft, so
   with no hue composed: dark/slate -> --accent-on-dark and --on-dark-soft, accent
   -> --on-dark, paper/alt/surface and no [data-tone] at all -> --accent-text and
   --text-soft. Every one of those is the value the retired arm set.

   `.eyebrow` was DELIBERATELY held out at the 1824 wave on the measured (0,1,1)
   contest (as-site-seed-spine.md v0.13.6), and `.crumb a` was opened as a seed-side
   row by PR #19. The operator ruled on 2026-09-06 that the hold-out and the finding
   are ONE decision and collapse into one rule. `.em`, `.btn-ghost` and `.crumb`
   already took this chain at 1.8.24; these two are the remainder.

   The [data-hue] check in agents/site/verify.mjs asserts it: both selectors now read
   --sec-*, so their inks resolve through the hue block's OWN fallback chain and enter
   the AA matrix on every composed hue. Reintroduce either arm and the TONE_KEYED scan
   names it by selector on that ground. agents/site/fixtures.mjs holds a pair per
   selector. */
.eyebrow { color: var(--sec-accent, var(--tone-accent, var(--accent-text))); }
.crumb a { color: var(--sec-soft,   var(--tone-soft,   var(--text-soft))); }

/* ---- Section fx layer (deco module behind content) ------------------------*/
.section--fx { position: relative; overflow: hidden; }
.section--fx > .sec-fx { position: absolute; inset: 0; pointer-events: none; }
.section--fx > .wrap { position: relative; z-index: 2; }

/* ---- buttons --------------------------------------------------------------*/
.btn { display: inline-flex; align-items: center; gap: 9px; padding: 14px 24px;
  font-family: var(--font-body); font-weight: 700; font-size: 15px;
  border-radius: var(--radius); transition: transform .14s, box-shadow .14s, background .14s, color .14s; }
.btn svg { width: 17px; height: 17px; }
.btn-action { background: var(--action); color: var(--on-dark); box-shadow: 0 4px 0 var(--action-strong); }
.btn-action:hover { transform: translateY(-2px); box-shadow: 0 6px 0 var(--action-strong); }
.btn-action:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--action-strong); }
/* On dark grounds the filled CTA must separate from the band at rest regardless of how
   dark a site's --action is (S4.5): light ring in section ink, keyed to tone, no new token. */
[data-tone="dark"] .btn-action,
[data-tone="slate"] .btn-action,
[data-tone="accent"] .btn-action { outline: 2px solid var(--sec-text); outline-offset: 0; }
.btn-paper { background: var(--bg); color: var(--text); box-shadow: 0 5px 0 rgba(var(--shadow-color), .3); }
.btn-paper:hover { transform: translateY(-2px); box-shadow: 0 7px 0 rgba(var(--shadow-color), .3); }
.btn-paper:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(var(--shadow-color), .3); }
.btn-line { background: transparent; color: var(--sec-text, var(--text)); border: 2px solid var(--sec-text, var(--text)); }
.btn-line:hover { background: var(--sec-text, var(--text)); color: var(--sec-bg, var(--bg)); }
.btn-ghost { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; font-size: 14px;
  color: var(--sec-accent, var(--tone-accent, var(--accent-text))); border-bottom: 2px solid transparent; padding-bottom: 1px; }
.btn-ghost:hover { border-color: currentColor; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* ---- header ---------------------------------------------------------------*/
.header { position: sticky; top: 0; z-index: 60; background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: saturate(150%) blur(10px); -webkit-backdrop-filter: saturate(150%) blur(10px); transition: box-shadow .3s; }
.header.scrolled { box-shadow: 0 1px 0 var(--line), 0 8px 24px -18px rgba(var(--shadow-color), .4); }
.header-in { max-width: var(--max); margin: 0 auto; padding: 13px var(--gutter);
  display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.logo { display: inline-flex; align-items: center; gap: 9px; cursor: pointer;
  font-family: var(--font-display); font-weight: 800; font-size: 19px; letter-spacing: -.02em; color: var(--text); }
.logo .dot { color: var(--accent); }
.nav { display: flex; align-items: center; gap: 2px; }
.nav a { position: relative; font-weight: 500; font-size: 14.5px; padding: 8px 9px;
  border-radius: 9px; color: var(--text); white-space: nowrap; transition: color .18s; }
.nav a:hover { color: var(--accent-text); }
.nav a.on { color: var(--accent-text); }
.nav a.on::after { content: ""; position: absolute; left: 11px; right: 11px; bottom: 3px;
  height: 3px; border-radius: 3px; background: var(--accent); }
.header-cta { display: inline-flex; align-items: center; gap: 14px; }
.member-link { display: inline-flex; align-items: center; gap: 5px; font-weight: 600; font-size: 14px; color: var(--text); }
.member-link:hover { color: var(--accent-text); }
.burger { display: none; width: 42px; height: 42px; border-radius: 11px;
  background: var(--action); color: var(--on-dark); align-items: center; justify-content: center; }

/* dropdown submenu */
.navitem { position: relative; display: inline-flex; align-items: center; }
.navitem > a { display: inline-flex; align-items: center; gap: 5px; }
.navitem::after { content: ""; position: absolute; top: 100%; left: 0; right: 0; height: 12px; }
.submenu { position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(8px);
  min-width: 230px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-lg);
  box-shadow: var(--shadow); padding: 8px; opacity: 0; visibility: hidden;
  transition: opacity .18s, transform .18s; z-index: 70; }
.navitem:hover .submenu, .navitem:focus-within .submenu { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.submenu a { display: block; padding: 9px 14px; border-radius: 10px; font-size: 14.5px; font-weight: 500; color: var(--text); white-space: nowrap; }
.submenu a:hover { background: var(--bg); color: var(--accent-text); }

/* ---- band (CTA) -----------------------------------------------------------*/
.band { background: var(--sec-bg, var(--dark)); color: var(--sec-text, var(--on-dark));
  padding: clamp(48px, 6vw, 88px) 0; }
.band .wrap { display: grid; grid-template-columns: 1fr auto; gap: 36px; align-items: center; }
.band h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(28px, 4vw, 52px); line-height: 1.0; letter-spacing: -.02em; }
.band p { margin-top: 12px; font-weight: 500; font-size: 16px; max-width: 48ch; line-height: 1.55; color: var(--sec-soft, var(--on-dark-soft)); }

/* Band art layer (#129 follow-up, operator-ruled GRAMMAR 2026-07-30): a brand
   illustration bleeding in from the right under a scrim in the band's own ground,
   so the text half stays readable on any tone. The image is a background layer:
   inherently decorative, no alt surface. URL arrives via --band-art (set by the
   Band component); the scrim keys to --sec-bg, never a hardcoded dark. */
.band--art { background:
    linear-gradient(90deg, var(--sec-bg, var(--dark)) 0%, var(--sec-bg, var(--dark)) 46%,
      color-mix(in srgb, var(--sec-bg, var(--dark)) 50%, transparent) 66%,
      color-mix(in srgb, var(--sec-bg, var(--dark)) 8%, transparent) 100%),
    var(--band-art) right -4% center / auto 86% no-repeat,
    var(--sec-bg, var(--dark));
  position: relative; overflow: hidden; }

/* ---- cards ----------------------------------------------------------------*/
.media-card { display: flex; flex-direction: column; background: var(--card-bg, var(--surface));
  border: 1px solid var(--line-card, var(--line)); border-radius: var(--radius-lg); overflow: hidden;
  color: var(--text); text-decoration: none; box-shadow: var(--shadow); transition: transform .18s, box-shadow .18s; }
.media-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
.media-card .art { position: relative; aspect-ratio: 16/10; background: var(--bg-alt); overflow: hidden; }
.media-card .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.media-card .body { padding: 18px 22px 22px; }
.media-card .cat { color: var(--accent-text); }
.media-card .art img { transition: transform .3s ease; }
.media-card:hover .art img { transform: scale(1.05); }
.media-card .pill { position: absolute; top: 12px; right: 12px; z-index: 2;
  background: var(--surface); color: var(--accent-text); box-shadow: var(--shadow); }
.media-card .stamp { position: absolute; left: 14px; bottom: -18px; z-index: 2;
  width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; background: var(--surface-warm); box-shadow: var(--shadow);
  pointer-events: none; }
.media-card .stamp > img, .media-card .stamp > svg { width: 62%; height: 62%; object-fit: contain; }
/* #128: stamp straddling the media/body seam -- .body is the positioning context and is
   not clipped, so a negative offset renders in full (the "art" placement clips by
   definition: a negative offset inside overflow:hidden). */
.media-card .body { position: relative; }
.media-card .stamp--seam { top: -30px; left: 20px; bottom: auto; width: 54px; height: 54px;
  border: 3px solid var(--bg-alt); background: var(--bg-alt); overflow: hidden; transform: rotate(-4deg); }
/* #128: pill in a body meta row (action tint ground; no shadow fighting a photo) */
.media-card .meta { display: flex; justify-content: flex-end; min-height: 26px; }
.media-card .pill--meta { position: static; box-shadow: none;
  background: color-mix(in srgb, var(--action) 14%, transparent); color: var(--action-strong); }
/* #128: short qualifier line between title and body */
.media-card .loc { color: var(--text); margin-bottom: 9px; }
.media-card h3 { margin: 6px 0 6px; }
.media-card p { color: var(--text-soft); margin-bottom: 12px; }

.tier-card { position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 13px;
  background: var(--card-bg, var(--surface)); border: 1px solid var(--line-card, var(--line)); border-radius: var(--radius-lg);
  padding: 30px 24px 26px; box-shadow: var(--shadow); }
.tier-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--tier-bar, var(--accent)); }
.tier-card[data-hue-bar="1"] { --tier-bar: var(--hue-1, var(--accent)); }
.tier-card[data-hue-bar="2"] { --tier-bar: var(--hue-2, var(--accent)); }
.tier-card[data-hue-bar="3"] { --tier-bar: var(--hue-3, var(--accent)); }
.tier-card[data-hue-bar="4"] { --tier-bar: var(--hue-4, var(--accent)); }
.tier-card[data-hue-bar="5"] { --tier-bar: var(--hue-5, var(--accent)); }
.tier-card[data-hue-bar="6"] { --tier-bar: var(--hue-6, var(--accent)); }
.tier-card .tier-ico { width: 46px; height: 46px; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; background: var(--tier-bar, var(--accent));
  color: var(--on-dark); }
.tier-card .tier-ico svg { width: 22px; height: 22px; }
.tier-card .label { font-family: var(--font-display); font-weight: 800; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-text); }
.tier-card .price small { display: block; font-family: var(--font-body); font-weight: 500; font-size: 12px; color: var(--text-soft); margin-top: 6px; }
.tier-card ul { list-style: none; display: grid; gap: 9px; }
.tier-card li { font-size: 14px; color: var(--text-soft); font-weight: 500; line-height: 1.45; padding-left: 22px; position: relative; }
.tier-card li::before { content: ""; position: absolute; left: 0; top: 7px; width: 8px; height: 8px; border-radius: 2px; background: var(--accent); }

.event-card.noposter { grid-template-columns: 1fr; }  /* posterless most of the year by design */
.event-card { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center;
  background: var(--card-bg, var(--surface)); border: 1px solid var(--line-card, var(--line)); border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow); }
.event-card .poster { width: 132px; border-radius: var(--radius); overflow: hidden; }
.event-card .poster a { display: block; }
/* #141 item 4: poster-led variant -- a portrait flyer is the content, not a thumbnail.
   Width from an optional token; the poster keeps its own aspect (no cover-crop of
   caller-supplied artwork of unknown aspect). */
.event-card--lead .poster { width: var(--poster-lead, 220px); }
.event-card .when { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--accent-text); margin-bottom: 8px; }
.event-card h3 { margin-bottom: 6px; }
.event-card .det { font-size: 14px; color: var(--text-soft); font-weight: 500; line-height: 1.45; }

/* S2.3 / G1: --sec-soft is the ink for the SECTION's ground, so only a soft-ink selector
   sitting DIRECTLY on that ground may read it. Measured 2026-08-23: of the nine content-level
   soft-ink selectors in this file, exactly TWO do -- `.stat .lbl` below and `.crumb a`, which
   moved to the hue-ink rule above on 2026-09-06 and still reads --sec-soft. The other seven
   (`.media-card .loc`/`p`, `.tier-card .price small`/`li`,
   `.event-card .det`, `.info-card .v`, `.form-card label`) sit inside components that set
   their OWN ground, so widening them keys card ink to the section and regresses: `.info-card .v`
   inside a [data-tone="dark"] Section goes from 7.11 to 1.07. Card ink following the card's
   ground is a separate and larger question with its own row. DO NOT widen this to the other
   seven without it. */
.stat .num .plus { color: var(--accent); }
.stat .lbl { margin-top: 6px; color: var(--sec-soft, var(--text-soft)); }

.info-card { background: var(--card-bg, var(--surface)); border: 1px solid var(--line-card, var(--line)); border-radius: var(--radius); padding: 16px 18px; }
.info-card .k { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: var(--accent-text); margin-bottom: 4px; }
.info-card .v { font-size: 13.5px; color: var(--text-soft); font-weight: 500; line-height: 1.46; }

/* per-card ground override (#122 item 4): ground="page" re-grounds one card on the
   page-alt surface (white on ZG) without a skin edit; tokens only. */
[data-card-ground="alt"] { --card-bg: var(--bg-alt); }

/* generic responsive grids used by page compositions */
.grid { display: grid; gap: 22px; }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* ---- forms ----------------------------------------------------------------*/
.form-card { background: var(--card-bg, var(--surface)); border: 1px solid var(--line-card, var(--line)); border-radius: var(--radius-lg);
  padding: clamp(22px, 3vw, 32px); box-shadow: var(--shadow); }
.form-card label { display: block; font-weight: 700; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--text-soft); margin: 14px 0 5px; }
.form-card label:first-of-type { margin-top: 0; }
/* The field EDGE is the control's only boundary, so WCAG 1.4.11 owes it 3.0 against the field
   AND against the card it sits in. --line is the rule-and-divider token and measured 1.27 and
   1.38 on this seed's skin (R121), so the edge reads --line-input, a skin token that clears 3.0
   on both grounds; a skin that has not declared it falls back to --text-soft, which already
   clears 4.5 there. agents/site/verify.mjs [2] scores the edge against both grounds. */
.form-card input, .form-card textarea, .form-card select {
  width: 100%; font-family: var(--font-body); font-size: 15px; color: var(--text);
  background: var(--bg); border: 2px solid var(--line-input, var(--text-soft)); border-radius: 11px; padding: 11px 13px; outline: none; transition: border-color .18s; }
.form-card input:focus, .form-card textarea:focus, .form-card select:focus { border-color: var(--accent); }
.form-card textarea { min-height: 120px; resize: vertical; line-height: 1.5; }
.form-card .btn { margin-top: 18px; }
.form-done { margin-top: 14px; padding: 13px 16px; background: var(--bg); border-radius: var(--radius); font-weight: 700; color: var(--accent-text); }

.nl-form { display: flex; flex-direction: column; gap: 9px; }
.nl-form .btn { justify-content: center; }
.nl-done { font-weight: 700; color: var(--on-dark); }
.nl-form input { width: 100%; font-family: var(--font-body); font-size: 14px; color: var(--text);
  background: var(--bg); border: 2px solid transparent; border-radius: 10px; padding: 12px 14px; outline: none; transition: border-color .15s; }
.nl-form input:focus { border-color: var(--accent); }

/* ---- footer ---------------------------------------------------------------*/
.footer { background: var(--dark); color: var(--on-dark); padding: clamp(54px, 6vw, 80px) 0 28px; }
.footer .logo { color: var(--on-dark); }
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 40px; }
.footer h4 { font-family: var(--font-display); font-weight: 800; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent-on-dark); margin-bottom: 16px; }
.footer a.fl, .footer p.ft { display: block; color: var(--on-dark-soft); font-size: 14.5px; line-height: 2; font-weight: 500; }
.footer a.fl:hover { color: var(--on-dark); }
.footer .tagline { font-size: 15px; color: var(--on-dark-soft); line-height: 1.55; margin: 16px 0 14px; max-width: 34ch; }
.footer-bottom { position: relative; margin-top: 44px; padding-top: 22px; display: flex; justify-content: space-between;
  gap: 18px; flex-wrap: wrap; font-size: 13px; color: var(--on-dark-soft); }
.footer-bottom::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--rule-on-dark); }
.footer-bottom .socials { display: inline-flex; align-items: center; gap: 15px; }
.footer-bottom .legal-link { margin-left: 16px; color: var(--on-dark-soft); font-size: 13.5px; }
.footer-bottom .legal-link:hover { color: var(--on-dark); }
/* ---- legal / privacy notice (core, S7.4) ---------------------------------*/
.legal { max-width: 70ch; }
.legal-meta { font-size: 14px; color: var(--sec-soft, var(--text-soft)); margin-bottom: 8px; }
.legal h2 { font-family: var(--font-display); font-weight: 800;
  font-size: clamp(20px, 2.6vw, 28px); margin: 34px 0 10px; }
.legal p, .legal li { font-size: 16px; line-height: 1.65; color: var(--sec-soft, var(--text-soft)); }
.legal ul { margin: 8px 0 8px 1.1em; display: grid; gap: 7px; }
.legal a { color: var(--accent-text); text-decoration: underline; text-underline-offset: 2px; }
.legal strong { color: var(--sec-text, var(--text)); font-weight: 700; }

/* ---- breadcrumb (core, #141 item 6) ---------------------------------------*/
.crumb { display: inline-flex; align-items: center; gap: 7px; font-weight: 800;
  font-size: 12.5px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--sec-accent, var(--tone-accent, var(--accent-text))); }
/* .crumb a ink: the hue-ink rule below the S4.6 hue slots. Its tone-keyed arm is RETIRED. */
/* HOVER reads the crumb's OWN accent chain, never --accent (R122). --accent is a FILL token, and
   this is 12.5px text, so 4.5 is owed: --accent measured 3.81 on this seed's --bg. The chain is
   --accent-text on the light tones (5.42 on --bg), --accent-on-dark on dark and slate, and the
   hue's accent on a hue ground, which is every ground a crumb sits on. verify.mjs [2] scores
   each crumb rule on each of those grounds. */
.crumb a:hover { color: var(--sec-accent, var(--tone-accent, var(--accent-text))); }

/* ---- responsive -----------------------------------------------------------*/
@media (max-width: 900px) {
  .nav { display: none; }
  .burger { display: inline-flex; }
  .header.nav-open .nav { display: flex; flex-direction: column; align-items: stretch; gap: 0;
    position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); border-top: 1px solid var(--line);
    box-shadow: var(--shadow); padding: 10px var(--gutter) 18px; }
  .header.nav-open .nav a { padding: 13px 4px; font-size: 16px; border-bottom: 1px solid var(--line); }
  /* THE OPEN PHONE MENU SHOWS A NAV ITEM'S CHILDREN (R125). A .submenu is a hover/focus-within
     dropdown, and its parent is itself a link, so on a touch screen the tap that fades the
     dropdown in is also the click that leaves the page. In the open phone menu each .navitem is
     a block, its ::after hover bridge is hidden, and each .submenu is static, always shown and
     indented 18px under its parent, which stays its own link. The desktop dropdown above is
     untouched. The column scrolls inside the viewport, because the header is sticky and a menu
     taller than the screen would otherwise leave its last links out of reach. verify.mjs [10]
     fails a spine.css whose open phone menu does not do this. */
  .header.nav-open .nav { max-height: calc(100vh - 68px); max-height: calc(100dvh - 68px); overflow-y: auto; overscroll-behavior: contain; }
  .header.nav-open .nav .navitem { display: block; }
  .header.nav-open .nav .navitem::after { display: none; }
  .header.nav-open .nav .navitem > a { display: flex; }
  .header.nav-open .nav .submenu { position: static; opacity: 1; visibility: visible; transform: none;
    min-width: 0; background: none; border: 0; border-radius: 0; box-shadow: none; padding: 0 0 0 18px; transition: none; }
  .header.nav-open .nav .submenu a { white-space: normal; }
  .band .wrap { grid-template-columns: 1fr; }
  .grid-3, .grid-4 { grid-template-columns: 1fr 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .event-card { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}
@media (max-width: 540px) {
  .grid-3, .grid-4, .footer-grid { grid-template-columns: 1fr; }
}

/* ---- band ambient (additive; the Band `ambient` prop) ---------------------*/
.band--fx { position: relative; overflow: hidden; }
.band--fx .wrap { position: relative; z-index: 2; }
.bandfx { display: none; }
html:not([data-skin]) .bandfx--ember,
html[data-skin="forge"] .bandfx--ember,
html[data-skin="original"] .bandfx--ember { display: block; }
html[data-skin="engine"] .bandfx--node { display: block; }
html[data-skin="blueprint"] .bandfx--dots { display: block; }
@keyframes sp-emberRise { 0% { opacity: 0; transform: translateY(12px) scale(.7); } 22% { opacity: .9; } 100% { opacity: 0; transform: translateY(-46px) scale(1); } }
@keyframes sp-dashFlow { to { stroke-dashoffset: -33; } }
@keyframes sp-pulseDot { 0%, 100% { opacity: .35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
@media (prefers-reduced-motion: reduce) { .bandfx, .bandfx * { animation: none !important; } }
```

### `src/components/spine/index.ts`

```ts
// spine/index.ts — barrel for the CORE spine library (S3.1).
// Optional modules (S3.3) live in ./modules/, ONE FILE + co-located CSS per module,
// and are IMPORTED DIRECTLY, never re-exported here — a barrel re-export would pull
// every module's CSS into every site. A site that doesn't enable a module bundles
// neither its JS nor its CSS. Realised: map, hours, video (VideoFacade), gallery
// (GalleryGrid + Lightbox + filter), marquee, audio (AudioPlayer), deco (DecoStar/
// Grain/ZigZag/TiltFrame/CutBadge/PulsePill). Switched on per the site charter.
// AI Smith ships none of them — it is a content-light marketing site.
export * from "./primitives";
export * from "./cards";
export * from "./chrome";
export * from "./forms";
export * from "./legal";    // CORE: PrivacyNotice (S7.4)
```

### `src/components/spine/primitives.tsx`

```tsx
// spine/primitives.tsx — layout + type + button atoms.  SPINE: never edited per site.
// Reference tokens only (via spine.css classes); no colour decisions live here.
import * as React from "react";

type Tone = "paper" | "alt" | "surface" | "dark" | "slate" | "accent";

export function Wrap({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="wrap" style={style}>
      {children}
    </div>
  );
}

/** Section — the alternating-banner unit (S4). `tone` maps to tokens in tokens.css.
    `hue` (S4.6, optional): a bounded secondary-palette slot 1-6. Each slot the SKIN
    declares in tokens.css (--hue-N + --hue-N-ink [+ --hue-N-soft], AA-gated pair)
    re-grounds the section in that hue; an undeclared slot falls back to the tone —
    tone = register, hue = brand family. `fx` layers decorative content (the deco
    module) behind the content; it is aria-hidden and never intercepts input. */
export function Section({
  tone = "paper",
  hue,
  pad,
  id,
  className = "",
  fx,
  children,
}: {
  tone?: Tone;
  hue?: 1 | 2 | 3 | 4 | 5 | 6;
  pad?: "sm" | "lg";
  id?: string;
  className?: string;
  fx?: React.ReactNode;
  children: React.ReactNode;
}) {
  const cls = ["section", pad ? `pad-${pad}` : "", fx ? "section--fx" : "", className]
    .filter(Boolean).join(" ");
  return (
    <section id={id} data-tone={tone} data-hue={hue} className={cls}>
      {fx && <div className="sec-fx" aria-hidden="true">{fx}</div>}
      <Wrap>{children}</Wrap>
    </section>
  );
}

/** Band — full-width CTA (replaces ZG .cta/.steun). Defaults to a dark tone.
    `ambient` (additive) layers per-skin quiet motion behind the band: embers for
    forge/original (and the no-skin default), a node network for engine, a dotted grid
    for blueprint. Markup ships all three; spine.css gates visibility by [data-skin]. */
export function Band({
  tone = "dark",
  eyebrow,
  heading,
  sub,
  actions,
  id,
  ambient = false,
  art,
}: {
  tone?: Tone;
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  id?: string;
  ambient?: boolean;
  /** Brand illustration bleeding in from the right under a tone-ground scrim
      (grammar since v0.13.1, #129 follow-up). Background layer: decorative only. */
  art?: string;
}) {
  const cls = ["band", ambient ? "band--fx" : "", art ? "band--art" : ""].filter(Boolean).join(" ");
  const style = art ? ({ "--band-art": `url("${art}")` } as React.CSSProperties) : undefined;
  return (
    <section id={id} data-tone={tone} className={cls} style={style}>
      {ambient && <BandAmbient />}
      <Wrap>
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {actions && <div className="actions">{actions}</div>}
      </Wrap>
    </section>
  );
}

const bandEmbers: [number, number, number, number, number][] = [
  [6, 8, 5, 4.2, 0],
  [14, 0, 3, 5.1, 0.8],
  [22, 12, 6, 4.7, 1.6],
  [31, 2, 4, 5.6, 0.3],
  [39, 16, 3, 4.4, 2.1],
  [47, 4, 5, 5.3, 1.1],
  [55, 10, 4, 4.9, 0.6],
  [63, 1, 6, 5.8, 1.9],
  [71, 14, 3, 4.3, 0.4],
  [79, 5, 5, 5.4, 1.4],
  [87, 11, 4, 4.6, 2.3],
  [93, 3, 3, 5.0, 0.9],
];
const bandNodeLines: [number, number, number, number][] = [
  [70, 60, 230, 130],
  [230, 130, 180, 250],
  [230, 130, 420, 80],
  [420, 80, 560, 180],
  [560, 180, 480, 260],
  [560, 180, 720, 110],
  [720, 110, 880, 190],
  [880, 190, 820, 270],
  [720, 110, 640, 40],
  [420, 80, 330, 30],
];
const bandNodeDots: [number, number, number, number][] = [
  [70, 60, 3.5, 0],
  [230, 130, 4.5, 0.4],
  [420, 80, 4, 0.8],
  [560, 180, 4.5, 1.2],
  [720, 110, 4, 0.6],
  [880, 190, 3.5, 1.6],
  [180, 250, 3, 1.0],
  [480, 260, 3, 1.9],
  [640, 40, 3, 0.2],
  [330, 30, 3, 1.4],
];
function BandAmbient() {
  return (
    <>
      <div
        className="bandfx bandfx--ember"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      >
        {bandEmbers.map(([left, bottom, size, dur, delay], i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: `${bottom}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "var(--accent-on-dark)",
              boxShadow: `0 0 ${size + 3}px var(--accent-on-dark)`,
              animation: `sp-emberRise ${dur}s linear infinite ${delay}s`,
            }}
          />
        ))}
      </div>
      <div
        className="bandfx bandfx--node"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "100%" }}
        >
          <g
            stroke="var(--accent-on-dark)"
            strokeWidth="1"
            strokeDasharray="4 7"
            fill="none"
            opacity=".7"
            style={{ animation: "sp-dashFlow 1.1s linear infinite" }}
          >
            {bandNodeLines.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
          </g>
          <g fill="var(--accent-on-dark)">
            {bandNodeDots.map(([cx, cy, r, delay], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `sp-pulseDot 2.4s ease-in-out infinite ${delay}s`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>
      <div
        className="bandfx bandfx--dots"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(var(--accent-on-dark) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export function Display({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`display ${className}`} style={style}>
      {children}
    </span>
  );
}
// PageTitle — the hero <h1>. Size comes from a bounded spine scale (hero|xl|lg), not an
// inline font-size, so a composition never hand-rolls type (S3.2). One h1 per page (S7).
export function PageTitle({
  size = "xl",
  children,
}: {
  size?: "hero" | "xl" | "lg";
  children: React.ReactNode;
}) {
  return <h1 className={`display page-title s-${size}`}>{children}</h1>;
}
export function SecTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="sec-title">{children}</h2>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="lead">{children}</p>;
}
/** Em -- accent-coloured word. `hue` (1-6) colours the word in a declared
    --hue-N-text instead (AA-gated skin slot; undeclared = inert, the word keeps the
    title colour). Light-ground device; on dark tones plain Em. */
export function Em({ hue, children }: { hue?: 1 | 2 | 3 | 4 | 5 | 6; children: React.ReactNode }) {
  return <span className={hue ? `em-hue-${hue}` : "em"}>{children}</span>;
}

type BtnVariant = "action" | "line" | "ghost" | "paper";
export function Btn({
  variant = "action",
  href,
  children,
  onClick,
}: {
  variant?: BtnVariant;
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const cls = variant === "ghost" ? "btn-ghost" : `btn btn-${variant}`;
  if (href)
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/** Crumb -- the breadcrumb a sub-page opens with, directly above its title (core,
    #141: on some pages it is the only route back up, so it is navigation, not
    decoration). `up` is the parent link; omit it when the crumb is a single
    segment; `children` is the current page. */
export function Crumb({
  up,
  children,
}: {
  up?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <span className="crumb">
      {up ? (
        <>
          <a href={up.href}>{up.label}</a>
          <span aria-hidden="true">&middot;</span>
        </>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
```

### `src/components/spine/cards.tsx`

```tsx
// spine/cards.tsx — the five card primitives (Appendix B).  SPINE: never edited per site.
import * as React from "react";

export function MediaCard(
  { image, alt, category, title, loc, body, href, more = "Learn more", pill, stamp,
    stampPlacement = "art", pillPlacement = "art", ground }:
  { image?: string; alt?: string; category?: string; title: string; loc?: string;
    body?: string; href?: string; more?: string; pill?: string; stamp?: React.ReactNode;
    stampPlacement?: "art" | "seam"; pillPlacement?: "art" | "meta";
    ground?: "surface" | "alt" }
) {
  const Tag: any = href ? "a" : "div";
  return (
    <Tag className="media-card" href={href} data-card-ground={ground === "alt" ? "alt" : undefined}>
      <div className="art">
        {image && <img src={image} alt={alt || ""} />}
        {pill && pillPlacement === "art" && <span className="pill">{pill}</span>}
        {stamp && stampPlacement === "art" && <span className="stamp" aria-hidden="true">{stamp}</span>}
      </div>
      <div className="body">
        {stamp && stampPlacement === "seam" && <span className="stamp stamp--seam" aria-hidden="true">{stamp}</span>}
        {pill && pillPlacement === "meta" && <div className="meta"><span className="pill pill--meta">{pill}</span></div>}
        {category && <span className="cat">{category}</span>}
        <h3 className="card-title">{title}</h3>
        {loc && <p className="loc">{loc}</p>}
        {body && <p className="card-text">{body}</p>}
        {href && <span className="btn-ghost">{more} &rarr;</span>}
      </div>
    </Tag>
  );
}

export function TierCard(
  { label, price, per, items, cta, hue, icon }:
  { label: string; price: string; per?: string; items: string[]; cta?: React.ReactNode;
    hue?: 1 | 2 | 3 | 4 | 5 | 6; icon?: React.ReactNode }
) {
  return (
    <div className="tier-card" data-hue-bar={hue}>
      {icon && <span className="tier-ico" aria-hidden="true">{icon}</span>}
      <span className="label">{label}</span>
      <div className="price">{price}{per && <small>{per}</small>}</div>
      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
      {cta}
    </div>
  );
}

export function EventCard(
  { poster, posterAlt, posterHref, posterLead = false, when, title, details, href }:
  { poster?: string; posterAlt?: string; posterHref?: string; posterLead?: boolean;
    when: string; title: string; details?: string; href?: string }
) {
  const img = poster && <img src={poster} alt={posterAlt || ""} loading="lazy" />;
  return (
    <div className={[poster ? "event-card" : "event-card noposter", posterLead ? "event-card--lead" : ""].filter(Boolean).join(" ")}>
      {poster && (
        <div className="poster">
          {posterHref
            ? <a href={posterHref} target="_blank" rel="noopener noreferrer">{img}</a>
            : img}
        </div>
      )}
      <div>
        <span className="when">{when}</span>
        <h3 className="card-title">{title}</h3>
        {details && <p className="det">{details}</p>}
        {href && <a className="btn-ghost" href={href}>Details &rarr;</a>}
      </div>
    </div>
  );
}

export function StatCard({ num, plus, label }: { num: string; plus?: boolean; label: string }) {
  return (
    <div className="stat">
      <div className="num">{num}{plus && <span className="plus">+</span>}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export function InfoCard({ k, v }: { k: string; v: string }) {
  return <div className="info-card"><div className="k">{k}</div><div className="v">{v}</div></div>;
}
```

### `src/components/spine/chrome.tsx`

```tsx
// spine/chrome.tsx — SiteHeader, SiteFooter, SkipLink.  SPINE: never edited per site.
// Content comes from site.config.ts; active nav state comes from the current path.
import * as React from "react";
// C4c (S7.2 / A9): the skip link is the one piece of chrome with rendered COPY in it, so it
// has to be in the document's language. The locale already exists per site as privacy.lang;
// what was missing was the wiring, so the spine reads it here rather than every site passing
// it at every call site. This is the ONE import the spine layer takes from src/content/, and
// it is deliberate: site.config's only import from here is `import type`, which erases at
// build, so the cycle is type-only and there is no runtime edge back. If that ever stops
// being an `import type`, this becomes a real cycle and the wiring has to move.
import { privacy } from "../../content/site.config";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export type FooterColumn = { title: string; links: { label: string; href: string }[] };
export type Social = { label: string; href: string; icon: React.ReactNode };

// The fleet's two languages, matching legal.tsx. An undeclared or unknown locale falls back
// to English, which is the state every site is in today, so no site regresses by omission.
const SKIP_TO_CONTENT: Record<string, string> = {
  nl: "Naar de inhoud",
  en: "Skip to content",
};

export function SkipLink({ lang }: { lang?: string } = {}) {
  const locale = lang ?? (privacy as { lang?: string }).lang ?? "en";
  return <a className="skip" href="#main">{SKIP_TO_CONTENT[locale] ?? SKIP_TO_CONTENT.en}</a>;
}

function useScrolled() {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const on = () => setS(window.scrollY > 14);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return s;
}

export function SiteHeader(
  { logo, nav, cta, memberLink, currentPath = "/" }:
  { logo: React.ReactNode; nav: NavItem[]; cta?: React.ReactNode; memberLink?: { label: string; href: string }; currentPath?: string }
) {
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);
  const isOn = (href: string) => {
    const norm = (p: string) => p.replace(/\/+$/, "") || "/";
    return norm(href) === norm(currentPath);
  };
  return (
    <header className={`header${scrolled ? " scrolled" : ""}${open ? " nav-open" : ""}`}>
      <div className="header-in">
        <a className="logo" href="/">{logo}</a>
        <nav className="nav">
          {nav.map((item) =>
            item.children ? (
              <div className="navitem" key={item.href}>
                <a href={item.href} className={isOn(item.href) ? "on" : ""} aria-haspopup="true">{item.label} ▾</a>
                <div className="submenu">
                  {item.children.map((c) => <a key={c.href} href={c.href}>{c.label}</a>)}
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} className={isOn(item.href) ? "on" : ""}>{item.label}</a>
            )
          )}
        </nav>
        <div className="header-cta">
          {memberLink && <a className="member-link" href={memberLink.href}>{memberLink.label} &rarr;</a>}
          {cta}
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>≡</button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter(
  { logo, tagline, address, columns, newsletter, legal, socials, legalLinks }:
  { logo: React.ReactNode; tagline?: string; address?: React.ReactNode;
    columns: FooterColumn[]; newsletter?: React.ReactNode; legal: React.ReactNode; socials?: Social[];
    legalLinks?: { label: string; href: string }[] }
) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo">{logo}</div>
            {tagline && <p className="tagline">{tagline}</p>}
            {address && <p className="ft">{address}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => <a className="fl" key={l.href} href={l.href}>{l.label}</a>)}
            </div>
          ))}
          {newsletter && <div>{newsletter}</div>}
        </div>
        <div className="footer-bottom">
          <span className="legal-strip">
            {legal}
            {legalLinks && legalLinks.map((l) => (
              <a key={l.href} className="legal-link" href={l.href}>{l.label}</a>
            ))}
          </span>
          {socials && (
            <span className="socials">
              {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>{s.icon}</a>)}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
```

### `src/components/spine/forms.tsx`

```tsx
// spine/forms.tsx — ContactForm + NewsletterForm.  SPINE: never edited per site.
// S6: these POST to an edge function that only sends mail / hits a newsletter API.
// No secret, no service-role, no hub-DB write ever lives client-side.
import * as React from "react";

type Opt = string | { label: string; value: string };
type Field = { name: string; label: string; type?: "text" | "email" | "textarea" | "select";
  options?: Opt[]; placeholder?: string; required?: boolean };

async function postJson(action: string, data: Record<string, string>) {
  const res = await fetch(action, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(String(res.status));
}

// A FAILED POST IS REPORTED, NEVER CONFIRMED (aismith-site #47 drift item 2, raised
// 2026-08-30). This component did `try { await postJson(...) } finally { setSent(true) }`,
// so a rejected or unreachable POST still rendered `done` and the visitor believed a lost
// lead had been delivered. `sent` is now reached only when the post RESOLVES; a failure
// names itself and offers the mail path, which is the behaviour aismith-site shipped
// locally in `src/components/IntakeForm.tsx` because the spine is byte-locked to the
// pinned seed and it could not fix this file.
//
// `failed` mirrors `done`: both mounting sites are Dutch-language and already override
// `done`, so a hardcoded English failure sentence would ship English into a Dutch page.
// `contactEmail` is OPTIONAL because a required prop would break every mounting site's
// build on the pin bump; without it the default failure copy states the failure and asks
// for a retry rather than naming a mail path the component was not given.
//
// THE HONEYPOT DEFAULTS TO `honeypot` (R197), the one key the shared `contact` function
// drops a POST on. It defaulted to `company`, which the function does not reserve, so a
// bot's filled field was folded into the mail and delivered. The function is deliberately
// NOT taught `company` (ruling 2026-10-04): a tenant form may ask for a real company field.
export function ContactForm({ action, fields, submitLabel = "Send", done = "Thanks, we'll be in touch.", honeypot = "honeypot",
  contactEmail, failed }:
  { action: string; fields: Field[]; submitLabel?: string; done?: string; honeypot?: string | false;
    contactEmail?: string; failed?: React.ReactNode }) {
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "failed">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v)]));
    setState("sending");
    try { await postJson(action, data); setState("sent"); } catch { setState("failed"); }
  };
  const failureNode = failed ?? (contactEmail
    ? <>That did not go through. Nothing was lost on your side: send the same thing to{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we will pick it up.</>
    : <>That did not go through, so nothing reached us. Please try again in a moment.</>);
  if (state === "sent") return <div className="form-card"><div className="form-done">{done}</div></div>;
  return (
    <form className="form-card" onSubmit={onSubmit}>
      {/* S6: optional hidden honeypot — a real human never fills it; the `contact` edge
          function drops any POST where it is non-empty. Defence-in-depth on top of the
          origin allowlist (no wildcard) + server-side fixed destination + per-origin rate
          limit. Off-screen, aria-hidden, not tab-reachable, autocomplete off. Pass
          honeypot={false} only if a site deliberately omits it. */}
      {honeypot ? (
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor={honeypot}>Do not fill this in</label>
          <input id={honeypot} name={honeypot} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      ) : null}
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name}>{f.label}</label>
          {f.type === "textarea"
            ? <textarea id={f.name} name={f.name} required={f.required} />
            : f.type === "select"
              /* #141 item 5: {label,value} options + a real placeholder -- value="" +
                 required means the placeholder can never submit itself as the answer. */
              ? <select id={f.name} name={f.name} required={f.required} defaultValue={f.placeholder ? "" : undefined}>
                  {f.placeholder && <option value="" disabled>{f.placeholder}</option>}
                  {(f.options || []).map((o) => {
                    const label = typeof o === "string" ? o : o.label;
                    const value = typeof o === "string" ? o : o.value;
                    return <option key={value} value={value}>{label}</option>;
                  })}
                </select>
              : <input id={f.name} name={f.name} type={f.type || "text"} required={f.required} />}
        </div>
      ))}
      {state === "failed" ? (
        <p role="alert" style={{ color: "var(--accent-text)", marginTop: 4 }}>{failureNode}</p>
      ) : null}
      {/* disabled while the post is in flight, so a slow endpoint cannot be double-posted.
          The LABEL is not swapped for a "Sending" string: `submitLabel` is per-site copy and
          a hardcoded English transient would read as English on the two Dutch sites that
          mount this. aismith-site's IntakeForm does swap it; that is the one deliberate
          difference between the two and it is stated here rather than left to be found. */}
      <button className="btn btn-action" type="submit" disabled={state === "sending"}>{submitLabel} &rarr;</button>
    </form>
  );
}

/** NewsletterForm v2 -- stacked NAME + EMAIL is the fleet default (operator decision
    2026-07-27, #122 item 5). Posts {name, email}; the shared `contact` fn's signup
    mode folds `name` into the mail. Pass withName={false} for the email-only shape. */
// A FAILED POST IS REPORTED, NEVER CONFIRMED. #18 (`5e77d77`) is the PRECEDENT: it fixed
// the identical shape in ContactForm above, and this component was left still
// holding it. It did `try { await postJson(...) } finally { setSent(true) }`, so a
// rejected or unreachable POST still rendered `done` and the visitor believed they were
// subscribed when nothing had reached us. `sent` is now reached only when the post
// RESOLVES; a failure names itself, and the button is disabled while the post is in
// flight so a slow endpoint cannot be double-posted. The LABEL is not swapped for a
// "Sending" string, for the same per-site-copy reason ContactForm states.
//
// `failed` mirrors `done`: both mounting sites are Dutch-language and already override
// `done`, so a hardcoded English failure sentence would ship English into a Dutch page.
// The default sentence is ContactForm's contactEmail-less one VERBATIM, because this form
// takes no `contactEmail`: a newsletter signup has no mail path to offer, so the copy
// states the failure and asks for a retry rather than naming one it was not given.
//
// The failure ink is `--accent-on-dark`, NOT ContactForm's `--accent-text`. This form
// mounts on a DARK ground and the spine says so itself in `spine.css`, at the rule
// `.nl-done { color: var(--on-dark) }`; `--accent-text` is tuned for the light grounds
// ContactForm sits on and would ship a sub-AA ink into the footer.
export function NewsletterForm({ action, withName = true, namePlaceholder = "Your name",
  placeholder = "Your email", submitLabel = "Subscribe", done = "You're on the list.", failed }:
  { action: string; withName?: boolean; namePlaceholder?: string; placeholder?: string;
    submitLabel?: string; done?: string; failed?: React.ReactNode }) {
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "failed">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { email: String(fd.get("email") || "") };
    if (withName) data.name = String(fd.get("name") || "");
    setState("sending");
    try { await postJson(action, data); setState("sent"); } catch { setState("failed"); }
  };
  const failureNode = failed ?? <>That did not go through, so nothing reached us. Please try again in a moment.</>;
  if (state === "sent") return <p className="nl-done">{done}</p>;
  return (
    <form className="nl-form" onSubmit={onSubmit}>
      {withName && <input name="name" type="text" required placeholder={namePlaceholder} aria-label={namePlaceholder} />}
      <input name="email" type="email" required placeholder={placeholder} aria-label={placeholder} />
      {state === "failed" ? (
        <p role="alert" style={{ color: "var(--accent-on-dark)", marginTop: 4 }}>{failureNode}</p>
      ) : null}
      <button className="btn btn-action" type="submit" disabled={state === "sending"}>{submitLabel} &rarr;</button>
    </form>
  );
}
```

### `src/router.tsx`

```tsx
// src/router.tsx — TanStack Start router factory. The Start Vite plugin requires this
// entry; it wires the generated routeTree to the router used for SSR/prerender + client.
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

### `src/components/spine/modules/` — optional modules (inventory; source of record = the repo)

One file + co-located CSS per module under `src/components/spine/modules/` in
**`AISmithFactory/aismith-site-seed`**; imported **directly**, never re-exported by the
barrel (S3.3). Reproducing them verbatim here stopped at the #116 pack (7 modules would
only drift); the repo is the implementation-of-record for this directory, and a build
copies it as-is like every other spine path.

| Module | Exports | Contract notes |
|---|---|---|
| `map` | `Map` | facade (S3.5), keyless Google `output=embed`, loads on click |
| `hours` | `Hours` | static opening hours |
| `video` | `VideoFacade` | facade (S3.5); youtube-nocookie + `playsinline`; MP4 native `<video>` one-shot; ratio 16/9 \| 2.35/1 |
| `gallery` | `GalleryGrid` | chip filter (`aria-pressed`), `hidden`+lazy (unshown categories never fetch), heading rows, built-in Lightbox (`role="dialog"`, Escape/backdrop, focus managed; labelled close, previous and next, arrow keys) |
| `marquee` | `Marquee` | JSX-duplicated track, `aria-hidden` dupe, reduced-motion ⇒ static row, tilt from `--tilt` |
| `audio` | `AudioPlayer` | native `<audio controls>`, icon mirrors state, play pauses siblings |
| `deco` | `DecoStar`, `Grain`, `ZigZag`, `TiltFrame`, `CutBadge`, `PulsePill` | aria-hidden, inline-SVG only, zero at-rest requests, dead under reduced-motion |

### `src/components/spine/legal.tsx`

```tsx
// spine/legal.tsx — CORE legal notices (S7.4). Every site ships a privacy notice.
// GDPR structure + standard clauses authored ONCE here (fleet-wide, consistent and correct);
// per-site facts (controller, enabled subprocessors, dates) arrive as props from site.config,
// filled from the manifest `legal` block. What the site actually SHIPS is a prop too:
// `newsletter` gates the newsletter clause and its consent basis, `withName` matches the
// clause to NewsletterForm's shape (forms.tsx defaults withName={true} and posts data.name),
// `mapsEmbed` gates the map clause and its consent basis. Defaults describe the fleet default
// site: a newsletter on the name+email form, no map. Bilingual NL + EN via `lang` (the fleet's two
// languages); the per-site subprocessor `purpose` strings are authored in the site's language.
// Tokens only via .legal classes; no colour decision here (S2.2).
import * as React from "react";
import { Section, PageTitle } from "./primitives";

export type Controller = { name: string; address?: React.ReactNode; vatId?: string; email: string };
export type Subprocessor = { name: string; purpose: string; location?: string; link?: string };
type Lang = "nl" | "en";

const DPA: Record<Lang, { name: string; url: string }> = {
  nl: { name: "Gegevensbeschermingsautoriteit", url: "https://www.gegevensbeschermingsautoriteit.be" },
  en: { name: "Belgian Data Protection Authority", url: "https://www.dataprotectionauthority.be" },
};

export function PrivacyNotice(
  { controller, subprocessors = [], effectiveDate, retention, mapsEmbed = false,
    newsletter = true, withName = true, dpoEmail, lang = "nl", dpaName, dpaUrl }:
  { controller: Controller; subprocessors?: Subprocessor[]; effectiveDate: string;
    retention?: React.ReactNode; mapsEmbed?: boolean; newsletter?: boolean;
    withName?: boolean; dpoEmail?: string; lang?: Lang;
    dpaName?: string; dpaUrl?: string }
) {
  const rightsTo = dpoEmail ?? controller.email;
  const dpa = { name: dpaName ?? DPA[lang].name, url: dpaUrl ?? DPA[lang].url };
  const mailto = (e: string) => <a href={`mailto:${e}`}>{e}</a>;
  // S7.4a: the legal basis names the consent sources this site ACTUALLY has. A notice
  // that lists a newsletter or a map the site does not ship overstates its processing,
  // and one that omits a field the default form posts understates it. Both are defects
  // and this site has shipped each of them.
  const consent: Record<Lang, string[]> = {
    nl: [...(newsletter ? ["nieuwsbrief"] : []), ...(mapsEmbed ? ["kaart"] : [])],
    en: [...(newsletter ? ["newsletter"] : []), ...(mapsEmbed ? ["map"] : [])],
  };
  const basisNl = consent.nl.length
    ? `We verwerken deze gegevens op basis van je toestemming (${consent.nl.join(", ")}), de uitvoering van je verzoek (contact) en ons gerechtvaardigd belang om de site veilig te laten werken.`
    : "We verwerken deze gegevens op basis van de uitvoering van je verzoek (contact) en ons gerechtvaardigd belang om de site veilig te laten werken.";
  const basisEn = consent.en.length
    ? `We process this data on the basis of your consent (${consent.en.join(", ")}), the performance of your request (contact), and our legitimate interest in keeping the site secure.`
    : "We process this data on the basis of the performance of your request (contact) and our legitimate interest in keeping the site secure.";

  const T: Record<Lang, any> = {
    nl: {
      title: "Privacybeleid",
      updated: `Laatst bijgewerkt op ${effectiveDate}.`,
      whoT: "Wie wij zijn",
      who: (<>{controller.name} is verantwoordelijk voor de verwerking van je persoonsgegevens
        {controller.vatId ? <> (ondernemingsnummer {controller.vatId})</> : null}.
        {controller.address ? <> Adres: {controller.address}.</> : null}{" "}
        Je kan ons bereiken via {mailto(controller.email)}.
        {dpoEmail ? <> Voor privacyvragen: {mailto(dpoEmail)}.</> : null}</>),
      dataT: "Welke gegevens we verwerken en waarom",
      dContact: <><strong>Contact.</strong> Stuur je ons een bericht, dan verwerken we je naam, e-mailadres en de inhoud van je bericht om je vraag te beantwoorden.</>,
      dNews: <><strong>Nieuwsbrief.</strong> Schrijf je je in, dan verwerken we je {withName ? "naam en e-mailadres" : "e-mailadres"} om je de nieuwsbrief te sturen. Je kan je op elk moment uitschrijven.</>,
      dLogs: <><strong>Technische logs.</strong> Onze hostingpartij houdt beperkte serverlogs bij (waaronder je IP-adres) voor de beveiliging en goede werking van de site.</>,
      dMap: <><strong>Kaart.</strong> Onze kaart laadt pas wanneer je er zelf op klikt. Vanaf dat moment wordt je IP-adres aan Google doorgegeven om de kaart te tonen.</>,
      basisT: "Rechtsgrond",
      basis: basisNl,
      shareT: "Met wie we gegevens delen",
      shareNone: "We delen je gegevens niet met derden, behalve waar nodig voor de werking van de site.",
      neverSell: "We verkopen je gegevens nooit.",
      transferT: "Doorgifte buiten de EU",
      transfer: "Sommige van bovenstaande partijen kunnen gegevens buiten de Europese Economische Ruimte verwerken. In dat geval gebeurt dat met de passende waarborgen die de wet vereist, zoals de standaardcontractbepalingen van de Europese Commissie.",
      retainT: "Hoe lang we gegevens bewaren",
      retainDefault: <>We bewaren je gegevens niet langer dan nodig is voor het doel waarvoor we ze verzamelden, en verwijderen ze daarna.</>,
      rightsT: "Jouw rechten",
      rights: (<>Je hebt recht op inzage, correctie en verwijdering van je gegevens, op beperking van of bezwaar tegen de verwerking, en op overdraagbaarheid. Gaf je toestemming, dan kan je die op elk moment intrekken. Stuur je verzoek naar {mailto(rightsTo)}.</>),
      complaintsT: "Klachten",
      complaints: (<>Ben je het niet eens met hoe we met je gegevens omgaan, dan kan je een klacht indienen bij de <a href={dpa.url} target="_blank" rel="noopener">{dpa.name}</a>.</>),
      changesT: "Wijzigingen",
      changes: "We kunnen dit privacybeleid bijwerken. De datum bovenaan toont wanneer het laatst wijzigde.",
    },
    en: {
      title: "Privacy policy",
      updated: `Last updated ${effectiveDate}.`,
      whoT: "Who we are",
      who: (<>{controller.name} is responsible for processing your personal data
        {controller.vatId ? <> (company number {controller.vatId})</> : null}.
        {controller.address ? <> Address: {controller.address}.</> : null}{" "}
        You can reach us at {mailto(controller.email)}.
        {dpoEmail ? <> For privacy questions: {mailto(dpoEmail)}.</> : null}</>),
      dataT: "What data we process and why",
      dContact: <><strong>Contact.</strong> If you send us a message, we process your name, email address and the content of your message to answer your question.</>,
      dNews: <><strong>Newsletter.</strong> If you subscribe, we process your {withName ? "name and email address" : "email address"} to send you the newsletter. You can unsubscribe at any time.</>,
      dLogs: <><strong>Technical logs.</strong> Our hosting provider keeps limited server logs (including your IP address) for the security and proper operation of the site.</>,
      dMap: <><strong>Map.</strong> Our map only loads when you click it. From that moment your IP address is sent to Google to show the map.</>,
      basisT: "Legal basis",
      basis: basisEn,
      shareT: "Who we share data with",
      shareNone: "We do not share your data with third parties, except where needed to operate the site.",
      neverSell: "We never sell your data.",
      transferT: "Transfers outside the EU",
      transfer: "Some of the parties above may process data outside the European Economic Area. Where they do, it happens with the appropriate safeguards the law requires, such as the European Commission's standard contractual clauses.",
      retainT: "How long we keep data",
      retainDefault: <>We keep your data no longer than necessary for the purpose we collected it for, and delete it afterwards.</>,
      rightsT: "Your rights",
      rights: (<>You have the right to access, correct and delete your data, to restrict or object to processing, and to data portability. Where you gave consent, you can withdraw it at any time. Send your request to {mailto(rightsTo)}.</>),
      complaintsT: "Complaints",
      complaints: (<>If you disagree with how we handle your data, you can lodge a complaint with the <a href={dpa.url} target="_blank" rel="noopener">{dpa.name}</a>.</>),
      changesT: "Changes",
      changes: "We may update this privacy policy. The date at the top shows when it last changed.",
    },
  };

  const t = T[lang];
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <PageTitle size="lg">{t.title}</PageTitle>
        <div className="legal">
          <p className="legal-meta">{t.updated}</p>
          <h2>{t.whoT}</h2>
          <p>{t.who}</p>
          <h2>{t.dataT}</h2>
          <ul>
            <li>{t.dContact}</li>
            {newsletter ? <li>{t.dNews}</li> : null}
            <li>{t.dLogs}</li>
            {mapsEmbed ? <li>{t.dMap}</li> : null}
          </ul>
          <h2>{t.basisT}</h2>
          <p>{t.basis}</p>
          <h2>{t.shareT}</h2>
          {subprocessors.length ? (
            <ul>
              {subprocessors.map((sp) => (
                <li key={sp.name}>
                  <strong>{sp.link ? <a href={sp.link} target="_blank" rel="noopener">{sp.name}</a> : sp.name}</strong>
                  {": "}{sp.purpose}{sp.location ? <> ({sp.location})</> : null}.
                </li>
              ))}
            </ul>
          ) : (
            <p>{t.shareNone}</p>
          )}
          <p>{t.neverSell}</p>
          <h2>{t.transferT}</h2>
          <p>{t.transfer}</p>
          <h2>{t.retainT}</h2>
          <p>{retention ?? t.retainDefault}</p>
          <h2>{t.rightsT}</h2>
          <p>{t.rights}</p>
          <h2>{t.complaintsT}</h2>
          <p>{t.complaints}</p>
          <h2>{t.changesT}</h2>
          <p>{t.changes}</p>
        </div>
      </Section>
    </main>
  );
}
```

---

## Changelog

- **v0.13.8 -- 11 Oct 2026:** **RE-EMBEDDED from the seed at `aismith-site-seed` `main` `3bd5c28c736adbb62634ac0d5595cc8179566bd5` (W14, #25, merged 2026-10-11T22:37:54Z on W13's `9118d969`, #24), riding site-contract 1.8.30 -> 1.8.31, coupled with hub-contract 1.7.21** (`prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E16). FOUR of the eight embedded blocks move, each replaced WHOLE by the seed's file at that sha and never edited by hand: `spine.css` (W13: six hue slots, `data-hue-tint`, the form-field edge on `--line-input`, the crumb hover ink, the phone submenu), `primitives.tsx` and `cards.tsx` (`hue` typed 1 to 6) and `forms.tsx` (`ContactForm`'s honeypot defaulting to `honeypot`, R197); `index.ts`, `chrome.tsx`, `router.tsx` and `legal.tsx` are byte-unchanged. **Measured before and after**: at `b8074088` (the 1.8.30 re-embed's parent) all eight blocks EQUAL; at `9118d969` and at `3bd5c28` these four DIFFER and the other four EQUAL; after the re-embed all eight read EQUAL at `3bd5c28`, compared block by block against `git show 3bd5c28:<path>`. The role table's `spine.css` row names the six hue slots, and the `gallery` inventory row names W13's labelled close, previous and next and its arrow keys (the module is listed by inventory, not embedded). **This doc's changelog is classified for the T3 register (R167)**: fifteen entries, v0.13.7 to v0.8, ALL RECORDS, no promotion owed (v0.13.7's failed-POST rule lives in the embedded `forms.tsx` comments, v0.12.0's module-inventory rule in the header and the layer contract, v0.13.3's `router.tsx` classification in the file table, v0.9.1's tone map in `spine.css`). No em dashes in this entry.
- **v0.13.7 -- 10 Sep 2026:** **RE-EMBEDDED from the seed at `aismith-site-seed` `main` `768d7266` (PR #21), riding site-contract 1.8.25 -> 1.8.26.** TWO of the eight embedded blocks move, `spine.css` and `forms.tsx`; the other six verified byte-equal. The embeds had equalled the seed at `045e7216` while the seed moved twice UNDER the 1.8.25 stamp before it was cut (#19 `cef3a06`, the rgba parser and the hue-cell loop; #20 `c340b9b`, the hue-ink rule collapsing `.eyebrow` and `.crumb a`) and twice after (#18 `5e77d77`, ContactForm reporting a failed post; #21, NewsletterForm taking the same shape plus `.galcredit`'s letter-spacing leg). **A failed POST is REPORTED and never confirmed, in BOTH forms**: `sent` is reached only when the post resolves, the failure names itself, the default sentence is English by design and Dutch mounts pass their own `failed`. Found by `attacker-1` (session `local_2be41608`) against `plan-site-1826-2026-09-10.md` v1.0, which had assumed `forms.tsx` alone had moved; the embed-verification instrument is still owed and this entry is one more instance for its row. No em-dashes.
- **v0.13.6 -- 27 Aug 2026:** **RE-EMBEDDED from the seed's 1.8.24 release**, `aismith-site-seed` `main` `045e7216` (PR #17), riding site-contract 1.8.24. **ONE of the embedded blocks moves, `spine.css` (386 lines to 400)**, and the other seven are byte-unchanged, the release having touched exactly two files of which the second, `agents/site/verify.mjs`, is not embedded here. **Positive control taken BEFORE any edit**: the v0.13.5 fence reproduced the seed at the pre-release sha `f3904f1d` byte for byte. **What ships**: plan-site-1824 v1.2's M1 spine parts, the one-line accent collapse on `.em`, `.btn-ghost` and `.crumb` with `.eyebrow` DELIBERATELY untouched (the measured (0,1,1) contest), `--tone-accent` on the six tone blocks and `--sec-accent: var(--hue-N-accent, var(--tone-accent))` on the five hue blocks, the per-skin `--hue-N-accent` declarations being the sites' half; and M2's SEVEN new S3.2a standalone classes from the measured sweep (`.sec-quote`, `.namelist`, `.galcredit` + link leg, `.display-line`, `.kicker`, `.tag`, `.num-sm`). **A rendered probe verified the cascade claims before merge** (210 cells, twice; the one behaviour change is `.crumb` on the accent tone moving 1.42:1 to 3.81:1, a latent repair with zero live instances). No em-dashes added.
- **v0.13.5 -- 26 Aug 2026:** **RE-EMBEDDED from the seed's E0 release**, `aismith-site-seed` `main` `f3904f1d` (PR #16), riding site-contract 1.8.23. **ONE of the eight embedded blocks moves, `spine.css`**, and the other seven are byte-unchanged. **Positive control taken BEFORE any edit**: the v0.13.4 fence reproduced the seed at the pre-release sha `14303653` byte for byte, which is what proves the extractor reads the right bytes rather than merely producing a diff. **What ships is the TWO-level form.** The six `[data-tone]` blocks keep writing `--sec-*` exactly as they did and additionally mirror to `--tone-*`; the five `[data-hue]` blocks point their fallback at `--tone-*` instead of at themselves, so `var(--hue-N, var(--sec-bg))` and its cycle are gone and no reader is touched in any file. **The plan's third level and its `--tone-accent` / `--sec-accent` declarations are deliberately NOT here**: the third level was measured dead through `<Section>` and dropped, and the accent pair belongs to E1, which the operator held out of this cut on 2026-08-26. The fence grows 380 lines to 386 and this document states no offset, so nothing else in it moves. No em-dashes added.
- **v0.13.4 -- 24 Aug 2026:** **RE-EMBEDDED from the seed release**, `aismith-site-seed` `main` `14303653` (PR #14). Four of the eight embedded blocks move, `spine.css`, `cards.tsx`, `chrome.tsx` and `legal.tsx`, and the other four are byte-unchanged. **This document embeds the seed VERBATIM and nothing in this repo checks that**, which is an open row, so the equality was asserted in both directions by hand: all eight blocks reproduced the seed at the PRE-release sha `c674cbd8` before any edit, which is the positive control that the extractor reads the right bytes, and all eight reproduce `main` after it. **The re-hash is why the release is ONE contract cut**: four changes, one stamped artifact, one `dist/` re-stamp. No em-dashes added.
- **v0.13.3 -- 14 Aug 2026:** **`src/router.tsx` declared SEED-SPINE** and reproduced verbatim,
  the first repo-level file this document classifies outside the spine layer's two directories.
  It was one of nine files the seed ships that neither this doc nor `as-site-seed-instance.md`
  classified (15.3% of the seed's own tree, measured 2026-08-14); five of the nine are now
  declared, here and in the instance doc, and four are handed back unclassified and listed there.
  `verify.mjs` gains an `EXTRA_SPINE` list so a declared-spine file outside those two directories
  can enter the baseline at all: 25 files to 26. Matches site-contract **1.8.19**. Both negative
  controls re-run bare and unpiped at exit 1 (`spine.css`, and the newly covered
  `src/router.tsx`). No em-dashes.*

- **v0.13.2 -- 30 Jul 2026:** hue-as-TEXT variants (#122 item 6c, operator-ruled IN):
  `.em-hue-1..5` on `--hue-N-text` (undeclared = inert via `currentColor`), Em `hue` prop.
  `verify.mjs` [2] gains the hue pairs: declared `--hue-N-ink` on `--hue-N` (closing a
  standard/gate mismatch -- the standard always claimed the pair was AA-gated) and
  `--hue-N-text` on the three light grounds. Matches spine-standard v0.13.2 /
  site-contract **1.8.2**. No em-dashes.*

- **v0.13.1 -- 30 Jul 2026:** Band **`art`** slot (the #129 deferred half, operator-ruled
  GRAMMAR 2026-07-30): brand illustration bleeding in from the right as a background
  layer under a scrim keyed to `--sec-bg` (never a hardcoded dark), URL via `--band-art`.
  `spine.css` + `primitives.tsx` regenerated. Matches spine-standard v0.13.1 /
  site-contract **1.8.1**. No em-dashes.*

- **v0.13.0 -- 30 Jul 2026:** **the 1.8.0 bundle fold** (Factory #122/#123/#128/#129/#141; seed
  PR `aismith-site-seed#4`). Core files regenerated verbatim from the repo: `spine.css`
  (vertical-rhythm flow block; `--card-bg`/`--line-card` on all cards + `[data-card-ground]`;
  MediaCard seam stamp / meta pill / `.loc`; EventCard poster link + `--poster-lead` lead
  variant; `.btn-paper`; `.crumb` incl. on-dark arms), `primitives.tsx` (Band `eyebrow`, Btn
  `paper`, `Crumb`), `cards.tsx` (MediaCard `loc`/`stampPlacement`/`pillPlacement`/`ground`,
  EventCard `posterHref`/`posterLead`), `forms.tsx` (select `{label,value}` + placeholder;
  NewsletterForm name+email default). Module inventory += **`tiles`**
  (Chip/Chips/FactChip/Cell/DCard/SkillTile/Member/CreditChip/SectionHead/ZZDivider) and
  **`timeline`** (children-based rows); `deco` gains CutBadge `shape="ring"` + `--badge-xl`
  + the <700px star hiding + `--pill-dot`; `video` gains `labelVisible` +
  `--facade-play-bg/-ink`; `marquee` gains the stacking raise + top margin. `verify.mjs`
  gains the (d2) undeclared-`var()` gate (#123). Matches spine-standard v0.13.0 /
  site-contract **1.8.0**. No em-dashes.*

- **v0.12.0 — 26 Jul 2026:** **#116 component pack fold.** Optional modules re-homed to
  `spine/modules/<name>` + co-located CSS, direct-import only; the doc now carries them **by
  inventory** with `AISmithFactory/aismith-site-seed` as implementation-of-record (core files
  stay verbatim). Core sections regenerated: `spine.css` (S4.6 hue slots, `.section--fx`,
  MediaCard pill/stamp/zoom, TierCard hue bar + icon, EventCard `--card-bg` + `noposter`),
  `index.ts` (modules dropped from the barrel), `primitives.tsx` (Section `hue` + `fx`),
  `cards.tsx` (variant props). Matches spine-standard v0.12.0 / site-contract 1.7.0.

- **v0.11.1 — 26 Jun 2026:** Folded cafe-kamiel bucket-4 Patch 1 (S9.1 voice gate self-contradiction). Replaced the two prose em-dashes the frozen spine *renders* — `legal.tsx` subprocessor line (renders on the universal `/privacy`, S7.4) and `modules.tsx` Map facade `aria-label` — with a colon separator (content-equivalent, clears the literal+entity em-dash grep). Pairs with the `verify.mjs` grep extension to `src/components/spine` so the gate can no longer pass a site whose rendered HTML carries a spine em-dash.

- **v0.11.0 — 23 Jun 2026:** CORE `PrivacyNotice` added (`src/components/spine/legal.tsx`,
  exported from the barrel) — every site now ships a privacy notice (S7.4). Standard GDPR
  structure authored once; per-site facts (controller, subprocessors, dates) come in as
  props from `site.config`. `SiteFooter` gains optional `legalLinks` (the footer privacy
  link). `.legal` prose styles added. **Bilingual NL + EN** via `lang`. `site-contract` → v1.5.0.
- **v0.10.0 — 23 Jun 2026:** First OPTIONAL modules realised (S3.3 had declared them; sites
  were hand-rolling — e.g. Cafe Kamiel's map). New `src/components/spine/modules.tsx` +
  co-located `modules.css`, exported from the barrel: **`Map`** (location embed, **facade
  pattern** — keyless `output=embed`, third-party loads only on click, so the resting view
  sets no Google cookies; EU-clean) and **`Hours`** (structured opening hours, static).
  Driver + CSS travel together so a site that doesn't enable a module bundles neither.
  Standard gains **S3.5** (facade rule) and Appendix B rows; `site-contract` → v1.4.0.
- **v0.9 — 22 Jun 2026:** Proposal item **F** (host model) folded fleet-wide — host is now
  **Netlify (Pro)**. **No spine-layer code change:** this frozen layer is host-agnostic, so only
  the closing cross-ref note is updated (item F no longer "pending"). SK is the parked
  Lovable-publish legacy exception; ZG the staged Netlify migration target.
- **v0.9.1 — 22 Jun 2026:** Tone map **relocated to `spine.css`** (the frozen layer),
  reversing the v0.8 `tokens.css` note, per the 22 Jun decision — required so `tokens.css`
  stays variables-only for the `verify.mjs` gate. The instance layer drops the block
  (`as-site-seed-instance.md` v0.9.1).
- **v0.8 — 21 Jun 2026:** Folded proposal item **E** (spine half), host-independent parts only
  (from `as-frontend-rethink-proposal-REVIEW.md`). **`ContactForm` gains an optional hidden
  honeypot field** (default name `company`; pass `honeypot={false}` to omit) — defence-in-depth
  on top of the already-hardened `contact` endpoint (origin allowlist with no wildcard +
  server-side fixed destination + per-origin rate limit); the edge function drops any POST whose
  honeypot value is non-empty. `forms.tsx` grows by the hidden block. 