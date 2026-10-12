# AI Smith — Site Build Agent

**Version 0.6.8 -- 11 October 2026.** How a finished brief becomes a built, deployed site. The
back half of the public-site pipeline; the intake standard is the front half.

> **What this is.** The standard a fresh **build-agent chat** follows to turn a finished
> `<slug>-build-brief.md` into a built, deployed, audit-ready site from the
> `aismith-site-seed`, conforming to `as-site-spine-standard.md`. It is the operational
> spec the build runs against: the two inputs it reads, the surface it is allowed to
> touch, the host model it ships, how it honours the brief, the build sequence it
> executes, and the self-check it runs before handing off to the audit. The café Kamiel
> brief (`cafe-kamiel-build-brief.md`) is the worked example throughout.
>
> **What it is not.** It does not gather material or resolve facts — that is intake
> (`as-site-intake-standard.md`), which hands it a finished brief. It does not audit the
> result — that is `as-site-audit-prompt.md`, a separate read-only chat. It builds one
> site, from one brief, in one chat.
>
> **Supersession.** This doc **supersedes `as-site-build-dryrun-prompt.md`** as the
> canonical brief-to-built-site path. The dry-run harness was the agent-proxy used to
> prove the seed was an executable spec before a real build existed; it has served that
> purpose. It is retired to an **optional seed-regression harness** — stress-testing a
> *new seed version*, not building a site — and is no longer part of the live pipeline.
>
> **How it's used.** Open a fresh chat, attach the finished `<slug>-build-brief.md`, the
> seed (`aismith-site-seed.zip`), and `as-site-spine-standard.md`. Build the site from
> the seed + brief agent-direct (§5), produce the filled charter, run the self-verification
> (§6), then hand to the audit. One site per chat.

---

## 1. Inputs (two governing inputs, one substrate)

The build reads exactly two governing documents and builds from one template. It does not
range across the canon.

1. **The finished `<slug>-build-brief.md`** — intake's only output (`as-site-intake-standard.md`
   §8, the nine-section schema). This is the spec for *this* site: provenance and
   guardrails, identity, skin, content, structure, integrations, facts, assets, and the §9
   review list. The build agent cannot tell whether scenario 1 (working client) or scenario 2
   (prospect concept) produced it, and does not need to.
2. **`as-site-spine-standard.md` (v0.10.0)** — the build contract and the rubric the result is
   scored against (S1–S9). Where the brief and the standard appear to disagree, the standard
   wins on *structure and safety* (the spine, the gates) and the brief wins on *fit* (skin
   values, copy, page set, modules) — this is just the IF/IMPL split (§ S1) read forward.

**Substrate: the seed repo.** The site is built **from** the runnable seed repo
**`AISmithFactory/aismith-site-seed`**, not from scratch — `git clone` it as the substrate: the
frozen spine plus the proven TanStack Start + SSR + Netlify toolchain, shipped build- and
`verify.mjs`-green. The canonical docs `as-site-seed-spine.md` (the frozen layer, reproduced
verbatim) and `as-site-seed-instance.md` (the reskinnable AS reference instance) remain the
**spec-of-record** the seed repo is reconstructed from; the repo is the runnable source, so no zip
upload or markdown re-assembly is needed. Keep a pristine clone as the `verify.mjs --seed` baseline. Take the seed's current shape as
authoritative for structure: `seo.noindex` toggle in `site.config`, `functions/DEPLOY.md`
describing **Supabase Edge Functions**, and the `Deno.serve` function shape. **The seed edit
for the functions backbone is queued as the next seed pass, not indefinitely deferred:** until
it lands, the seed's own Step-0 prose (README "Before you start", `SCAFFOLD.md`, the charter
data-posture line) and its contact default still read in the older "provision a per-site
Supabase / mailto, functions on the shelf" register. The **authoritative** posture is v0.10.0
**S5.4** + §3 below: **connect to the shared `AISmith-functions` project** (do not provision a
per-site one), deny Cloud, and ship the **contact form on by default, wired to
`AISmith-functions`** (not mailto). The build still touches only `tokens.css` + `src/content/*`
+ config; nothing here changes the touch surface.

**Read nothing else unless a gap forces it.** If a build genuinely cannot proceed without a
fact the brief and the standard do not carry, that is a finding — record it (it means intake
under-delivered or the seed is under-specified), make the minimum flagged assumption, and
keep moving. Reaching for a third doc to paper over silence is the failure the dry-run was
built to catch.

---

## 2. The touch surface (the hard contract)

A new site is **swap the skin, supply the content, compose pages from spine components.**
The agent edits a narrow surface and leaves the spine untouched. This is what makes a build
a re-skin and not a rewrite, and it is the claim the self-check (§6) asserts.

**Editable, per site:**

- **Skin — `src/styles/tokens.css`.** The one style file edited per site (S2). Set the
  brief's values onto the **fixed semantic token names**; keep every name. No raw hex, no
  colour-named token, escapes into component code or `spine.css` (S2.2). The `Section[data-tone]` tone map
  (`--sec-bg`/`--sec-text`/`--sec-soft`) lives in **`spine.css`**, not `tokens.css` (S2.2 / S4.3):
  it is **`var()` references only** and carries no literal colour, so the skin file stays
  variables-only while the *literal* colours the tone map points at live in `tokens.css` — a
  re-skin is still a one-file edit and the tone map does **not** move. (Earlier build notes called
  the `spine.css` placement a wrong Lovable drift; the spine resolved that 22 Jun same-version
  fork the other way at v0.9.1 — `spine.css` is correct. Do not relocate the tone map to
  `tokens.css`.) The
  `verify.mjs` stray-stylesheet + tokens-are-variables-only checks enforce this.
- **Content — `src/content/*`**, including **`site.config.tsx`.** Page composition (compose
  `Section`s, set each `tone` for the banner rhythm, fill cards/bands from spine components),
  copy (in the site's language, in voice), and config (nav, footer, socials, legal,
  integration action fields, the inline logo SVG, the `seo.noindex` flag). Inline *spacing*
  on composed elements is permitted (per-site rhythm); inline *type* is not (S3.2).
- **Thin wiring — per-route `head()` content + `__root` `lang`.** Each route's
  title/description/OG strings are brief *content*; `__root`'s `<html lang>` is brief
  *identity* (S7.1/S7.2). Filling these is content/config-class work, not structure — it
  counts inside the "skin + content + config" diff the fleet claim rests on. The seed ships
  the routes and `__root` pre-wired; the agent fills them, it does not restructure them.

**Never edited, ever:**

- **`src/components/spine/**`** — the component library.
- **`src/styles/spine.css`** — the structural stylesheet.

**A diff that touches anything under `spine/` is a fail.** No exceptions, no "just this one
override." If a section cannot be laid out from the existing spine components, that is a
**missing spine component**, which is a spine change handled centrally — not a site change.
The agent **stops and escalates** (§7); it does not write bespoke structural CSS, an inline
`font-size`/`clamp`, or a new component into a site build. The same applies to the
WordPress-survival CSS the spine doc forbids (`100vw` bleeds, `#masthead` hides, `!important`
form overrides): on this stack you own the document, so none of it exists here.

---

## 3. The host model (shipped, not decided)

The build ships the settled fleet host model. It does not re-decide any part of it
(`as-fleet-organisation.md` §7, `as-stack-blueprint.md` §1B, spine S5/S5.4/S6/S8.2).

- **Host = Netlify (Pro plan).** A static/prerendered front end, custom domain via
  CNAME/ALIAS to Netlify, automatic SSL. Cloudflare is the registrar/DNS layer only, never a
  host or compute target; `demos.aismith.io` is delegated to Netlify DNS by NS records, so
  demo subdomains are `<slug>.demos.aismith.io`. The whole fleet hosts on Netlify with **no
  exceptions** — SK migrated off Lovable publish on 29 Jun 2026 and ZG is live on Netlify.
- **Each stateless site connects to the shared `AISmith-functions` project** (AS-owned org,
  Pro, eu-central-1 Frankfurt, `https://jctzzxibnflyvfallpva.supabase.co`) — connected, **not
  provisioned**, and **never holding a table**. **Never Lovable Cloud** (unowned, irreversible,
  no transfer path). **The statelessness gate:** a site that must store data provisions its
  **own** new Supabase account first (separate from the shared project and any hub), then
  builds — that project, not the shared backbone, is the stateful site's transferable unit.
- **Server-side runtime = Supabase Edge Functions** (Deno, `Deno.serve`), running in the shared
  `AISmith-functions` project. They are the only server-side path: no DB access, no service-role,
  no stored data. Keys live in **Supabase secrets**; the front end ships no DB client and
  reaches a function only by plain `fetch` to its URL. The standard `contact` function is
  **hardened** (origin allowlist = CORS with no wildcard, fixed per-site destination resolved
  server-side from an origin→destination map never the request body, honeypot + per-origin
  rate-limit, `RESEND_API_KEY` in secrets, stores nothing). Onboarding a site is **config, not
  a fork** — register its origin + destination in the function's config. Functions deploy
  **public** (`--no-verify-jwt`) and **never auto-deploy** — manual paste-deploy via Supabase
  Studio or the CLI, then verify the live source (the same recurring trap as the hubs).
- **`seo.noindex` is the demo↔production toggle** (`src/content/site.config.tsx`). It is
  configuration, not a rebuild.
  - **Demo:** `noindex: true`. Public-but-noindexed: the **`<meta name="robots"
    content="noindex,nofollow">` tag is the reliable control**, with an `X-Robots-Tag:
    noindex` response header set via `netlify.toml` / `_headers` (Netlify supports custom
    headers). **Shareable** so the client can forward the link for feedback, on a temp
    **`<slug>.demos.aismith.io`** subdomain (Netlify-DNS-delegated). Allow the crawl, serve noindex — a robots
    `Disallow` or sitemap omission is **not** the control. A password is available for true
    privacy but is **not** the default (it defeats the sharing a concept is for); offer it
    for a long-lived concept or on request.
  - **Production:** `noindex: false`, point the real domain. Same build.
- **Contact form is on by default, wired to `AISmith-functions`.** The spine's `ContactForm`
  posts `{name, email, message, honeypot}` by `fetch` to the shared `contact` function;
  `site.config.integrations` carries the action URL from the start. **Carried form fields
  beyond the canonical three** (a subject dropdown, a phone field — the WP-conversion norm)
  post as additional string fields: the shared fn folds them into the mail as labelled lines
  (bounded count/length, destination still server-side; no tenant config). **Bare newsletter
  signup** (email-only, no list provider) is a per-tenant `signup` flag in `CONTACT_TENANTS` —
  the fn then accepts `{email}`-only posts for that origin. Newsletter stays **off by
  default**. There is no mailto step and no "mount later" rebuild: the function already exists
  on the shared project; a new site is onboarded by registering its origin + destination in the
  function's config, not by deploying a per-site function.
- **Privacy notice ships by default; third-party embeds use the facade pattern (S7.4 / S3.5).**
  Every site ships a `/privacy` route (the core `PrivacyNotice`) plus a footer privacy link,
  driven by `site.config` / the manifest `legal` block — controller identity + the **enabled**
  subprocessors (Netlify host, contact→Resend, `Map`→Google), never boilerplate, bilingual
  NL + EN. Any third-party embed (the realised `Map` module) renders a tokenised placeholder at
  rest and loads the third-party origin **only on user action**, so the default page is cookieless
  and needs no consent banner — a cookie-consent layer is separate and conditional, only for a
  site that adds a tracking stack.

**Step 0 (backend posture, before the first build prompt — S5.4).** Connect the site to the
shared **`AISmith-functions`** project (never provision a per-site one for a stateless site),
registering the site's origin + contact destination in the **function's** config. For a **prospect concept** the contact destination defaults to the shared catch-all **`contact@aismith.io`**, never the prospect's address; the client's real `to:` is the one go-live **`CONTACT_TENANTS`** swap. Request
**no** DB/auth/storage feature, and **provision no managed backend** (never Lovable Cloud or any
other auto-provisioned data surface). Verify the shipped bundle carries no DB client.
`builder_backend_provisioned` tracks any such provision specifically and stays `false` — the
shared backbone is not a managed-backend provision.
**The statelessness gate:** a site that must store data stops and provisions its **own** new
account first (separate from the shared project and any hub), then builds, recorded
`dedicated-db`. (Only an anon-view read-pipe site, S6.4, connects anything else, and then only
the **hub's existing** project, read-only — out of scope for a no-db concept like café Kamiel.)

The manifest the audit emits should therefore record, for a scenario-2 concept,
`host: "netlify"`, `noindex: true`, `site_supabase: "shared-functions"`, and
`server_runtime: "supabase-edge-functions"`. (`host` is `netlify` — the sole value; the former
`lovable` value is retired.)

---

## 4. Honouring the brief (precedence and the no-fabrication defaults)

The build does not re-open intake's decisions and does not invent around its gaps.

**Precedence (intake §4, applied at build).** Where anything in the brief still pulls two
ways, resolve highest-first:

1. **Guardrails** — voice (S9), AA (S2.3), no fabrication, the §6 prospect guardrails. Never
   overridden, by the brief or by build-time convenience.
2. **Confirmed facts** — Google Business Profile / Places, or the owner directly.
3. **Client intent** — the brief's stated note. Shapes the page set, which modules switch
   on, emphasis. (A stated wish like "a separate opening-hours page" promotes Info/Hours to
   its own route; "a photo gallery" switches on the gallery module.)
4. **Scraped / inferred defaults** — content and brand read from their material.

A client wish beats the inferred default page set; a client wish that contradicts a confirmed
fact is a review item, not a silent win; nothing overrides a guardrail.

**No-fabrication, applied as defaults (not a pause).** The brief's §9 ("what extraction left
for you to fix") lists what is unresolved. The build agent **never invents anything §9 flagged
unresolved** — but it also **does not stop and wait.** For each open item it applies the
**standing default** (intake §7) and **builds around it** (omit, link out, hold the copy, ship
the module off), then records the item in §9 / the charter for the **post-build review**, and the
run continues to the deployed `noindex` demo. It does not guess a value to make a page look
finished, and it does not halt for a confirmation the review can do after the fact. **No-fabrication
forbids *inventing* a fact no public source supports — it does not forbid *displaying real public
data that may be wrong*** (shown unverified, discrepancy flagged; intake §5/§7). The only halts are
a **guardrail breach** with no safe default or a **missing spine component** (§7).

**Worked against café Kamiel's §9:**

- **Hours — contradicted across six sources.** For the **demo** the `Hours` module (S3.3
  optional; structured/static — `Openingsuren`, no "open now") **ships the publicly-available
  hours**, read from public sources (the Maps panel via Claude-in-Chrome, the live site, the web),
  with a **publicly-sourced / unverified** note; the cross-source disagreement is surfaced as a
  client-facing finding (intake §5). It is **not** held off for lack of confirmation —
  completeness is the demo's value, and showing café Kamiel that their own Google hours conflict is
  a useful finding for the owner who sees it first. **No fabrication:** the hours come from a real
  public source, never invented (typing them off the menu card stays forbidden). At **go-live** the
  closed-door rule reapplies — hours ship to the public only once **confirmed** (owner-direct, or
  the [DEFERRED] Places API).
- **Team / owners (Ans and Frederik, the namesake dog Kamiel) — recovered from the wider
  crawl.** Named people are **used by default** (intake §7): Ans, Frederik and the dog Kamiel
  appear in the "Het verhaal" copy, and Matt on the cycling page — sourced from public data, **no
  fabrication**, and **flagged for owner-confirmation at go-live** (names are personal data). The
  privacy basis is the **containment gate** (intake §6): `noindex`, operator-reviewed before the
  owner sees it, owner-gated go-live — names are not withheld. **AND THE OWNED-ARCHIVE RULE IS A PROVENANCE RULE, NOT A NAMES RULE.** Where the crawl reads an archive the owner owns, a fact carries the date of the post it came from and a fact predating a change of ownership is re-sourced from a current page or dropped. **It does not reopen the used-by-default setting** (operator ruling 2026-09-17).
- **Menu on `/menu2305` — not crawled.** Build **links out** to the live menu; it does not
  fabricate dishes or prices. A Menu route appears only if the brief's §9 menu crawl was run.
- **Accent — monochrome vs one warm touch (open sub-question).** Default is the faithful read:
  stay monochrome, let the photography carry colour, `Btn` line/ghost variant. The optional
  amber/green accent ships only if the brief resolves to it (and then AA-conformed, S2.3).
- **Language — nl-BE.** A real exercise of S7.2: `__root` sets `lang="nl"`, not the seed's
  default `en`. Set it from the brief's identity; do not inherit the scaffold.
- **Fonts — concept stand-ins.** Café Kamiel's brand faces are licensed; the concept ships
  **free stand-ins matched to the register (Oswald display + Inter body)**, set via the
  `--font-display` / `--font-body` tokens. The exact faces are the one go-live swap (intake §7).
- **Logo + photography — the real assets, no placeholders.** The logo is the **mark extracted
  from the rendered `cafekamiel.be`** (Claude-in-Chrome) as an image asset — **never a text-only
  wordmark**; the photography is the **live site's own images, reused by their URLs** — **never
  generic placeholders** (intake §6). **Now enforced:** `verify.mjs` [6] gates the logo — a text-only wordmark **fails the build** unless `site.config` declares `brandMark.kind: "wordmark"` (default is `image`, so a silent text fallback fails closed). The build still places the real extracted mark deliberately; the gate is the backstop, not the source. (Closed the gap that shipped a wordmark on the cafekamiel and planttrekkerij runs.)

---

## 5. The build sequence (agent-direct)

The build is authored **agent-direct**: Claude Code writes the repo from `seed + brief`, no paste
loop and no third-party authoring tool. The E spike validated it (Café Kamiel built this way:
`verify.mjs` exit 0, S1–S9 pass, spine byte-for-byte from the seed, conformance-identical to the
earlier build). Authoring and host are independent (§3) — the front end **hosts on Netlify**
regardless. Writing the repo directly structurally removes the old paste-loop frictions: no
angle-bracket stripping (files are written, not pasted), no per-prompt file ceiling, and no "claims
a change is present when it is not" (the agent edits the repo and the §6 `verify.mjs` gate checks
the real files).

**Order.** Step 0 (backend posture, §3) → scaffold (**clone `AISmithFactory/aismith-site-seed`**
as the substrate — frozen spine + verify-green toolchain; reset the instance layer for the client;
`SCAFFOLD.md` records the pinned toolchain versions) → **skin** (apply the chosen skin — a named
preset from `AISmithFactory/aismith-skins` or a custom skin via the intake `folder=` input:
overwrite `tokens.css`, load `skin.json.brand.fonts`, enable `skin.json.archetype.modules`; absent a
chosen skin, the seed's default skin stands. Skins are authored by Claude Design, §3A of
`as-agent-fleet.md`; AA is re-verified per S2.3) → **spine drop-in** (components + `spine.css`, unedited) → **root + chrome**
(`__root` shell, `SiteHeader`/`SiteFooter` wiring, fonts) → **pages + routes** → **meta + fonts**
(per-route `head()`, sitemap/robots) → **forms wiring** (contact form wired to the shared `contact`
function on `AISmith-functions`; newsletter off) → **deploy** (Netlify deploy — **automatic, no
pre-host pause**: the run ships itself to the temp `<slug>.demos.aismith.io` subdomain with
`seo.noindex` per the brief; the audit and the post-build review follow the live demo, intake §7).
The custom domain is **attached via Claude-in-Chrome** (Netlify dashboard) — the Netlify connector
has no domain op; the `demos.aismith.io` Netlify-DNS zone auto-creates the record + SSL, so the run
ends on `<slug>.demos.aismith.io`, never a bare `*.netlify.app`.

**Build completeness (from the café Kamiel build).** Build **every page in the brief's inventory —
do not ship a Home+Info stub.** A page whose content arrived as a capture/PDF (e.g. a menu) is
**built into a route**, not linked out; link-out is only for content that genuinely cannot be
obtained.

**Structural rules (non-negotiable):**

- **`__root` is the only HTML shell.** It owns `<html lang>` and renders `HeadContent` +
  `Scripts`. Do not let the scaffold supply a second shell. (A framework error-fallback that
  returns an `<html>` string as a `Response` is not a second shell — S7.2.)
- **Per route, three checks before it is committed:**
  - **AA-conform (S2.3).** Re-derive the text×tone contrast matrix from *this brief's*
    `tokens.css` values; every cell a route uses clears AA (4.5 normal, 3.0 large).
    Accent-as-text uses `--accent-text` on light, `--accent-on-dark` on dark/slate;
    accent-tone sections carry no small text. Do not trust the spine doc's worked matrix —
    it is the AS skin; regenerate on the new palette. CTA button contrast resolves per tone in the
    frozen layer (S4.5: `.btn-line`→section ink, `.btn-action`→separation ring on dark grounds), so
    a dark-on-dark button is fixed centrally, never with a new per-site token.
  - **Voice-grep (S9.1).** Zero prose em-dashes in the rendered copy; no superlatives (S9.2).
    Code comments are exempt (S9.4). If the seed's own copy carries a violation, fix it in
    content, not by editing the spine.
  - **`lang` (S7.2).** Set in `__root` from the brief's identity, not inherited.

**Edge functions live on the shared project.** The standard `contact` function already exists on
`AISmith-functions`; onboarding this site is **config, not a deploy** — register its origin +
contact destination in the function's config (Studio/CLI; `--no-verify-jwt`, origin allowlist,
secrets in env). If the function ever needs a code change it is paste-deployed manually and the
live source verified, never auto-deployed. Build it from the repo, never from a third-party
authoring tool.

**Build deliverables (two):**

1. The **skinned, composed, published site** (the seed re-skinned per the brief, deployed to
   Netlify with `seo.noindex` set per §3).
2. A filled **`<slug>-site-charter.md`** — the §9 charter, the *declaration the audit checks
   the repo against*. It records the final token values + fonts, the voice register, the
   content model, the data posture (no-db, connecting the shared `AISmith-functions`
   backbone), modules enabled (e.g. `Map`/`Hours` per charter declaration — none for a copy-only concept), the **privacy/legal block** (controller identity + the *enabled* subprocessors, NL + EN — S7.4), integrations (contact form
   live, wired to `AISmith-functions`; newsletter off), host & runtime (Netlify +
   Supabase Edge Functions on the shared project), the `noindex` state, and the §8 transfer
   unit (the Netlify site + a one-time free port of its functions off `AISmith-functions`).
   The audit cannot run without it.

---

## 6. Self-verification and handoff

Before handing off, the build asserts the fleet claim against its own output. This is the
builder checking its work; it is **not** the audit. The audit (`as-site-audit-prompt.md`) is a
separate, read-only, fresh-chat, independent check — the build does not get to pass itself.

**The five assertions (all must hold):**

1. **Scoped diff.** The diff against the seed touches **skin + content + config only** —
   `tokens.css`, `src/content/*` (incl. `site.config`), and the per-route `head()` content +
   `__root` `lang`. **Nothing under `spine/`** (`src/components/spine/**`, `src/styles/spine.css`).
   A `spine/` touch fails the build here, before the audit ever sees it.
2. **AA matrix re-derived on the new palette.** Regenerate the full text×tone matrix from the
   shipped `tokens.css` and report the numbers; every used cell clears AA, accent-tone
   sections carry no small text. The doc's matrix is not evidence — the rule has shipped a
   fail three times by only checking the surface it was told to. **CTA contrast is a frozen-layer guarantee (S4.5):** `.btn-line` resolves to the section ink and `.btn-action` gains a section-ink separation ring on dark/slate/accent grounds, so a CTA never reads dark-on-dark at rest — verify the rendered buttons per tone and do **not** add a per-site `--action-on-dark` token to mask one (that puts the failure back in site hands).
3. **Voice grep 0.** Grep the rendered routes for prose em-dashes: must be **0** (comments
   exempt). Superlative check clean. Copy matches the brief's declared register.
4. **Six routes, each with per-route meta.** Every route in the brief's structure carries its
   own `head()` (title/description/OG); the AS reference instance is six. Plus: `sitemap.xml`
   + `robots.txt` shipped, the **`/privacy` route + footer privacy link** present with the `legal` block reflecting the site's *actual* enabled subprocessors (S7.4), `lang` hard-set, SSR view-source shows the copy (not an empty root
   div), and the **charter matches the repo** (no orphan routes, no undeclared integrations —
   S8.4).
5. **Assets are the real ones (intake §6).** The logo is an **image asset extracted from the
   rendered live site**, not a generic text-wordmark stand-in (a faithfully reproduced real
   wordmark is the mark; an invented text fallback is not). Photography uses the existing site's
   **own image URLs**, not stock or grey-box placeholders where the client's real photography
   exists. A text-only logo fallback or a placeholder standing in for an available real asset
   **fails the build here** — now **mechanically gated** by `verify.mjs` [6] via the `site.config` `brandMark` declaration (default `image`; a wordmark must be explicitly declared), not discipline alone.

If all five hold, the diff *is* a re-skin: the fleet can trust this site without being told
which one it is looking at. That is the claim.

**The residual SSR-independence gate (required before PRODUCTION).** The five assertions above
are static checks; none of them *proves* the site server-renders. Because the seed is SSR
(TanStack Start) and `verify.mjs` reads source rather than a running build, the single residual
point is confirmed out-of-band: **one green `vite build` plus a view-source by a non-builder
(or CI)** showing the rendered copy in the served HTML — not an empty root `div` — is **required
before a site is promoted to production**. This holds for the agent-direct build: it is the one
check the authoring change does not remove, and `verify.mjs` prints it as an explicit NOTE rather
than claiming it as a pass.

**Handoff.** Bring the built repo, the preview/live URL, and the filled charter to a fresh
chat and run `as-site-audit-prompt.md` (one run per site). Its JSON manifest + human summary
come back to the main thread for the fleet diff. A clean self-verification should make the
audit boring; a surprise in the audit means the self-check missed a surface — feed that back
into the seed or the spine doc, not into a one-off patch.

---

## 7. When the brief is wrong, or a contract cannot be met

The build agent does not silently resolve a conflict to keep moving. Mirror the spine doc's
§7: route every blocker to one of two channels, and never silently bend a guardrail.

- **The brief is wrong or thin** (a fact the build needs is missing, an instruction
  contradicts a confirmed fact, a §9 item is unresolved) → **apply the standing default**
  (intake §7), build around the gap, and **record it for the post-build review** — the run does
  **not** halt and does **not** go back to intake mid-flight. Do not invent the missing fact.
  (A genuinely load-bearing gap with no safe default is the guardrail-breach case below.)
- **A contract cannot be met without breaking the spine** (a section needs structural CSS, an
  inline type scale, or a component the spine does not have) → that is a **missing spine
  component**, a spine change handled centrally (`as-site-spine-standard.md` §7). **Stop.** Log
  which component was missing. Do not write bespoke CSS or a new component into the site to
  get past it.
- **A guardrail would have to bend** (voice, AA, no fabrication, the §6 prospect rules) →
  there is no channel for this. The guardrail holds; the page changes.

The cost of stopping is a short delay. The cost of silently resolving is a site the fleet
cannot trust and an audit finding downstream. Stop.

---

## 8. Siblings and parked inputs

This doc is the **greenfield / concept** build path — a fresh TanStack site from a brief. Two
related paths sit beside it and do **not** change anything above:

- **WordPress conversion (the third pipeline).** Migrating an **existing WordPress** site to a
  built TanStack site is a separate pipeline with its own doc: **`as-site-build-wp-conversion.md`**
  (WP extract → TanStack build → 301 map → noindex stage → DNS cutover → production index → retire
  WP). It reuses **this doc's touch surface (§2) and self-verification (§6)** for the *build* step,
  and `as-project-playbook.md` §3 for the migration discipline. Reach for it when an existing WP
  site is being **converted**, not when a new site is built from a brief. Keep-WP vs convert is a
  per-client **offering, not a default** (`as-wordpress-site-kit.md` §8, `as-stack-blueprint.md`
  §1B rule 1).
- **Claude Design input [PARKED].** A future premium lane may feed a **Claude Design** hand-off
  into this build. It is **parked, not built this cycle**. When activated it changes nothing about
  the touch surface: **Claude Code writes the PR; no design tool writes under `spine/`** (§2 holds
  regardless of where the design came from), and the agent-fleet **§6 injection-gate split** applies
  (capture/design in one session, the privileged write in another — `as-agent-fleet.md` §3A / §6).
  Claude Design is an *input* to the build, not a second writer. [PARKED]

---

## Changelog

*v0.6.8 -- 11 October 2026 (site-contract 1.8.30 -> **1.8.31**, coupled with hub-contract 1.7.21): **THIS FILE RIDES THE CUT FOR ITS CHANGELOG'S CLASSIFICATION ALONE, AND NO BODY TEXT MOVES** (R167, the T3 register; the controller's Q5 ruling of 2026-10-11 on `prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2, *as recommended*: the hazard that deferred T3 was bytes moving under an UNCHANGED version, and this cut moves the version). Fourteen entries, v0.6.7 to v0.3, ALL RECORDS, no promotion owed: v0.6.7's owned-archive provenance rule lives in SS4, v0.6.5's logo gate in SS4 and SS6, v0.5.0's default-and-record rule in SS4 and SS7, v0.4.2's tone map in SS1. **The count is of what survives**: this file ends mid-word in its v0.3 entry (*Path B, the Lovable pa*), with no trailing newline, in every commit since `6bb5a56` (2026-06-22), so the rest of v0.3, the v0.2 and v0.1 entries and the companions footer are lost here and readable only at `cabe9bc`; restoring them is not this cut's and is raised in its pull request. No em dashes.*

*v0.6.7 -- 20 September 2026: **the worked example's names bullet gains S5's scoping, which is the THIRD of the three loci row 089's done-when names** (E2b-iii; site-contract 1.8.28 -> **1.8.29**, the UNCOUPLED cut; `prompts/dispatch/plan-cut-1829-2026-09-19.md` v0.2 SS4b). The owned-archive rule is a PROVENANCE rule and not a names rule: where the crawl reads an archive the owner owns, a fact carries the date of the post it came from and a fact predating a change of ownership is re-sourced from a current page or dropped, and the used-by-default setting `as-site-intake-standard.md` v0.7.0 made STANDS (operator ruling 2026-09-17). **This file is the worked example and `as-site-intake-standard.md` is the normative one**, so the sentence is written into this bullet's idiom rather than copied byte-identically; what is identical is the rule. No content of the build procedure moves. No em-dashes.*

*v0.6.6 — 26 July 2026: §3 contact wording — the shared `contact` fn folds whitelisted extra string fields into the mail as labelled lines (bounded) and gains the per-tenant `signup` bare-signup mode (`CONTACT_TENANTS.signup.subject`; `{email}`-only accepted). Backward compatible; no per-site functions. Fold of contract-patch #117 (zuidgeluid WP conversion).*

*v0.6.5 — 29 June 2026: **logo enforcement gap closed.** `verify.mjs` gains section **[6] LOGO** — the logo must resolve to a real image mark (`<img>`, an inline `<svg>` with vector primitives, or an imported asset); a text-only wordmark **fails** unless `site.config` declares `brandMark.kind: "wordmark"` (default `image`, so a silent fallback fails closed; in `--ci` a missing logo node fails closed too). §4 "enforcement gap" note and §6 assertion 5 updated from discipline-only to gated. Fixes the text-wordmark slips on the cafekamiel + planttrekkerij runs. Promoted: site-contract 1.6.12 → 1.6.13.*

*v0.6.4 — 29 June 2026: **Lovable host exception retired (Stage 2).** §3 host model now reads no host exceptions — SK migrated off Lovable publish onto Netlify (29 Jun) and ZG is live on Netlify; the `host` manifest value is `netlify`-only (former `lovable` retired). Step-0 backend posture de-Lovabled (provision no managed backend, not "deny if Lovable prompts Cloud"); the production view-source check now reads as the single agent-direct path (dropped the "and Lovable" branch).*
*v0.6.3 — 29 June 2026: demo-run fixes — §5 deploy now **attaches the `<slug>.demos.aismith.io` custom domain via Claude-in-Chrome** (Netlify connector has no domain op; Netlify-DNS auto-creates record+SSL), never ending on `*.netlify.app`; §6 logo rule notes the **enforcement gap** (verify.mjs doesn't yet gate the logo — build-discipline + audit, planned verify addition). Promoted: site-contract 1.6.9 → 1.6.10.*

*v0.6.2 — 29 June 2026: §5 **skin** step now names its source — apply a named preset from `AISmithFactory/aismith-skins` or a custom skin via `folder=` (overwrite `tokens.css`, load the skin's fonts, enable its `archetype.modules`); seed default stands if none chosen. Skins are Claude-Design-authored (agent-fleet §3A, now ACTIVE). Content stays intake-sourced; AA re-verified S2.3. Promoted: site-contract 1.6.8 → 1.6.9.*

*v0.6.1 — 29 June 2026: **named the runnable seed substrate.** §1/§5 now point the agent-direct scaffold at the repo **`AISmithFactory/aismith-site-seed`** (`git clone` it: frozen spine + proven TanStack/Netlify toolchain, build- & verify.mjs-green) instead of "stand up a starter + drop the seed over it." The markdown-of-record (`as-site-seed-spine.md`/`as-site-seed-instance.md`) stays the **spec-of-record** the repo is reconstructed from; the repo is the runnable source. Closes the gap Stage 1 exposed (Lovable removed the scaffold producer with no runnable substrate in its place). Promoted: site-contract 1.6.7 → 1.6.8.*

*v0.6.0 — 29 June 2026: **Lovable retired as an authoring path (Stage 1).** §5 collapsed from two authoring paths to the single **agent-direct** path — Claude Code writes the repo from seed + brief; dropped Path B (the Lovable paste loop) and its Lovable-specific mechanics (paperclip-every-`.tsx`, ≤6-files-per-prompt, routes-split-3+3). The per-route checks (AA-conform, voice-grep, `lang`) and the `__root`-only-shell rule are retained as path-agnostic structural rules; intro/§-list de-Lovabled. The §3 **host** model (SK Lovable-publish exception) is untouched — its retirement is Stage 2, pending SK's Netlify migration reconciling up to Factory. Promoted: site-contract 1.6.6 → 1.6.7.*

*v0.5.1 — 29 June 2026: §4 names default reconciled to intake v0.7.0 — **named people used by default** (no fabrication; go-live owner-confirms; containment-gate privacy basis), replacing the stale brief-switches-naming-on / holds-by-default wording. Promoted: site-contract 1.6.5 → 1.6.6.*

- **v0.5.0 — 28 Jun 2026:** **Gate removed — build runs end-to-end to the demo.** §4 retitled and
  the no-fabrication rule reworked from a **pause** into **standing defaults applied automatically**
  (intake §7): an unresolved §9 item is defaulted + built-around + recorded for the **post-build
  review**, and the run continues to the deployed `noindex` demo rather than stopping. §5 **Order**
  deploy step is now **automatic, no pre-host pause**. §7 first channel changed from "back to
  intake" (a mid-flight halt) to default-and-record; the only halts left are a **guardrail breach**
  or a **missing spine component**. §4 worked example updated: café Kamiel **names on** (owner
  invited — Ans/Frederik/Kamiel + Matt, go-live-confirm), **free font stand-ins** (Oswald + Inter),
  and **real logo extracted + real photos reused, no placeholders**. **Demo posture:** ships
  **publicly-sourced hours unverified** (read via Chrome, not held off) — no-fabrication forbids
  *inventing*, not *displaying real public data that may be wrong*; closed-door rule is
  go-live-only. GBP Places `facts` function **[DEFERRED]** (scoped + shelved).
- **v0.4.2 — 23 Jun 2026:** Reconciled to spine **v0.10.0** (was pinned v0.8). **§2 tone-map home
  corrected to match S2.2** — the `[data-tone]` tone map lives in **`spine.css`** (`var()`-only,
  spine-invariant), not `tokens.css`; the prior "`spine.css` is a wrong Lovable drift" claim was
  the losing side of the 22 Jun same-version fork the spine resolved at v0.9.1. Folded the three
  contract changes the spine landed 23 Jun: **S3.5** facade pattern for third-party embeds (the
  realised `Map` loads on user action — default page cookieless, no consent banner); the realised
  **`Hours`** module (S3.3, structured/static) — the §4 worked example no longer treats hours as
  Info text, the module ships only on GBP-confirmed hours, else stays off. **S7.4** baseline
  **privacy notice** — every site ships a `/privacy` route + footer privacy link driven by the
  manifest `legal` block (controller + *enabled* subprocessors, NL + EN); added to the §3 posture,
  the §5 charter deliverable, and the §6 route assertion. **S4.5** tone-aware CTA contrast
  (`.btn-line`→section ink, `.btn-action`→separation ring on dark grounds — a frozen-layer
  guarantee, no per-site token) referenced in the §6 AA assertion and the §5 per-route AA check.
- **v0.4.1 — 22 Jun 2026:** Reconciliation with the repo's café-Kamiel thread — ported the
  build-discipline rules onto the v0.4 (E+F) base: **build the full page inventory, no Home+Info
  stub** (capture/PDF built into a route, not linked out), and the **`contact@aismith.io`**
  catch-all default for prospect concepts (real `to:` is the go-live `CONTACT_TENANTS` swap).
- **v0.4 — 22 Jun 2026:** Folded proposal item **F** (host model). **§3** deploy now targets
  **Netlify (Pro)** instead of Lovable publish: custom domain via CNAME/ALIAS to Netlify;
  `X-Robots-Tag` set via `netlify.toml`/`_headers`; demo subdomains move to
  `<slug>.demos.aismith.io` (Netlify-DNS-delegated). Manifest `host` records `netlify`
  (`lovable` only for the SK legacy exception). **§5** authoring note decoupled from host —
  authoring (agent-direct or Lovable paste-loop) and host are independent. SK is the parked
  Lovable-publish legacy exception (Vite-SPA, mid-rewiring); ZG is the staged migration target.
  Server-side runtime (Supabase Edge Functions) unchanged.
- **v0.3 — 21 Jun 2026:** Folded proposal item **E** (authoring environment), host-independent
  parts only (from `as-frontend-rethink-proposal-REVIEW.md`, decisions of 21 Jun). **§5** now
  carries **two validated authoring paths**: **Path A — agent-direct** (Claude Code from
  seed + brief; the default going forward; structurally removes the three Lovable frictions —
  angle-bracket stripping, ≤6-files/prompt, "claims changes not present") and **Path B — the
  Lovable pa