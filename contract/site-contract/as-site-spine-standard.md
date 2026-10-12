# AI Smith — Public-Site Spine Standard & Conformance Audit

**Version 0.13.16 -- 11 October 2026.** Forward contract + audit rubric for the public
marketing site. Sibling to `as-hub-spine-standard.md` (v0.3), **not a fork**.

> **v0.13.4:** the gate's **CI binding** ships with the gate (contract patch #155, raised by AS
> after site PR #22 died at the seed checkout before running one assertion). `verify.mjs` needs a
> checkout of the **private** `aismith-site-seed`, and a workflow's `GITHUB_TOKEN` cannot read it
> -- so the contract was heading for a required check whose credential does not exist, with the two
> obvious unblocks (drop `--seed`, drop `--ci`) each silently converting a fail-closed gate into a
> green no-op. The seed now ships `.github/workflows/site-verify.yml`, `site-contract` **stamps**
> it (it stamped no workflow at all while `hub-contract` stamps `hub-deploy.yml`), seed read
> access is a named build prerequisite at **org** scope -- the token already exists with the right
> permission but sits as a *repo* secret on one site, which is why the next site hit the wall --
> and the shipped workflow **skips visibly rather than faking green**. Also: verify **[6]** stops
> false-failing a logo delivered as a local component -- proven a checker defect because the
> reference seed's own mark fails it too. §8 + Appendix; seed doc v0.13.4.
>
> **v0.13.3:** `verify.mjs` gate **[1a] learns the sanctioned resync** (contract patch #150, raised by ZG after its site `main` went red twice on known-good state): [1a] passes iff spine is unchanged vs the parent commit OR every touched spine file is **byte-identical to the sha-pinned seed** (which [1b] already hashes in the same run); a spine diff matching neither stays a hard FAIL. Without this, promoting `verify` to a required check makes every future Trigger-1 resync PR unmergeable. No new inputs; the local-edit guard is not weakened.

> **v0.12.0:** the **WP-conversion component pack** (contract-patch #116, raised by the
> zuidgeluid conversion): optional modules move to **one file + co-located CSS each** under
> `spine/modules/`, imported directly (S3.3); realised set grows by `VideoFacade`,
> `GalleryGrid`+Lightbox+filter, `Marquee`, `AudioPlayer` and the `deco` layer; **S4.6**
> adds the bounded secondary-palette **hue slots** (`data-hue` 1–5, skin-declared pairs);
> core cards gain optional variant props (TierCard hue-bar+icon, EventCard `--card-bg` +
> auto-`noposter`, MediaCard pill+stamp). Seed = `aismith-site-seed` (implementation-of-record).

> **v0.11.0:** Lovable retired fleet-wide (host + authoring). **S8.2** host model now reads no host exceptions — SK migrated off Lovable publish onto Netlify (29 Jun 2026), ZG live on Netlify; the manifest example + `deploy_target` flip to `netlify`. **S5.4** / Step-0 backend posture de-Lovabled (provision no managed backend, not "deny if Lovable prompts Cloud"). **S6** edge functions deploy from the repo via the pipe, not Studio paste. (Lovable Cloud stays the named banned backend; historical "on Lovable you own the document" reworded to agent-direct.)
>
> **v0.8:** functions backbone settled (folded from `as-host-model-addendum.md`,
> superseding the per-site-Supabase half of v0.7). **S5.4** rewritten — Step 0 **connects
> the site to the shared `AISmith-functions` project** (AS org, Pro, eu-central-1, ref
> noted); there is **no per-site provisioning** for a stateless site. The project runs
> edge functions only and **never holds a table**. **Statelessness is the only gate:** a
> site that must **store data** stops and provisions its **own** new account first
> (separate from any hub) — the hub pattern. **S5/S5.1** keep `no-db` = "stores nothing":
> a stateless site **uses** the shared backbone (calls a function by `fetch`), ships no DB
> client, persists nothing. **S6** names the standard **hardened contact function** on the
> shared project (one function, origin allowlist = CORS, server-side fixed destination from
> an origin→destination map never the request body, honeypot + per-origin rate-limit,
> public/`--no-verify-jwt`, `RESEND_API_KEY` in secrets, no table). **S8** default contact
> is the **function form, not mailto**; newsletter off by default. **Manifest**
> `site_supabase` enum → `shared-functions | dedicated-db | none`; a stateless site =
> `shared-functions`. **Charter §9** stateless transfer unit = the Lovable front end + a
> one-time **free port** of its functions off `AISmith-functions` to a fresh account
> (free, no data to move); a stateful site = its own account.

> **v0.7:** fleet host model settled (folded from `as-host-model-patch.md`). **S8.2**
> rewritten — deploy is **Lovable publish (Business)**, server-side runtime target =
> **Supabase Edge Functions**; the CI-to-Cloudflare/Netlify graduation is gone. **S5**
> redefines `no-db` as "stores nothing": a site may pair with its **own functions-only
> Supabase** (edge functions, no tables, no DB client) and still be `no-db`. **S5.4**
> rewritten — the sanctioned backend is the site's **own Supabase in the AS-owned org**,
> shipped empty of tables; **Lovable Cloud is never used**; `builder_backend_provisioned`
> still tracks Cloud specifically and stays `false`. **S6** names the functions as
> **Supabase Edge Functions** (public/no-JWT, CORS-locked to the site domain, manual
> deploy, never auto-deployed). **Manifest** gains `host` / `noindex` / `site_supabase`.
> **Charter §9** transfer unit = the Lovable front end + its functions-only Supabase.
> Demo↔production is configuration (a `noindex` toggle + domain), not a rebuild.

> **v0.6:** first real Prompt 1 build folded back in (clean run). **S5.4 rewritten** to
> match current Lovable: there is no decline-at-creation control, and Lovable Cloud being
> auto-enabled-in-chat is a *capability flag*, not a provisioned backend. Step 0 is now
> connect-nothing / set-Cloud-to-ask / deny-if-prompted / verify-the-bundle, and the gate
> (and the `builder_backend_provisioned` field) checks an *actual provisioned surface*, not
> the flag. **S7.2** notes that a framework error-fallback returning a `Response` string is
> not a second document shell. Seed: corrected `cultural.tsx` Door-2 hero fill, and
> `sitemap.xml` reclassified paperclip-preferred.

> **v0.5:** third dry run folded in (clean run, no blockers). New core component
> **`PageTitle`** (a bounded hero size scale) so heroes stop hand-rolling inline
> `font-size` — the one genuine "missing spine component" the run surfaced; **S3.2**
> tightened to ban inline *type* while explicitly permitting inline *spacing* (the per-site
> rhythm). Orphaned scroll-reveal CSS removed from the core and **reveal reclassified as an
> optional module that ships with its driver** (S3.3/S3.4). **Appendix B synced to the
> realised prop contracts** (Btn `action|line|ghost`, Band `tone`, MediaCard `category`,
> TierCard, etc.) so a literal auditor stops reading sketch-vs-reality as drift. Seed:
> `SCAFFOLD.md` now names the starter/preset to record; `functions/DEPLOY.md` states the
> `netlify.toml` is omitted by design while forms are unmounted.

> **v0.4:** second dry run folded in. **S2.3 generalised** from "light + dark pairs" to
> *every text token × every section tone it can land on* — the rule kept passing because
> it only checked the surfaces it was pointed at (v0.3 caught accent-on-dark but shipped
> soft-body-on-`alt`: Anvil `#6E6760` on Mist = 4.28, fail). Fixed by darkening the soft
> token to `#5E574F` (Mist 5.47); the full matrix is now in S2.3 and re-run every audit.
> **S2.2** clarified: the spine stylesheet carries no raw colour literal *including
> `rgba()`* — alpha is composed over a token triplet (`rgba(var(--shadow-color), a)`); two
> such literals were tokenised (`--shadow-color`, `--rule-on-dark`).

> **v0.3:** first dry run folded in. **S2.3** rewritten to require an *on-dark*
> accent-text token and to check on-dark pairs, not only on-light (the v0.2 proof missed
> that Ember-as-text fails AA on Iron/Slate; fixed with `--accent-on-dark` `#E0915F`).
> **S4.1** enum gains `slate` (the realised seed uses it) and a note on the accent-tone
> text trap. New **S5.4** — no builder-provisioned backend on a no-db site (decline
> Lovable Cloud at creation; this is **Step 0**, before the first prompt). Per-route meta
> + sitemap + `lang` made a **template requirement** (S7.1/S7.2, §8), not just an
> assertion. §8 template paths synced to the realised flat `src/content/*.tsx`.

> **v0.2:** added **S9 — Voice & copy** (Principle 9 as a hard gate: zero prose
> em-dashes, no superlatives, show-don't-tell), folding `as-relationship-playbook.md`
> in as the *voice layer of the same spine/skin/content model* rather than a separate
> doc; manifest + summary gain a voice block; the "Public Site — TEMPLATE" seed is
> realised as `aismith-site-seed` (the AI Smith instance); registered the planned
> `as-wordpress-site-kit.md` (the non-fleet WordPress delivery path).

> **What this is.** The single standard every AI Smith *public site* must honor so
> one agent fleet can scaffold, audit, and support any site without being told which
> one it's looking at. The spine is an **interface**, not a feature set. The hub spine
> governs the private, auth-gated operating system; this governs the public, world-
> readable surface in front of it. Same stack, same deploy doctrine, **opposite
> security posture**: the risk here is *exposure*, not unauthorised mutation.
>
> **How it's used.** Take this doc into a **fresh chat, one site at a time**, with the
> site's repo (and, if it has one, its declared read-pipe spec). The chat audits the
> site **read-only** against the assertions below and emits a machine-readable
> **conformance manifest** (JSON) plus a short **human summary**. It proposes a
> remediation list and **stops** — no code.
>
> **Where it comes from.** The contracts are derived from the proven *shape* of the
> Zuidgeluid build (the token-driven CSS, the header/footer/section/card/CTA/form
> grammar) re-expressed for the go-forward stack, plus the public-site clauses already
> reserved in `as-stack-blueprint.md` §1B and §13. They are **not** derived from any
> one live site's state. A site that fails an assertion means the site must change —
> *or*, occasionally, that the standard is wrong for that business (see §7). The
> auditor never silently passes a fail.
>
> **First instance.** AI Smith's own site is the testing ground: it proves the spine
> before any client touches it. ZG supplies the *structure*; the AS mockup supplies the
> *skin and copy*; the first spine build merges them.

---

## 1. The one principle: conform the spine, vary the skin

Every assertion is tagged **interface (IF)** or **implementation (IMPL)** (some both).

- **IF — interface.** The contract exposes a *uniform surface* the fleet relies on; the
  site passes if the surface is present, whatever the values behind it. Example: the
  token set. The contract is "expose this fixed set of semantic token names." A warm
  copper palette and a green/magenta palette **both pass** — same names, different
  values. The auditor records the variance and moves on.
- **IMPL — implementation.** A specific mechanism that must actually be present and
  correct, because exposure-safety or re-skinnability depends on it. Example: no
  service-role key anywhere in the shipped site. No acceptable variance.

When in doubt: if forcing two sites to match would cost fit (brand hexes, fonts, which
optional modules ship, section order), it's **IF** — record and move on. If a mismatch
leaks data, ships a secret, or makes a re-skin impossible, it's **IMPL** — a finding.

**Severity:** **GATE** (the fleet cannot trust this site until fixed — an exposure hole
or a broken re-skin contract) · **IMPORTANT** (real drift that breaks a fleet assumption
but isn't a leak) · **ADDITIVE** (desirable, or not statically verifiable — record +
recommend).

**Reading rule -- where an example is LOAD-BEARING.** An `e.g.` inside descriptive prose or a
free-text reason is illustrative and reads as one. An `e.g.` inside an **exemption, a permission,
or a scope test is not**: it becomes the rule, because the only thing a reader has to reason from
is the instance in front of them, and every case they meet will resemble it in some way. The fleet
has now lost this four times -- a `i.e.` that read as a restatement and was a narrowing (C2.4,
v0.5.6), an exemption read wider than written (S3.2a), a permission whose single example licensed
the class (the C2.4 grantor variance, corrected here), and an example of a privileged flag that
became the definition of one (C4.2, corrected here). **So: enumerate inside an exemption or a
permission, and name the test rather than the instance inside a scope clause.** Where an instance
is genuinely useful, say which it is -- "X is the observed instance, not the definition".

**The layered model the whole standard rests on:**

| Layer | What it is | Who changes it | Contract |
|---|---|---|---|
| **Spine** | Component library, layout primitives, section grammar, behaviours | Never per-site — versioned centrally | S1, S3, S4 |
| **Skin** | The token file: colours, fonts, geometry, motion | Agent Builder, once, per site | S2 |
| **Content** | Nav, copy, images, section composition, form fields, footer | Agent Builder / client, per site | config, not code |

A new site = **swap the skin, supply the content, compose pages from spine components.**
No bespoke structural CSS is written per site. If a site needed hand-CSS to lay out a
section, the spine is missing a component — that's a spine change, not a site change.

---

## 2. Operating rules for the auditing chat (read before starting)

1. **Read-only.** Inspect the repo and any declared read-pipe. Propose; never patch.
2. **One site per chat.** Bring the repo and the site charter (§9).
3. **Never treat absence as safety.** "No DB" must be *verified* (no client, no env, no
   query), not assumed. A leaked service-role key is a GATE fail even if "the site only
   reads."
4. **Posture is inverted from the hub.** You are hunting *exposure*: secrets in the
   bundle, writes into a foreign system, a read-pipe wider than its declared fields, a
   shared database. You are **not** hunting RLS-on-mutation (there are no privileged
   mutations on a public site — if there are, that's S6).
5. **Record variance, don't flag it.** Different palette, different modules, different
   page order = IF variance. Note it in the manifest; it is not a finding.

---

## 3. Required inputs (demand all of these)

### 3.1 Repo
Full source: routes, the spine component directory, the **tokens file**, the content/
config, the edge-function sources, and the deploy config (TanStack preset + CI). The
shipped client bundle if available (to grep for secrets and raw hexes).

### 3.2 Charter
The site's `*-site-charter.md` (§9): declared skin values, content-editing model, data
posture, any read-pipe/bridge, which optional modules ship, integrations, deploy
target, and the §8 transfer unit. The charter is the spec the audit checks the repo
against.

### 3.3 Read-pipe spec (only if the site shows live hub data)
The exact doorway: the anon-safe view or read-only edge function, the published fields
it exposes, and the bridge declaration (same discipline as the KT↔SK boundary
contract). If the charter declares "no DB," there must be **no** Supabase client in the
shipped site at all.

---

## 4. The nine contracts (the rubric)

Each row: assertion · where to verify · IF/IMPL · severity.

### S1 — Stack & app boundary
*One stack; the public site is always a separate app from any hub.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S1.1 | Built on **TanStack Start + SSR** (the go-forward default). A Vite-SPA public site is a legacy exception and must be declared in the charter. | Repo / charter. | IMPL | IMPORTANT |
| S1.2 | The public site and any hub are **separate apps** — never one combined app, whatever the stack. Different audiences, cadences, trust boundaries, and §8 transfer units. | Repo. | IMPL | GATE |
| S1.3 | The site is the public marketing surface only. No auth-gated member area lives inside it; "Voor leden / Members" is a **link out** to the hub, not a route in this app. | Repo / nav config. | IF | IMPORTANT |

### S2 — Token contract (the re-skinnability interface)
*The skin is a fixed set of semantic tokens; components touch nothing else.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S2.1 | The site defines the **fixed semantic token set** in Appendix A — same names on every site, only values differ. Missing or renamed tokens = drift. | Tokens file. | IF | IMPORTANT |
| S2.2 | **Components reference only semantic tokens.** A `var()` reference to a custom property no `tokens.css` (or spine slot) declares is a **GATE fail, not a fallback** -- it resolves to the initial value and renders wrong silently (the ZG black-illustration incident, #123; `verify.mjs` (d2) enforces it). Colour in *artwork* belongs in an asset file (`.svg` under `public/`), never as markup fills -- an SVG presentation attribute cannot carry a `var()` fallback. No raw hex and no colour-named or sector-named token (`--green-dp`, `--magenta`) appears anywhere in component code. The **spine stylesheet** holds no raw colour literal either — *including `rgba()`*: alpha is composed over a token triplet (`rgba(var(--shadow-color), a)`) or via a purpose token (`--rule-on-dark`), so a re-skin can't silently keep an Iron/Paper hue in a shadow or hairline. Literal colour lives only in `tokens.css`. This is the gate that makes a re-skin a one-file edit. The `[data-tone]` Section tone map (`--sec-bg`/`--sec-text`/`--sec-soft`, all `var()` references, spine-invariant) lives in **`spine.css`**, not `tokens.css` — it carries no literal colour, so the skin file stays variables-only. | Grep component dir + `spine.css` + bundle. | IMPL | GATE |
| S2.3 | **Every text token clears WCAG AA (4.5 normal, 3.0 large) on every section tone it can appear on** -- not "the light path," not "light + dark," but the full matrix. The text tokens (`--text`, `--text-soft`, `--accent-text`/`--accent-on-dark`, `--on-dark`, `--on-dark-soft`) × the tones they render on are all checked and the matrix is regenerated every audit. Accent used as *text* uses a surface-appropriate token, never raw `--accent`: `--accent-text` on light, `--accent-on-dark` on dark/slate. Accent *as a section background* (`accent` tone) is **large-display-only** -- body text on it does not clear AA, so accent-tone sections carry no small text. **Earned three times, same blind spot each time** (the rule only ever checked the surface it was told to): v0.2 shipped Ember-as-text on Paper (3.81); v0.3 shipped Ember-as-text on Iron/Slate (4.06 / 3.28); v0.4 shipped soft body (Anvil `#6E6760`) on Mist (4.28). The fix is the matrix, not the pixel. **EARNED A FOURTH TIME, 2026-08-02, and this time the blind spot was BETWEEN two rows.** The matrix must also cross every text token with **every declared `--hue-N` ground** (S4.6), not only the tones. A `Section` carries `tone` and `hue` independently: the **ground comes from the hue, the ink still comes from the tone**, so `tone="slate" hue={3}` puts a dark-register ink on a light hue ground -- a cell in no matrix anyone was keeping. Live on zuidgeluid.be at the fold: `--accent-on-dark #F1C9CD` on `--hue-3 #6FB2D6` = **1.55**, `--text-soft #4C5E6A` on the same = **2.89**, against a 4.5 threshold, across three routes. Every individual pair was documented and passing -- `--accent-on-dark` against the dark grounds, `--text-soft` against the light grounds, `--hue-3/-ink` at 5.24 -- **three internally consistent matrices and nothing multiplying two of them.** The previous three instances were one row checking too narrow a surface; this one is S2.3 and S4.6 each checking their own and neither owning the product. | Full text × (tone ∪ declared hue) matrix below, **generated not enumerated**. | IMPL | GATE |
| S2.4 | Fonts are loaded by the app (self-hosted `@fontsource` or a single Google Fonts link), set via `--font-display` / `--font-body`. No reliance on a CMS theme's typography panel. | Tokens / root. | IMPL | IMPORTANT |

**S2.3 worked matrix (the AS skin; regenerate per skin).** Every cell a site uses must
clear its threshold. ✓ = AA-normal pass (≥4.5); the only sub-4.5 cell is body text on the
Ember background, which is large-display-only by rule.

| text token ↓ / surface → | Paper | Mist (`alt`) | white (card) | Iron (`dark`) | Slate | Ember (`accent`) |
|---|---|---|---|---|---|---|
| `--text` | 15.48 ✓ | 12.95 ✓ | 16.84 ✓ | — | — | — |
| `--text-soft` `#5E574F` | 6.54 ✓ | **5.47 ✓** | 7.11 ✓ | — | — | — |
| `--accent-text` `#9E4E1E` | 5.42 ✓ | 4.53 ✓ | 5.90 ✓ | — | — | — |
| `--on-dark` | — | — | — | 15.48 ✓ | 12.49 ✓ | 3.81 (large only) |
| `--on-dark-soft` | — | — | — | 10.73 ✓ | 8.95 ✓ | — |
| `--accent-on-dark` `#E0915F` | — | — | — | 6.73 ✓ | 5.43 ✓ | — |


### S3 — Component spine (the structure interface)
*A required component set with stable prop contracts; pages compose from it.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S3.1 | The **core components** in Appendix B are present with the listed prop contracts: `SiteHeader`, `SiteFooter`, `Wrap`, `Section`, `Band`, `PageTitle`, `Display/SecTitle/Eyebrow/Lead/Em`, `Btn`, `MediaCard`, `TierCard`, `EventCard`, `StatCard`, `InfoCard`, `ContactForm`, `NewsletterForm`, `PrivacyNotice`, `Crumb` (a sub-page's breadcrumb is navigation, not decoration -- on some pages it is the only route back up, #141). | Repo. | IF | IMPORTANT |
| S3.2 | **No bespoke structural CSS, and no inline *type* per site.** Layout and type-scale come from spine components and classes; a hero uses `PageTitle` (a bounded size scale), never an inline `font-size`. Hand-CSS to lay out a section, or an inline `font-size`/clamp, = a missing spine component (escalate, don't special-case). **Permitted in a composition:** inline *spacing* on composed elements (`marginTop`, gaps) for the per-site rhythm — spacing is content, structure and type are not.  **AND A BESPOKE STYLESHEET THAT DECLARES TYPE IS IN THIS ROW'S POPULATION AND NOT IN S3.2a'S (site-contract 1.8.25).** The denominator is EVERY stylesheet the site ships that is not `spine.css`, read whole: a type declaration in one is scored here, because it is bespoke CSS rather than S3.2a's inline arm, and a sweep run against S3.2a does not reach these files. `aismith-site`'s `skin-showcase.css`, `src/graphics/graphics.css` and `src/styles.css` are the worked instance and were correctly excluded from the S3.2a sweep of 2026-08-27 rather than widened into it. **`src/graphics/**` IS OUT OF BOTH POPULATIONS** (operator ruling 2026-08-27, `prompts/dispatch/plan-site-1824-2026-08-27.md` v1.2): its subject is SVG and OG generation and not page copy, and the exclusion is restated here so a reader of the standard meets it where the boundary is rather than in a closed cut's carve-out. | Repo / styles. | IMPL | IMPORTANT |
| S3.2a | **A spine type role is a STANDALONE class. A component may compose it; it must not own it.** Where a role exists only as a descendant of one component (`.media-card .pill`, `.media-card .cat`, `.media-card h3`, `.media-card p`, `.media-card .loc`, `.tier-card .price`, `.stat .num`), any composition outside that component cannot reach it and reinvents it inline -- which is the S3.2 violation the spine itself caused. **New at 1.8.9, and the evidence is that the seed does not need it while both instances do:** `aismith-site-seed`'s seven pages carry **ZERO** inline type, so the spine is sufficient for the reference build; `aismith-site` and `zuidgeluid-site` then independently reinvented the same roles inline, because both compose outside the four components that own them. **The role inventory below is PROVISIONAL and is known to undercount.** The sweep that produced this row read `zuidgeluid-site` as carrying three inline-type sites; a local read by that repo's own session found **ten** -- `ui.tsx` has three and `home.tsx` has seven MORE, independent rather than mirrors, including three display-scale clamps and a 900-weight display line that have no counterpart in the list. The sweep fetched one file twice and did not notice. **That is the same undercount this row's own method note criticises**, committed by the sweep that wrote the note. Roles known so far: five already exist scoped (`.pill`, `.cat`, `h3`, `p`, `.loc` / `.price` / `.num`), and at least two are genuine additions (a display pull-quote, a display name list) with more expected once ZG's seven are classified. **The seed implementation must re-sweep from source rather than build to this list.** **AND THE POPULATION IS PAGE COPY: `src/graphics/*` IS OUTSIDE IT.** Bespoke React graphics are instance code beyond content and are not type roles, so a graphic declaring its own type is not an S3.2a violation. Measured 2026-08-25: the carve-out lived only in a one-shot dispatch plan while S3.2a is GATE at 1.9.0, so at 1.9.0 the gate would have fired on 103 declarations and whoever met it would have re-derived this ruling from nothing. | `spine.css`: each type role reachable as a bare class; components reference the class rather than redeclaring the values. | IMPL | ADDITIVE (**GATE at 1.9.0**) |
| S3.3 | **Optional modules** (Appendix B: `Marquee`, `GalleryGrid`+`Lightbox`, `AudioPlayer`, `VideoFacade`, `Deco` (star/grain/zigzag/tilt/badge/pill), `ScoreGrid`, `StepGrid`, `Timeline`, `Team`, `Map`/`Hours`, `Reveal`) are included **per declaration** in the charter. Each lives in **its own file with co-located CSS** under `src/components/spine/modules/` and is **imported directly, never re-exported by the spine barrel** — so a site that doesn't enable a module bundles neither its JS nor its CSS, and a module with a behaviour ships with its driver, never as orphaned CSS. A media-light site (e.g. AS) ships few; ZG ships many. Variance is expected. **Realised so far:** `map`, `hours`, `video`, `gallery`, `marquee`, `audio`, `deco`, `tiles`, `timeline`. | Charter / repo. | IF | ADDITIVE |
| S3.4 | Core behaviours are componentised, not inline scripts: **sticky-header state, mobile-nav toggle** (reduced-motion honoured). Behaviours beyond these (scroll-reveal, lightbox, audio/video facade) are **optional modules** (S3.3), shipped with their drivers only when the charter enables them — the core ships none. | Repo. | IMPL | IMPORTANT |
| S3.5 | **Third-party embeds use the facade pattern.** Any module embedding a third-party origin (maps, video, social) renders a self-hosted, tokenised placeholder at rest and loads the third-party resource **only on user action** — so the default page issues no third-party request and sets no third-party cookie (EU-clean; no consent gate needed for the resting view). Realised: `Map` (keyless Google `output=embed`, loads on click) and `VideoFacade` (poster at rest; YouTube activates via `youtube-nocookie` + `playsinline`, MP4 builds a native `<video>` once — cookieless at rest either way). | Repo / styles. | IMPL | IMPORTANT |

### S4 — Section & tone system
*Alternating banner colours are declared composition, not CSS magic.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S4.1 | `Section` takes a **`tone`** from the fixed enum (`paper` / `alt` / `surface` / `dark` / `slate` / `accent`), each mapped to tokens. `slate` is the second dark register (grant/cultural institutional tone). The page composition sets the rhythm explicitly. | Repo. | IF | IMPORTANT |
| S4.2 | The ZG `:has()` auto-alternation is **not** carried over. Explicit `tone` props are required (predictable for an agent; no selector fragility). | Repo / styles. | IMPL | ADDITIVE |
| S4.3 | **Accent-as-text resolves per tone, never to raw `--accent` on a dark ground.** On `dark`/`slate`, accent text (`.em` / `.eyebrow` / `.btn-ghost`, footer headings) uses `--accent-on-dark`; on the `accent` tone it falls back to the on-dark body colour (accent-on-accent would be invisible). The realised fix lives in the spine stylesheet, keyed to tone, so the `--accent-text` cascade is left untouched (a tone-map swap would leak the lightened accent onto light cards nested in dark sections). | Styles. | IMPL | IMPORTANT |
| S4.4 | Full-bleed is a `Section` concern handled once; no per-site `100vw` / negative-margin hacks (those were WordPress-container survival gear — see §8 note). | Repo / styles. | IMPL | IMPORTANT |
| S4.5 | **CTA buttons resolve contrast per tone, never dark-on-dark at rest.** The outline button (`.btn-line`) uses the section ink (`--sec-text`/`--sec-bg`) rather than raw `--text`/`--bg`, so it is legible at rest on a dark band, not only on hover-fill. The filled button (`.btn-action`) keeps its `--action` fill and on-dark label but, on `dark`/`slate`/`accent` grounds, gains a 2px separation ring in the section ink so it reads as a distinct object regardless of how dark a site's `--action` is — a frozen-layer guarantee, not a per-site `--action-on-dark` token (which would put the failure back in site hands). Light tones unchanged. | Styles. | IMPL | IMPORTANT |
| S4.6 | **Secondary-palette hues are bounded slots, not new tones.** A multi-hue brand (ZG's per-programme mustard/rose/sky/green/magenta) declares up to six `--hue-N` / `--hue-N-ink` pairs (+ optional `--hue-N-soft`) in `tokens.css`; the `Section` `hue` prop (`data-hue="1..6"`) re-grounds the section in that pair, and an undeclared slot falls back to the tone; `data-hue-tint="1..6"` is the declared way to borrow a hue as a band or a tint WITHOUT grounding, setting one custom property (`--hue-tint`) and never a ground or an ink (R120, site-contract 1.8.31) -- **tone = register, hue = brand family**, independently settable in the markup -- but **NOT orthogonal in the cascade, and the v0.13.9 correction is that the original wording said they were.** A hue re-grounds the section while the tone still governs the ink, so the two compose into a text-on-ground pair that belongs to neither row. That pair is an S2.3 matrix cell (see S2.3, fourth instance). Claiming orthogonality is what made the product invisible: if they were genuinely orthogonal there would be nothing to check, and they are not. Every declared pair clears WCAG AA (S2 gate applies per pair). Single-accent brands declare none and the mechanism is inert. Raw palette colours outside the declared slots stay banned. | Repo / styles. | IMPL | ADDITIVE |

### S5 — Data posture
*No database by default; a DB or hub read-pipe is the declared exception.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S5.1 | **Default: no database, content in the repo.** `no-db` means the site **stores nothing** — no tables, no DB client, no stored data, no RLS surface. If the charter declares "no DB," the shipped front end carries **no** `supabase-js` (or other DB client) and runs no query. Calling the **shared `AISmith-functions` project** (edge functions only, reached by plain `fetch` to the function URL) is still `no-db` — the forbidden things are tables, a DB client, and stored data, not the Supabase project itself (see S5.4). | Repo / bundle. | IMPL | GATE |
| S5.2 | A DB or a hub read-pipe is permitted **only as a declared exception** in the charter, with a stated reason (e.g. live events/menu/programmes). Undeclared data access = finding. | Charter vs repo. | IMPL | GATE |
| S5.3 | The public site **never shares a hub's database.** The boundary is physical, not policy-dependent. | Repo. | IMPL | GATE |
| S5.4 | **The sanctioned backend for a stateless site is the shared `AISmith-functions` project** (AS-owned org, Pro, eu-central-1 Frankfurt, `https://jctzzxibnflyvfallpva.supabase.co`) — connected, **not provisioned**. There is **no per-site Supabase project** for a stateless site, and `AISmith-functions` **never holds a table** (no RLS surface, no stored data — by rule, so the gate cannot be crossed by accident). **Lovable Cloud is never used** (unowned, irreversible, no transfer path); the Cloud capability flag being on is **not** itself a violation, a *provisioned data surface behind it* is. **Step 0, before the first build prompt:** connect the site to `AISmith-functions` (register the site's origin + contact destination in the **function's** config, not the front end), request no DB/auth/storage feature and **provision no managed backend** (no Lovable Cloud or other auto-provisioned data surface), then verify the shipped bundle carries no DB client. **The statelessness gate (GATE):** a site that must **store data** stops and provisions its **own** new Supabase account/project first (AS-owned org), separate from `AISmith-functions` and from any hub, **then** builds — and is recorded `dedicated-db`. `builder_backend_provisioned` tracks **Lovable Cloud specifically** and stays `false` (the shared backbone is not a Cloud provision). If the charter declares an **anon-view** read-pipe (S6.4), the site instead connects the **hub's existing** Supabase read-only — never a new project. The audit checks an **actual provisioned data surface** on the site (DB client in bundle / tables / DB env keys), not the shared backbone or the capability flag. | Project setup / repo. | IMPL | GATE |

### S6 — No secrets, no writes, no service-role (the inverted-posture gate)
*The public site exposes; it must never be able to mutate or hold a key.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S6.1 | **No service-role key, no API secret, no privileged credential** in the client bundle, the repo, or any client-reachable place. Secrets live only in edge-function env. | Grep repo + bundle. | IMPL | GATE |
| S6.2 | **No writes into a hub or any foreign system** from the public site. Forms post to an edge function that *only* sends mail or hits a newsletter API; they never write hub tables. | Function sources. | IMPL | GATE |
| S6.3 | Edge functions used by the site (contact, newsletter) validate input and do nothing privileged beyond their single declared job; no service-role data access. | Function sources. | IMPL | GATE |
| S6.4 | **The one read-pipe doorway (if S5.2 applies):** a single anon-safe **read-only** view or read-only edge function serving only the published, public-meant fields. RLS is on any exposed view. Nothing else is reachable. Declared as a bridge (KT↔SK discipline); the audit checks the one doorway. | Read-pipe spec + view DDL. | IMPL | GATE |

**The functions are Supabase Edge Functions in the shared `AISmith-functions` project.**
Contact (Resend), newsletter (Brevo), and the Google Places facts key (if used) all run
there; **`AISmith-functions` never holds a table**, so a site reaches it by plain `fetch`
and stores nothing. Keys live in **Supabase secrets**, never in the bundle.

**The standard contact function (ships hardened or not at all).** A public email endpoint
is an open relay if naive, so the one shared `contact` function carries all of the
following from its first deploy — these are requirements, not later hardening:

- **One shared function** serving every site; onboarding a site is **config, not a fork**
  (add its origin + destination to configuration).
- **Origin allowlist (also the CORS control).** The request `Origin` is checked against a
  configured allowlist of permitted site domains; reject otherwise. **No wildcard origin.**
- **Fixed per-site destination, resolved server-side** from a configured origin→destination
  map. The "to" address is **never** taken from the request body. (This is the line between
  a contact form and a spam relay.)
- **Honeypot field + per-origin rate limiting.**
- **Public (`--no-verify-jwt`), secret server-side.** `RESEND_API_KEY` in Supabase secrets,
  never in any front end. The front end POSTs `{name, email, message, honeypot}` by `fetch`
  to `…/functions/v1/contact` and ships **no DB client**.
- **Stores nothing** — no table, ever (preserves the gate).

Edge functions **deploy from the repo** via the hub deploy pipe (`functions deploy` on merge)
or the Supabase CLI — never by manual Studio paste — then verify the live function source (the
same recurring trap as the hubs). The audit greps the bundle for any key and confirms the functions are the only
server-side path.

### S7 — SSR / SEO + accessibility & performance baseline
*Public surface = discoverable and usable by everyone.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S7.1 | Per-route **`<title>` + meta description**, Open Graph/Twitter tags, a **sitemap**, and content routes server-rendered/prerendered (not client-only). **Template requirement:** the seed *ships* a `head()` on every content route plus `public/sitemap.xml` and `public/robots.txt`, so the agent copies them rather than writing SEO from scratch. The first dry run found these absent and the agent had to author per-route meta in-register; the seed must carry them. | Repo (route `head()` present on every route). | IMPL | IMPORTANT |
| S7.2 | Semantic landmarks and heading order, **`lang` hard-set in the app shell** (not left to the scaffold default), images carry `alt`, nav and interactive modules are keyboard-operable, a skip-link exists. **WCAG 2.1 AA.** A framework error-fallback that returns an `<html>` string as a `Response` is **not** a second document shell -- do not flag it under the one-shell check. **The exemption is bounded and does not travel:** it covers a fallback that is unreachable on any successful render, ships no site copy and no navigation, and exists because the framework needs a response before the shell is available (the scaffold's `src/lib/error-page.ts` is the instance). **A second shell that renders any page a visitor can reach is NOT exempt, whatever it is named.** | Repo. | IMPL | IMPORTANT |
| S7.3 | **Lighthouse ≥ 85** (Performance, Accessibility, Best Practices, SEO) on the deployed site. | CI / report. | ADDITIVE | ADDITIVE |
| S7.4 | **Every site ships a privacy notice.** A `/privacy` route renders the core `PrivacyNotice` from `site.config.privacy`, and the footer carries a privacy link (`SiteFooter legalLinks`; `Privacybeleid` / `Privacy`). The notice reflects the site's **actual** data flows -- controller identity and the **enabled** subprocessors (host, contact→Resend, newsletter→Brevo, `Map`→Google, **and the site's own hub**) -- from the manifest `legal` block, **never** generic boilerplate. Required because the spine ships personal-data processing (forms, logs, map) the moment a site is live (GDPR Art. 13). Bilingual **NL + EN** (the fleet's two languages), set via the manifest `legal.lang`. A cookie-consent banner is a **separate, conditional** layer (only sites with a tracking stack); the facade (S3.5) keeps the default cookieless. **S7.4a, new at 1.8.11: THE NOTICE MUST DESCRIBE WHAT THE FORMS ACTUALLY COLLECT.** A processing description that understates the data a shipped form gathers is not a copy defect, it is a factual misstatement to data subjects about the categories processed. Where a form is configurable, the notice takes the same configuration -- **the two must not carry opposite defaults for one fact.** Live and fleet-wide when found: `forms.tsx:69` defaults `NewsletterForm` to `withName = true` and posts `data.name` at `:78`, while `legal.tsx:42` (NL) and `:72` (EN) hardcode "we process your email address" with **no prop to correct it**, so every site on the default form told users it collected less than it did. Found on zuidgeluid.be by reading the DEPLOYED page, which also showed two complete privacy policies rendered back to back -- the hand-written one and the spine one -- each with its own h1 and date, disagreeing with each other on exactly this clause. | Repo (route + footer link) / manifest `legal`. **If the site declares an S10 pipe, the storage origin serving its artefacts appears in the subprocessor list.** | IMPL | IMPORTANT |

### S8 — Content model, deploy target & ownership
*Declared editing model, fleet deploy, and a clean §8 transfer unit.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S8.1 | **Content-editing model declared** in the charter — exactly one of: static-in-repo / hub edit-flow / headless CMS. Default = static-in-repo. | Charter. | IF | IMPORTANT |
| S8.2 | **Deploy: Netlify (Pro plan)** — a static/prerendered front end (SSG all routes, so view-source carries per-route meta and the output is host-portable), custom domain via CNAME/ALIAS to Netlify, automatic SSL; demo subdomains under `demos.aismith.io` (delegated to Netlify DNS by NS records). **Server-side runtime target = Supabase Edge Functions** in the shared `AISmith-functions` project, connected from the start (demo and production alike) — Netlify hosts the front end only, no server logic. The demo↔production difference is configuration only: a `noindex` toggle + the domain — no backend change, since the contact form is wired to the shared project from day one. No host exceptions remain (SK migrated off Lovable publish onto Netlify 29 Jun 2026; ZG live on Netlify). Per the fleet host model. | Deploy config / `as-fleet-organisation.md` §7. | IMPL | IMPORTANT |
| S8.3 | The public site is **its own §8 transfer unit**, transferable independently of the hub: own repo + own host, plus — for a **stateless** site — a one-time **free port** of its functions off `AISmith-functions` to a fresh account (free, no data to move), or — for a **stateful** site — its own Supabase project. "Your whole presence, yours to keep" holds for the site as a standalone artifact. | Repo / charter. | IF | IMPORTANT |
| S8.4 | **Undeclared integrations.** The charter and any read-pipe spec reflect what is actually shipped -- an integration named in the charter but wired nowhere, or wired but undeclared, is a docs-vs-deploy divergence. | Charter vs repo. | IMPL | ADDITIVE |
| S8.4a | **Charter <-> repo ROUTES reconcile, both directions.** The charter declares every public route in ONE fenced ` ```routes ` block, one per line, slash-prefixed, `/` for the index; nothing outside that block is read as a declaration. A repo route absent from the block is an **orphan** -- a live, indexable page nobody declared. A declared route with no file is a **retirement that was never finished**. **SPLIT OUT OF S8.4 AND PROMOTED at 1.8.8 (operator ruling):** the two halves are different risk classes, and one row scored at the gentler of them meant the routes half could never gate. An undeclared public page is not the same kind of defect as an integration line that is out of date. | Charter ` ```routes ` block vs `src/routes/*.tsx`, both directions (`verify` [5]). | IMPL | **GATE** |
| S8.5 | **A contract version does not claim checker behaviour its SHIP PATH has not released.** The seed ships `verify.mjs` and the charter pins the SEED sha (§8), so a rubric row whose verify-by names a checker capability is satisfiable only once that capability exists at a seed commit a site can pin. Fold the rule and release the checker in the same wave, or state the row's verify-by as human review until the seed catches up. **A site that holds the older checker is CONFORMANT to the contract it can actually run**, and its green says nothing about the rows added since; the gap is the Factory's finding, never the site's. A site MUST NOT close it by copying the Factory's working file directly, because that leaves the charter pin naming a commit which does not contain the checked-in gate, which is a worse defect than the staleness. Raise it instead. | The `verify.mjs` sha held by the seed and by every registered site, against the Factory's working copy. Equal, or a named open finding at the Factory. | IMPL | **GATE** |

### S9 — Voice & copy (the public register)
*Public copy reads as written by the client, not by an AI; no hype. This is the **voice
layer** of the same spine/skin/content model: the **rule** is spine, the **register** is
skin (declared in the charter, like the palette), the **copy** is content. Governed by
`as-relationship-playbook.md` Part A Principle 9 — incorporated here, not run separately.*

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S9.1 | **Zero prose em-dashes** in shipped copy. Two thoughts = two sentences; asides off with commas. Keep "—" only for a quote attribution or a date range. The em-dash is the AI tell that reads as "fake" to the exact buyers we want — fatal on an AI company's own site above all. | Rendered routes (`grep -o "—"` the built copy; code comments exempt). | IMPL | GATE |
| S9.2 | **No superlatives, hype, or invented taglines** on plain content (*unique, magical, transform, world-class, revolutionary, unforgettable*). Show, don't tell: every claim sits next to a concrete fact. | Rendered copy. | IF | IMPORTANT |
| S9.3 | The site's **voice register is declared in the charter** (like the palette) and the copy matches it. AS = the quiet-plain English of `as-hub-positioning.md` §13; a ZG-style site = its own per-client register (`as-relationship-playbook.md` Part C). | Charter vs copy. | IF | IMPORTANT |
| S9.4 | Code comments, build files, and internal docs are **exempt** — the gate is on what a visitor reads, not the source. | n/a | IMPL | ADDITIVE |
| S9.5 | **A checker's severity tracks its rubric row.** `verify.mjs` fails the build only where the row it implements is GATE; an IMPORTANT or ADDITIVE row is REPORTED and carried in the manifest, never build-blocking. New at 1.8.8, from two live instances that resolved in OPPOSITE directions, which is the point -- the rule forces the question, it does not presume the answer. The superlative check implements S9.2 (**IMPORTANT**) and was hard-failing CI: the CHECKER gave way, and it is now `review`. The charter route reconciliation was hard-failing on S8.4 (**ADDITIVE**): there the ROW gave way, split to **S8.4a GATE** by operator ruling, because an undeclared public page is a real gate-class defect that had been filed behind a gentler half. Either the checker is too strict or the row is too soft, and both are cheap to fix once the mismatch is visible. aismith.io could not arm its gate for weeks because neither was. The three severities in the checker are `bad` (proven violation), `soft` (could not verify -- fails closed in CI) and `review` (a human should look -- never fails). A check whose message asks for judgement can only ever block in CI, where there is no human. | `agents/site/verify.mjs` severity vs this table. | IMPL | IMPORTANT |

---

### S10 — Build-time hub data (optional module, #139)

*A site MAY consume its own fleet member's hub at build time only; runtime reads from the
hub are out of scope for a prerendered site.* Declared in the charter (read-pipe spec,
§3.3). Reference implementation: `zuidgeluid-hub#105` + `zuidgeluid-site#9`.

| # | Assertion | Source | Tag | Sev |
|---|---|---|---|---|
| S10.0 | **An S10 pipe is DECLARED in the charter.** A site that reads any hub-fed data names the pipe, its doorway, its timing (build-time or runtime), the fields it publishes, the routes it renders on, and what happens when the read fails. Without this row an undeclared pipe becomes a finding only by inheriting S5.2, which is how one shipped under a charter that actively denied it: **the charter obligation belongs with the module that creates it, not with a general rule two sections away that happens to catch it.** | Charter S10 block vs the fetch/read code. | IMPL | **GATE** |
| S10.1 | **Publication is explicit.** The hub exposes only rows carrying an explicit publish flag defaulting to false. A site feed MUST NOT derive publication from a row's existence, its active flag, or its dates. | Hub feed fn. | IMPL | GATE |
| S10.2 | **Public copy is a separate field.** The feed publishes a field written for the public and MUST NOT fall back to an internal description field when it is empty (the fallback was the originating bug: staff notes in a public flyer slot). | Hub feed fn. | IMPL | GATE |
| S10.3 | **The feed names its columns.** The public feed function selects columns explicitly; `select("*")` is a GATE breach -- it publishes every column added later. | Hub feed fn. | IMPL | GATE |
| S10.4 | **Public artefacts are copied, not signed.** An artefact shown on the site is copied into a public bucket at publication and removed on unpublication. Signed URLs from a private bucket MUST NOT be baked into prerendered HTML (they expire before the first visitor). | Hub + build. | IMPL | GATE |
| S10.5 | **The build degrades, never fails or blanks.** The fetch step keeps a committed snapshot; any failure (network, timeout, non-200, non-JSON, wrong shape) leaves the snapshot in place and exits 0. It MUST NOT write an empty feed and MUST NOT fail the build. | Build script. | IMPL | IMPORTANT |
| S10.6 | **Rebuild is best-effort.** The hub triggers the site build on publication; a failed trigger does not fail the publication -- the state is already correct and the next build collects it. | Hub. | IMPL | ADDITIVE |

The hub-side half (one anon-readable, explicitly-projected feed) is noted in
`as-hub-spine-standard.md` (C8 storage/feed note).

## 5. Output artifact 1 — conformance manifest (JSON)

```json
{
  "site": "",
  "audited_at": "",
  "stack": "tanstack-start-ssr | vite-spa-legacy",
  "separate_app_from_hub": true,
  "skin": { "tokens_complete": true, "semantic_only": true, "aa_pairs_pass": true,
            "raw_hex_in_components": [] },
  "data_posture": "no-db | db-declared | hub-read-pipe",
  "site_supabase": "shared-functions | dedicated-db | none",
  "builder_backend_provisioned": false,
  "read_pipe": { "present": false, "doorway": "", "fields": [], "bridge_declared": false,
                 "rls_on_view": null },
  "secrets_writes": { "secret_in_bundle": false, "writes_to_foreign_system": false,
                      "service_role_present": false },
  "components": { "core_present": [], "core_missing": [], "optional_enabled": [],
                  "bespoke_css_found": [] },
  "seo_a11y": { "per_route_meta": true, "sitemap": true, "ssr_content": true,
                "wcag_aa": null, "lighthouse": null },
  "voice": { "prose_em_dashes": 0, "superlatives": [], "register_declared": true,
             "matches_register": true },
  "content_model": "static-in-repo | hub-edit-flow | headless-cms",
  "host": "netlify",
  "noindex": false,
  "deploy_target": "netlify",
  "server_runtime": "supabase-edge-functions | none",
  "transfer_unit_clean": true,
  "findings": { "gate_fail": [], "important_fail": [], "additive_fail": [] },
  "variance_noted": []
}
```

`builder_backend_provisioned` records an **actual provisioned data surface** (a DB
client in the bundle, real tables, or DB env keys), not whether the Lovable Cloud
capability flag is on, and not the shared `AISmith-functions` backbone (which holds no
tables and ships no client; its third-party keys live server-side in Supabase secrets).
The flag being enabled-in-chat on a `no-db` site is not a finding; a provisioned data
backend behind one — crossing the statelessness gate without recording `dedicated-db` —
is a GATE fail (S5.4).

## 6. Output artifact 2 — human conformance summary

1. **One-line verdict** — e.g. "Conformant" / "Conformant except N gate items" /
   "Trustworthy for fleet: yes/no."
2. **Contract scorecard** — one row per contract S1–S9: PASS / PARTIAL / FAIL + a
   one-line reason.
3. **Gate fails first**, then important, then additive. Each with the smallest fix.
4. **Variance noted** (skin, modules, page order) — explicitly *not* findings.

The auditor proposes a remediation list and **stops**.

---

## 7. When a FAIL might mean the standard is wrong, not the site

Route every fail to one of two channels — fix the site, or amend the standard. Amend
only when honoring the contract would cost real fit for a legitimate business. Likely
candidates as the spine matures:

- A genuinely **content-heavy, daily-self-edited** public site may justify staying on
  WordPress with the hub behind it (blueprint §1B rule 3). That is not an S1 fail — it
  is *out of scope for this spine*; record it and stop. This spine governs greenfield /
  content-light sites built on the hub stack.
- A site that legitimately must surface rich live hub data may need a **second** read-
  pipe doorway. Don't silently pass two — propose a standard amendment (§ S6.4 currently
  says "one").

Never silently pass a gate fail.

---

## 8. The site template seed & the WordPress-strip note

**Public Site — TEMPLATE** (the manufacturable archetype; sibling to "Hub — TEMPLATE"):

```
/src/routes/__root.tsx        SiteHeader + SiteFooter + Chrome; <head> meta defaults; lang set
/src/routes/*.tsx             content routes (index, per-vertical, ownership, plans, …),
                              each with a head() carrying per-route title/description/OG (S7.1)
/src/components/spine/        the library — NEVER edited per site (S3.2)
/src/styles/tokens.css        THE skin — the only style file edited per site (S2)
/src/styles/spine.css         structure — token-only; NEVER edited per site
/src/content/site.config.tsx  nav, footer, socials, legal, integrations (.tsx: holds the inline logo SVG)
/src/content/*.tsx            per-page Section composition + copy (flat: home.tsx, restaurants.tsx, …)
/public/sitemap.xml, robots.txt   shipped by the template (S7.1)
/public/                      images; fonts (self-hosted)
/agents/site/verify.mjs       the Section-6 gate, committed (S6 / v0.13.0)
/.github/workflows/site-verify.yml   the gate's CI binding -- SHIPPED BY THE SEED,
                              never authored per site (v0.13.4, contract patch #155)
/functions/                   contact→Resend (on by default), newsletter→Brevo (off by default)
                              as Supabase Edge Functions deployed to the shared AISmith-functions
                              project; secrets in Supabase secrets only; the site's origin +
                              destination are registered in the function's config, not the front end
```

A new site = clone seed → edit `tokens.css` → fill `site.config.tsx` + `content/*.tsx` →
choose optional modules. No spine file is touched.

**The gate's CI binding ships with the gate (v0.13.4, contract patch #155, raised by AS).**
`verify.mjs` cannot run in CI on any site repo with default credentials: it needs
`--seed <checkout of AISmithFactory/aismith-site-seed at the charter-pinned sha>`, that repo is
**private**, and a workflow's `GITHUB_TOKEN` is scoped to the calling repo, so `actions/checkout`
on the seed returns `Repository not found` before a single assertion runs. The build agent's
"keep a pristine clone as the baseline" is free on a dev machine and impossible on a runner, so
the contract has been heading for a **required check whose credential does not exist**. Three
rules close it, and the third is the one that matters:

1. **The seed ships `.github/workflows/site-verify.yml`**, as it already ships `verify.mjs`.
   Same rationale as S7.1's *the seed must carry them*: the first dry run proved authors should
   copy this, not write it. `site-contract` now **stamps** the workflow (it previously stamped no
   workflow at all, while `hub-contract` stamps `hub-deploy.yml` -- that asymmetry is why every
   site author wrote this from scratch and why the first thing each wrote failed).

   **The stamp is a FLOOR, not byte-identity (v0.13.5, corrected).** `hub-contract` can stamp
   `hub-deploy.yml` as an exact artifact because hubs are uniform; **sites are not.** ZG's gate
   legitimately passes `--charter zuidgeluid-site-charter.md` and adds an SSG view-source check for
   its own prerendered copy; AS names the file `verify.yml` and pins its own `SEED_SHA`. Demanding
   byte-identity would force each site to delete real, correct, site-specific behaviour in order to
   conform. Conformance is therefore on the **assertions**, not the bytes. A site's workflow must:
   - check out the seed **at the FULL 40-character sha the charter pins** -- never a moving ref
     such as `main` (a floating baseline re-baselines the gate whenever the seed moves, so it can
     go green against a spine it was never meant to prove) and never an **abbreviated** sha
     (`actions/checkout` fetches the ref directly and fails with a bare
     `git failed with exit code 1`, which reads as infrastructure rather than as a bad pin --
     `aismith-site` carried a 7-character pin from the day its gate was written and nobody found
     out, because the gate had never once run);
   - **build before typechecking**, where the route tree is generated rather than committed: a
     bare `tsc --noEmit` on a fresh checkout of a site that gitignores `src/routeTree.gen.ts`
     collapses every route type to `undefined` and fails on correct code;
   - run `verify.mjs` with **both `--seed` and `--ci`**, and never drop either to go green;
   - treat an unreachable seed as a **visible skip or a hard fail**, never a pass;
   - **assert that the checker it HOLDS equals the checker at the pinned `SEED_REF`, and FAIL CLOSED when it does not**, naming the held and the pinned line counts in the failure. A workflow that claims a resync it did not perform is green evidence of nothing: measured 2026-09-18, `aismith-site` and `zuidgeluid-site` both held a 710-line `agents/site/verify.mjs`, the checker the gate runs, against a pinned 963 while their workflows said resynced. **THE DECLARATION IS WHAT THE FAILURE PRINTS AND IS NOT AN ALTERNATIVE EXIT**: a divergent hold can never report green;
   - run `tsc` + `build` regardless.
   Anything beyond that -- extra steps, a different filename, site-local copy checks -- is
   **permitted and not a deviation**. The stamped template is the reference implementation a new
   site copies; it is not a byte-for-byte conformance target.

2. **RESOLVED 2026-08-01: the seed is PUBLIC, so no credential is required.**
   `AISmithFactory/aismith-site-seed` was published (operator ruling) after a clean review: no
   secrets in the tree, none anywhere in its eight commits of history, and the only client names
   in it -- Simone's Kitchen, Zuidgeluid, Know Thyself -- already published verbatim on aismith.io.
   `actions/checkout` on a public repo needs no token, so **every site repo, current and future,
   runs the gate with the default `GITHUB_TOKEN` and zero configuration**, and the trainee org can
   clone the seed with no grant at all. This deletes a credential class rather than managing it:
   `SEED_READ_TOKEN` was a PAT expiring July 2027, a standing register row, a rotation obligation,
   and a thing every new org would have had to be given. If a future seed is private the token path
   returns as an IF-IMPL variant, but the assertion stays on seed REACHABILITY, never on a secret
   being set (rule 3).


3. **Assert seed REACHABILITY, never credential presence -- and never fake green.** The gate's job
   is "was the spine proved against the pinned seed". A workflow that fails, or skips, because a
   *secret* is unset asserts the wrong thing: it goes red on a healthy repo the day the seed becomes
   public, and stays unarmed on a repo that could have run it. Both happened -- ZG hard-errors when
   `SEED_READ_TOKEN` is empty and AS arms the spine steps only when it is set, so on 2026-08-01 the
   seed was public and reachable by anyone while both gates still turned on a credential. Check
   that the seed CHECKED OUT. With no seed access the verify
   steps skip with a warning annotation while `tsc` + `build` still run; it **must never drop
   `--seed` or `--ci` to go green.** That is the whole point: `verify.mjs` fails closed by design,
   so an author under time pressure reaches for exactly the two edits that convert a fail-closed
   gate into a no-op reporting green. A gap that makes the safe path impossible and the unsafe
   path easy is closed at the contract, not per site.

4. **THE SEED'S OWN CARVE-OUT IS THE SEED'S ROLE AND NO SITE'S (site-contract 1.8.25).**
   `agents/audit/site/verify.mjs` turns gates **[1a]** and **[1b]** from GATES into REVIEW when
   `GITHUB_REPOSITORY` equals `SEED_REPO`, and the signal is the workflow's own env, so it costs no
   argument and no change to the stamped template. **That carve-out is correct FOR THE SEED**: [1a]
   and [1b] measure a site's spine against the pinned seed, and the seed has no external baseline to
   be measured against. **IT IS WRONG FOR EVERY OTHER REPO, AND A SITE WHOSE `SEED_REPO` NAMES ITS
   OWN REPOSITORY HAS DISABLED TWO SPINE GATES** while its workflow still reports green: the two
   sections print REVIEW instead of failing, which is precisely the fail-closed-to-no-op conversion
   rule 3 above exists to stop, reached by a copied env line rather than by a dropped flag. A site's
   `SEED_REPO` names `AISmithFactory/aismith-site-seed` and never itself. **The ASSERTION half of
   this is S6's and is not written here**; what this section owes a site author is the fact.

No spine file is touched. **Step 0, before the first build
prompt:** set the backend posture (S5.4) — **connect the site to the shared
`AISmith-functions` project** (never Lovable Cloud), registering the site's origin +
contact destination in the **function's** config; on a stateless (`no-db`) site request no
DB/auth/storage feature, provision no managed backend (no Lovable Cloud or other
auto-provisioned data surface), and verify the bundle ships no DB client. **The
statelessness gate:** a site that must store data stops and provisions its **own** new
account first (separate from the shared project and from any hub), then builds. An
anon-view read-pipe instead connects the hub's existing project, read-only.

**Realised.** The AI Smith instance ships as `aismith-site-seed` (the first worked seed):
tokens valued Ink/Paper/Ember, all six pages composed and voice-gate-clean, no optional
modules. It is the dry-run target and the reference any second site is cloned from. The seed
now lives in project knowledge as two markdown docs — `as-site-seed-spine.md` (the frozen
layer: `spine.css` + the components, copied verbatim) and `as-site-seed-instance.md` (the
reskinnable AS instance) — so a build reads the seed without re-uploading the zip; rezip the
union of both docs to regenerate `aismith-site-seed.zip`.

**What does NOT carry over from a WordPress source (e.g. ZG).** When porting a proven WP
build, delete all CMS-survival scaffolding — it is plumbing, never structure: the
`#masthead` hide, the `.entry-content` / `.content-container` full-width resets, the
`100vw` full-bleed margins, Kadence edge-padding overrides, every Fluent Forms
`!important` override, the WPCode-snippet packaging, and the path-string highlight
script (the router supplies active state). Authoring agent-direct in a fresh repo, you own
the document, so the container-vs-bleed fight that produced roughly a third of the ZG CSS
simply does not exist. Carry over the **tokens, the component grammar, and the section/card/CTA/form
shapes** — nothing else.

---

## 9. The per-site charter (`<site>-site-charter.md`)

Mirrors the hub charter. Declares, for one site:

- **Skin** — the token values (the Appendix-A set, filled) + fonts.
- **Voice register** — the site's public voice, declared like the palette (S9.3): AS = the
  quiet-plain English of `as-hub-positioning.md` §13; a ZG-style site = its own register
  per `as-relationship-playbook.md` Part C. Plus the standing rule: no prose em-dashes, no
  superlatives (S9.1/S9.2).
- **Content model** — static-in-repo / hub edit-flow / headless CMS (S8.1).
- **Data posture** — no-db (default; connects the shared `AISmith-functions` backbone) /
  db-declared (its own provisioned project, past the statelessness gate) / hub-read-pipe;
  if a read-pipe, the doorway spec + bridge declaration (S5, S6.4).
- **Optional modules enabled** (S3.3).
- **Integrations** — contact (Resend), newsletter (Brevo/Buffer), bookings (Cal.com),
  payments if any (Mollie/Stripe) — each declared, none holding a client-side secret;
  server-side calls run as Supabase Edge Functions (S6).
- **Host & runtime** (S8.2): **Netlify (Pro)** + **Supabase Edge Functions**
  (the shared `AISmith-functions` project for a stateless site; its own for a stateful one);
  custom domain via CNAME/ALIAS to Netlify; `noindex` state recorded. (No host exceptions
  remain — SK migrated off Lovable publish onto Netlify on 29 Jun 2026.)
- **§8 transfer unit** (S8.3): for a **stateless** site, the **Netlify site + a
  one-time free port of its functions off `AISmith-functions` to a fresh account** (repo,
  Netlify site, domain; free, no data to move); for a **stateful** site, that plus its
  **own Supabase project** — the client's to keep, transferable independently of any hub.

---

## Appendix A — the fixed semantic token set

Same names on every site; only values change. Two worked skins prove it.

| Token | Role | ZG (music VZW) | AI Smith (forge) |
|---|---|---|---|
| `--bg` | Page background | `#FBEFE2` | `#F8F5EF` (Paper) |
| `--bg-alt` | Alternating section bg | `#FFFFFF` | `#E7E1D7` (Mist) |
| `--surface` | Card / panel bg | `#FCEBF0` | `#FFFFFF` / Mist |
| `--text` | Primary text | `#213847` | `#1E1D1B` (Iron) |
| `--text-soft` | Secondary text | `#4C5E6A` | `#6E6760` (Anvil) |
| `--line` | Borders / dividers | `rgba(33,56,71,.12)` | `rgba(30,29,27,.12)` |
| `--line-input` | Form-field edge; clears 3.0 against the field and every card ground (WCAG 1.4.11), falling back to `--text-soft` (R121, site-contract 1.8.31) | not yet declared (falls back until its resync) | `rgba(30,29,27,.55)` |
| `--action` | Primary CTA fill (white text) | `#2F8A2C` (green-dp) | `#9E4E1E` (Ember Deep) |
| `--action-strong` | Pressed / chunky shadow | `#1E661F` (green-dk) | darker Ember |
| `--accent` | The one expressive accent (fills, large display, on-dark) | `#E5217E` (magenta) | `#C0632E` (Ember) |
| `--accent-text` | Accent used **as text on light** (AA-safe) | `#C0156A` (magenta-dp) | `#9E4E1E` (Ember Deep) |
| `--highlight` | Secondary accent / on-dark glow | `#E6B23C` (mustard) | Ember on Iron |
| `--on-dark` | Text on dark/accent sections | `#FBEFE2` | `#F8F5EF` |
| `--dark` | Institutional dark section bg (optional) | `#213847` (ink) | `#1E1D1B` / `#26302E` (Slate) |
| `--font-display` | Headlines | Hanken Grotesk | Bricolage Grotesque |
| `--font-body` | Body / UI | Hanken Grotesk | Inter |
| `--font-logo` | Wordmark (optional) | Fredoka | — |
| `--max` | Container width | `1240px` | `1240px` |
| `--gutter` | Edge padding | `clamp(20px,4.5vw,64px)` | `clamp(20px,4.5vw,64px)` |
| `--radius` / `--radius-lg` | Corner radii | `14px` / `22px` | tune to brand |
| `--shadow` / `--shadow-lg` | Elevation | per ZG | tune to brand |

**Contract rules (S2):** components reference these names only — never a raw hex, never
a colour-named token; accent-as-text uses `--accent-text`; every text/bg pair clears AA.

**Optional slots (declared only if the brand needs them):** the S4.6 hue set
(`--hue-1..5` + `--hue-N-ink`, optional `--hue-N-soft`; each pair AA-gated) and, since v0.13.2, optional **`--hue-N-text`** (hue used AS TEXT on light grounds -- the `--accent`/`--accent-text` precedent applied to the hue family; AA-gated vs `--bg`/`--bg-alt`/`--surface`, undeclared = inert);
`--card-bg` (ALL card grounds since v0.13, default `--surface`) + `--line-card`
(tile/card border tint, default `--line`); `--facade-play-bg` / `--facade-play-ink`
(video facade play button -- a media affordance, not a CTA); `--pill-dot` (PulsePill
dot); `--badge-xl` (CutBadge xl size); `--poster-lead` (EventCard poster-led width).
Undeclared = inert (every slot carries a core-token fallback in the spine).

## Appendix B — component inventory (prop contracts)

**Core (every site).**

| Component | Prop contract (realised) | Replaces (ZG) |
|---|---|---|
| `SiteHeader` | `logo, nav[], currentPath, cta, memberLink?` — active state from router | header snippet + data-match script + burger |
| `SiteFooter` | `logo, tagline?, address?, columns[], socials[]?, legal, newsletter?, legalLinks?[]{label,href}` | footer snippet |
| `Wrap` | `children, style?` — max-width + gutter | `.wrap` |
| `Section` | `tone, hue?(1–5, S4.6), pad?, id?, fx?, children` — `fx` layers deco content behind the wrap (aria-hidden) | section + `:has()` alternation |
| `Band` | `tone, eyebrow?, heading, sub?, actions?, id?, ambient?, art?` -- eyebrow renders in the `.eyebrow` role above the heading; `art` = brand illustration bleeding in from the right under a scrim in the band's own tone ground (background layer, decorative; grammar since v0.13.1) | `.cta` / `.steun` |
| `PageTitle` | `size(hero\|xl\|lg), children` — the hero `<h1>`; size from the spine scale, never inline type | (the hero `<h1>`) |
| `Display` / `SecTitle` / `Eyebrow` / `Lead` / `Em` | inline text roles; `Em` takes `hue?(1-6)` -> `--hue-N-text` (light-ground word colouring; inert when undeclared) | `.display` / `.sec-title` / `.eyebrow` / `.lead` / `.em` |
| `Btn` | `variant(action\|line\|ghost\|paper), href?, onClick?, children` -- `paper` = light fill on a dark band (`--bg` ground, `--text` ink, chunky shadow) | `.btn*` |
| `MediaCard` | `image?, alt?, category?, title, loc?, body?, href?, more?, pill?, stamp?, stampPlacement?("art"\|"seam"), pillPlacement?("art"\|"meta"), ground?("surface"\|"alt")` -- `pill` = category pill (art overlay or body meta row), `stamp` = illustration circle (inside the art, or straddling the media/body seam -- the art placement clips a negative offset by definition, #128), `loc` = short qualifier line under the title | `.card` / `.pcard` / `.songcard` / `.tmember` |
| `TierCard` | `label, price, per?, items[], cta?, hue?(1–5), icon?` — hue colours the top bar via the S4.6 slots | `.gifttier` / `.fcard` |
| `EventCard` | `poster?, posterAlt?, posterHref?, posterLead?, when, title, details?, href?` -- no `poster` ⇒ single-column `noposter`; `posterHref` opens the flyer full-size in a new tab; `posterLead` = poster-led variant at `--poster-lead` width; ground = `--card-bg`. **No card frame may `cover`-crop caller-supplied artwork of unknown aspect** (a landscape frame silently destroys a portrait flyer, #141) | `.event` |
| `StatCard` | `num, plus?, label` | `.stat` |
| `InfoCard` | `k, v` | `.bcell` / `.pfact` / `.practical` |
| `ContactForm` | `action(edge-fn), fields[], submitLabel?, done?` -- `Field.options` takes `string \| {label,value}` and `Field.placeholder` renders `<option value="" disabled>` so a required select forces a real choice (#141) → Resend | `.cform` / Fluent Forms |
| `NewsletterForm` | `action(edge-fn), withName?=true, namePlaceholder?, placeholder?, submitLabel?, done?` → contact fn signup mode -- stacked NAME + EMAIL is the fleet default (operator 2026-07-27); posts `{name, email}` | `.nl-form` / Fluent Forms |
| `PrivacyNotice` | `controller{name,email,vatId?,address?}, subprocessors[]{name,purpose,location?,link?}, effectiveDate, retention?, mapsEmbed?=false, dpoEmail?, lang?(nl\|en)=nl, dpaName?, dpaUrl?` — core legal notice (S7.4); NL + EN | (new — no ZG equivalent) |
| `Crumb` | `up?{label,href}, children` -- the breadcrumb a sub-page opens with, above its title; `up` omitted on single-segment crumbs | `.crumb` |

**Optional modules — realised.**

| Component | Prop contract (realised) | Notes |
|---|---|---|
| `Map` | `query? \| coords{lat,lng}, zoom?=15, label, caption?, cta?="Toon kaart", consented?=false` | location embed; **facade (S3.5)** — keyless Google `output=embed`, grayscale to match the ink aesthetic, loads on click |
| `Hours` | `heading?="Openingsuren", rows[]{label,value}, note?` | structured opening hours; static (no "open now" — timezone/locale is a separate opt-in) |
| `VideoFacade` | `poster, posterAlt?, yt? \| mp4?, ratio?("16/9"\|"2.35/1"), label, cta?` | **facade (S3.5)** — youtube-nocookie + `playsinline` / native `<video>` built once (one-shot guard); 2.35/1 for burned-in-subtitle masters |
| `GalleryGrid` | `categories?[]{id,label}, photos[]{src,full?,alt,cat?}, headings?, allLabel?, closeLabel?, prevLabel?, nextLabel?` | chip filter (`aria-pressed`), `hidden`+`loading="lazy"` so unshown categories never fetch; per-category heading rows; built-in Lightbox (`role="dialog"`, Escape/backdrop close, previous and next by buttons and arrow keys, focus kept in the dialog; every label a prop, English by default, so a non-English page passes its own) |
| `Marquee` | `items[], speed?=34, separator?` | ticker band; track duplicated in JSX (`aria-hidden` dupe); reduced-motion ⇒ static row; tilt from `--tilt` |
| `AudioPlayer` | `title, sub?, src, playLabel?, pauseLabel?` | native `<audio controls>`; icon mirrors state; play pauses the other cards |
| `Deco` family | `DecoStar(size?,style?)`, `Grain()`, `ZigZag(height?)`, `TiltFrame(children,flip?)`, `CutBadge(children,size?,shape?("cut"\|"ring"),label?,style?)`, `PulsePill(children)` | decorative layer — aria-hidden, inline-SVG only, dead under reduced-motion; stars hide <700px; `xl` sizes from `--badge-xl`; `ring` = plain ringed circle (a `clip-path` cannot be un-set from the instance layer) |
| `Tiles` family | `Chips`, `Chip(n,r?)`, `FactChip(k?,v)`, `Cell(k,children?)`, `DCard(t,sub?,items?,children?)`, `SkillTile(n,t,children)`, `Member(href,img,alt,name,role,more?)`, `CreditChip(n,r)`, `SectionHead(children,action?)`, `ZZDivider()` | the tile/chip grammar between "card" and "plain prose" (#122 item 3); grounds on `--card-bg`/`--line-card` |
| `Timeline` | `Timeline(children)`, `TimelineRow(when, children)` | rail + dot + display-face date + sentence; a row's emphasis stays INLINE in `children` -- never a title/details pair (#141: mapping rows onto cards duplicated the lead-in and produced 27 tiles where 27 lines belonged) |

**Optional modules (per charter, not yet realised).** `ScoreGrid`, `StepGrid`, `Team`,
`Reveal` (scroll-reveal — ships **with** its IntersectionObserver driver +
reduced-motion guard, never as orphaned CSS).

---

## Changelog

- **v0.13.16 -- 11 Oct 2026:** **THE GATE FLOOR NAMES THE CHECKER THE GATE RUNS, AND THE STANDARD TAKES THE SEED'S W13 RELEASE WHERE IT NAMES WHAT W13 MOVED** (site-contract 1.8.30 -> **1.8.31**, coupled with hub-contract 1.7.21; `prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E10). **R183**: SS8's assertion floor said `aismith-site` and `zuidgeluid-site` held a 710-line `check-canon-artifacts.mjs`, a file the seed does not hold; the 2026-09-18 measurement was of `agents/site/verify.mjs`, and the sentence now names it as the checker the gate runs (the v0.13.15 entry below keeps the old words as its record). **The W13 sentences, each read from `aismith-site-seed` at `3bd5c28` (W14's merge, which carries W13's `9118d969`)**: S4.6 declares up to SIX hue pairs and `data-hue="1..6"` (R112), and names `data-hue-tint="1..6"` as the declared way to borrow a hue as a band or tint without grounding, one custom property and never a ground or an ink (R120); `Em` takes `hue?(1-6)`; `GalleryGrid` takes `closeLabel?`, `prevLabel?` and `nextLabel?` and its lightbox moves by buttons and arrow keys with focus kept in the dialog (R123); the token table gains `--line-input`, the form-field edge that clears 3.0 against the field and every card ground, falling back to `--text-soft` (R121). No row's Tag or Sev moves. **This doc's changelog is classified for the T3 register (R167)**: thirty entries, v0.13.15 to v0.1, ALL RECORDS, no promotion owed (the v0.13.15 and v0.13.14 rules live in SS8 rule 1 and rule 4 and S3.2/S3.2a; v0.13.13's reading rule in SS1; v0.13.7's severity rule in S9.5; v0.13.4's credential-row rule in `as-client-config-standard.md`, stamped in this contract too). No em dashes.
- **v0.13.15 -- 20 Sep 2026:** **TWO CLAUSES, ONE IN THE ASSERTION FLOOR AND ONE IN S3.2a, AND NEITHER MOVES A Tag OR A Sev** (site-contract 1.8.28 -> **1.8.29**, the UNCOUPLED cut; `prompts/dispatch/plan-cut-1829-2026-09-19.md` v0.2 SS4b). **THE ASSERTION FLOOR GAINS THE HELD-CHECKER EQUALITY BULLET AND IT FAILS CLOSED** (E10a, W-A2 item (d), from `attacker-2` F7): a site's gate must assert that the checker it HOLDS equals the checker at the pinned `SEED_REF`, naming both line counts in the failure, because a workflow that claims a resync it did not perform is green evidence of nothing. Measured 2026-09-18: `aismith-site` and `zuidgeluid-site` both held a 710-line `check-canon-artifacts.mjs` against a pinned 963 while their workflows said resynced. **THE DECLARATION IS WHAT THE FAILURE PRINTS AND IS NOT AN ALTERNATIVE EXIT**, the or-structure the row shipped on 2026-09-18 having been corrected on `attacker-1` round 1 MEDIUM-12. **S3.2a STATES ITS POPULATION** (E8, row 110's E7 limb): page copy, with `src/graphics/*` outside it, so a bespoke React graphic declaring its own type is not an S3.2a violation; at 1.9.0 the GATE would otherwise have fired on 103 declarations. The sites' own `check-canon-artifacts.mjs` edits are the wave's and not this cut's. No em-dashes.
- **v0.13.14 -- 6 Sep 2026:** **TWO CLAUSES, ONE PER ROW, AND NEITHER MOVES A Tag OR A Sev.** **S3.2 STATES ITS OWN POPULATION**: a bespoke stylesheet that declares type is in S3.2's denominator and not in S3.2a's, the denominator being every stylesheet the site ships that is not `spine.css`, read whole. The 2026-08-27 S3.2a sweep correctly excluded `aismith-site`'s three type-declaring stylesheets and named them rather than widening mid-cut, and five role denominators across four documents had already bitten this track, so the boundary is stated rather than left to the next sweep to rediscover. **`src/graphics/**` IS OUT OF BOTH POPULATIONS** (operator ruling 2026-08-27, `plan-site-1824` v1.2), restated here so a standard reader meets the exclusion where the boundary is. **SS8 GAINS A FOURTH RULE: THE SEED'S verify CARVE-OUT IS THE SEED'S ROLE AND NO SITE'S.** `verify.mjs` turns [1a] and [1b] from GATES into REVIEW when `GITHUB_REPOSITORY` equals `SEED_REPO`, which is right for the seed and wrong for every other repo: a site whose `SEED_REPO` names its own repository has disabled two spine gates while its workflow still reports green, the same fail-closed-to-no-op conversion rule 3 already closes, reached by a copied env line rather than a dropped flag. The ASSERTION half stays S6's and is not written here. Rides **site-contract 1.8.24 -> 1.8.25**. Per `prompts/dispatch/plan-cut-1655-2026-09-06.md` v0.4 SS4 (E9a, E9b). No em-dashes.
- **v0.13.13 -- 3 August 2026:** **the load-bearing-example reading rule, and the row that earned it
  on the site side** (site-contract 1.8.13 -> **1.8.14**). New paragraph in §2: an `e.g.` inside
  descriptive prose is illustrative, but an `e.g.` inside an **exemption, a permission or a scope
  test becomes the rule**, because the only thing a reader has to reason from is the instance in
  front of them and every case they meet will resemble it. The fleet had lost this four times by
  that date. **S7.2 was the site instance.** Its second-document-shell exemption read "(e.g. the
  scaffold's `src/lib/error-page.ts`)", which licensed the whole class: any second shell that
  resembled the scaffold's could claim the exemption. Rewritten to state the TEST rather than the
  instance -- the exemption covers a fallback that is unreachable on any successful render, ships
  no site copy and no navigation, and exists because the framework needs a response before the
  shell is available -- with the scaffold file named as **the instance, not the definition**, and
  the boundary stated: **a second shell that renders any page a visitor can reach is NOT exempt,
  whatever it is named.**

- **v0.13.12 -- 3 August 2026:** **S8.5 and S10.0 added; S7.4 gains the two subprocessors it had
  been silently omitting** (site-contract 1.8.12 -> **1.8.13**). **S8.5:** a contract version does
  not claim checker behaviour its ship path has not released -- raised independently by two clients
  after three contract versions described a `verify.mjs` no site could run, and **only the pair read
  as a Factory defect**. **S10.0:** an S10 pipe is DECLARED in the charter, because without the row
  an undeclared pipe became a finding only by inheriting S5.2, which is how one shipped under a
  charter that actively denied it; the charter obligation belongs with the module that creates it.
  **S7.4** now names **the site's own hub** among the enabled subprocessors, and requires that a
  site declaring an S10 pipe lists the storage origin serving its artefacts. That second clause is
  the one to read if you hold S10: **S10.4 as shipped at 1.8.0 required a cross-origin URL, so
  conforming to S10 made you violate S7.4.** Read S10 at 1.8.13 or later, never at 1.8.0.

- **v0.13.11 -- 2 August 2026:** **one unescaped `|`, and GFM discarded the rest of the row**
  (site-contract 1.8.11 -> **1.8.12**). The Appendix B `PrivacyNotice` row wrote its `lang` prop as
  `lang?(nl|en)=nl`. In a GFM table an unescaped pipe is a column separator, so every renderer took
  the row as over-arity and **dropped its tail** -- the props after `lang`, and the ZG-equivalent
  column. Escaped to `nl\|en`. This is the site-side twin of the C2.4 defect found the same day, in
  which a hub rubric row shipped **without its GATE** for its entire existence for the same reason.
  Clients read the rendered artifact, not the source, so this class is invisible to the author and
  total for the reader. `scripts/table-arity-check.sh` was added at the Factory to catch it.

- **v0.13.10 -- 2 August 2026:** **S7.4a -- the privacy notice must describe what the forms
  actually collect** (site-contract 1.8.10 -> **1.8.11**). **Two spine components shipped opposite
  defaults for one fact, and the wrong one is the legally binding one.** `forms.tsx:69` defaults
  `NewsletterForm` to `withName = true` and posts `data.name` at `:78`; `legal.tsx:42` (NL) and
  `:72` (EN) hardcode "we process your email address" **with no prop to correct it**. So every fleet
  site running the default newsletter form ships a privacy notice understating the categories it
  processes -- an Article 13 problem, not a copy nit, in the one component whose entire purpose is
  legal accuracy. Found on zuidgeluid.be by reading the **deployed** page rather than the source,
  which also revealed the site renders **two complete privacy policies back to back** -- the
  hand-written twelve-section one and the spine `PrivacyNotice`, each with its own h1 and its own
  "last updated" date -- **disagreeing with each other on exactly this clause**. The site session had
  recorded those as two separate findings and corrected both lists; reading the live page showed
  they were one fact seen twice, and that the wrong half was upstream. **Third privacy-notice
  inaccuracy in one day**, after the at-rest flyer load contradicting "nothing loads before a click"
  and aismith-site's hand-flattened subprocessor list dropping `location` and `link`. All three are
  factual claims to users, all three in the same component family, and the pattern is that the
  notice carries the most hardcoded copy of any surface while being the one where being wrong has
  legal consequence. The spine fix -- clause corrected to the default form's shape, plus a prop so
  `withName={false}` narrows it -- is a seed change and rides with the S3.2a type-role work.

- **v0.13.9 -- 2 August 2026:** **S2.3 earns its blind spot a FOURTH time, and this time it sat
  BETWEEN two rows** (site-contract 1.8.9 -> **1.8.10**). Raised by the zuidgeluid-site audit, found
  by a second independent reader after the first had already accepted `verify [2]`'s green as the
  contrast evidence. **Live at the fold on three ZG routes:** `--accent-on-dark #F1C9CD` on
  `--hue-3 #6FB2D6` = **1.55**, `--text-soft #4C5E6A` on the same = **2.89**, against 4.5. Recomputed
  Factory-side before ruling. **Every individual pair was documented and passing** -- the accent ink
  against the dark grounds, the soft ink against the light grounds, `--hue-3/-ink` at 5.24. Three
  internally consistent matrices and nothing multiplying two of them. A `Section` sets `tone` and
  `hue` independently: the ground comes from the hue, the ink still comes from the tone, so
  `tone="slate" hue={3}` is a cell in no matrix anyone was keeping. **S4.6's own words were the
  trap** -- it called tone and hue "orthogonal by construction", and they are orthogonal in the
  markup and coupled in the cascade; if they were genuinely orthogonal there would be nothing to
  check. Corrected in both rows. **The checker half is the reusable lesson:** S2.3 said "the full
  matrix" and `verify [2]` held a hardcoded list of 15 pairs. **A list cannot express a
  cross-product.** It now GENERATES, and generates only the compositions actually present in the
  markup -- a blind six-inks x five-hues product yields 19 findings on ZG where two are real, and a
  checker that fires where there is no defect trains people to ignore it, which lands in the same
  place as one that checks nothing. A site declaring no hues adds zero pairs; verified against
  aismith-site, still 15/15. Also in `[3] VOICE`: `beste` added, because `\bbest\b` does not stem
  Dutch and the superlative list is half Dutch already -- a gate whose whole job is superlatives,
  blind to the ordinary Dutch one, found by a reader rather than by itself.

- **v0.13.8 -- 2 August 2026:** **S3.2a -- a spine type role is a standalone class; a component may
  compose it but must not own it** (site-contract 1.8.8 -> **1.8.9**). Found by sweeping every inline
  `fontSize` across the two live sites and the seed, rather than by fixing the one instance the
  aismith manifest named. **The seed carries ZERO**, so the spine is sufficient for the reference
  build and this is not a "the spine is thin" finding. Both instances then reinvented the same type
  roles inline, independently, and the reason is structural: `.pill`, `.cat`, `h3`, `p` and `.loc`
  exist only inside `.media-card`, `.price` only inside `.tier-card`, `.num` only inside `.stat`.
  Compose outside those four and the role is unreachable, so you retype it by hand -- **the spine
  caused the S3.2 violation it prohibits.** Five of the seven roles the instances needed already
  existed, scoped; two are genuine additions (a display pull-quote and a display name list, both
  from `zuidgeluid-site`). ADDITIVE at introduction, **GATE at 1.9.0**. The CSS itself is a seed
  change and is not in this fold: `spine.css` must stay byte-identical between
  `as-site-seed-spine.md`, the seed repo and every site, and `verify` [1b] enforces the last of
  those three. **Method note worth keeping: the manifest reported "two places remain" and the sweep
  found nine inline sizes in that repo alone** -- the extra seven were read as covered by the
  charter's artwork variance, which is written for "marks within a drawing, not page copy" and does
  not reach `PipelineStep`, a page section built inline. An exemption read wider than it is written
  is the same class as an example read as a rule.

- **v0.13.7 -- 2 August 2026:** **both remaining `verify` blockers on aismith.io were CHECKER
  defects, not site defects** (site-contract 1.8.7 -> **1.8.8**). With [6] LOGO disputed and
  proven one on 2026-08-01, that is three of three: **the site gate has never once failed
  aismith.io for a site reason.**
  **[3] VOICE.** The superlative check calls `soft()`, which `--ci` promotes to a hard fail,
  while its own message says "review" and ships an example of an acceptable hit. In CI there is
  no human, so a check that asks for judgement can only ever block. Both live hits were false
  positives: `terms.tsx` reads "available **as best** we reasonably can", a liability hedge and
  the literal opposite of a marketing claim. Fixed with a third severity, `review()`, which never
  fails and separates "a human should look" from `soft()`'s "could not verify, fail closed"; the
  regex now excludes `as best` / `best practice` / `best effort` by context rather than dropping
  the word, so promotional uses still surface.
  **[5] CHARTER.** Supplying the charter made it fail HARDER, not pass: 11 of 12 routes came back
  as orphans. The parser scavenged every backticked lowercase token in the whole document, so it
  declared `aismith-site`, `aismith-skins`, `data-skin`, `fetch`, `forge`, `noindex` and `verify`
  as ROUTES while missing all twelve real ones, which the charter writes slash-prefixed as
  `/apps`. Its own guard, "charter declares routes none of which exist", passed only because
  `contact` happens to appear in backticks elsewhere in the prose -- **one coincidental token was
  the only thing stopping the check from admitting it had parsed nothing.** Replaced with
  declare-then-enforce: a single fenced ` ```routes ` block, nothing outside it read, and
  genuinely bidirectional, which is the half that catches a retired route still declared.
  **S8.4 SPLIT (operator ruling).** The routes half becomes **S8.4a, GATE**. An undeclared public
  route is a live, indexable page nobody signed off, and it had been filed behind an ADDITIVE
  integrations row that could never gate it. The integrations half stays ADDITIVE as S8.4.
  **New S9.5: a checker's severity tracks its rubric row.** Both fixes above were severity
  mismatches, and they resolved in OPPOSITE directions -- the checker was too strict on S9.2, the
  row too soft on S8.4 -- which is why the rule forces the question instead of presuming the
  answer. aismith.io could not arm its gate for weeks because nothing made either mismatch visible.

- **v0.13.6 -- 1 August 2026:** **correcting the [6] LOGO fold of v0.13.4, on both the reasoning
  and the code.** (a) **The stated evidence was a non-sequitur.** v0.13.4 recorded, from the AS
  manifest, that "the reference seed's own logo fails the same check" was *decisive evidence of a
  checker defect*. It is not. The seed's logo is `const Logo = <>AI<span
  className="dot">.</span>Smith</>` -- a genuine text wordmark, which [6] is **supposed** to fail
  unless `brandMark.kind='wordmark'` is declared. The seed failing was the checker working. The
  real evidence sits in `aismith-site` itself: `logo={<Logo />}` importing a component whose body
  is `<path>` geometry, which is a real image mark the checker could not see. Right conclusion,
  wrong proof, and the wrong proof was carried into canon unexamined. (b) **The fix was incomplete
  and its test confirmed the implementation rather than reality.** `resolveLocalModule` resolved
  `./` and `../` against `src/`, so `../components/Logo` imported from `src/routes/__root.tsx`
  resolved to `ROOT/components/Logo` and silently returned null. It passed its fixture only
  because the fixture used the `@/` alias -- the case the code implemented -- while every site in
  the fleet uses the relative form. Relative specifiers now resolve against the **importing
  file's** directory, and the fixture covers relative, alias and the text-wordmark true negative.
  Found by running the gate, which is the only reason it was found at all. `site-contract`
  **1.8.6**. No em-dashes.

- **v0.13.5 -- 1 August 2026:** **the workflow stamp is a FLOOR, not byte-identity** -- correcting
  a rule written hours earlier at v0.13.4 in the same session. Stamping `site-verify.yml` imported
  hub-track semantics, where `hub-deploy.yml` is adopted as an exact artifact. That works because
  hubs are uniform and **sites are not**: ZG passes `--charter zuidgeluid-site-charter.md` and adds
  an SSG view-source check for its own prerendered copy, AS names the file `verify.yml` and pins its
  own `SEED_SHA`, and both are correct. A byte-identity reading would have required each site to
  delete working, site-specific behaviour in order to conform -- a conformance rule producing worse
  software. Conformance now binds the **assertions**: seed checked out at the charter-pinned sha
  (never a moving ref), `--seed` and `--ci` both present and never dropped, an unreachable seed
  skipping visibly or failing hard but never passing, and `tsc` + `build` running regardless. Extra
  steps, extra checks and a different filename are explicitly permitted. Operator ruling
  2026-08-01. `site-contract` **1.8.6**. No em-dashes.

- **v0.13.4 -- 1 August 2026:** **the gate's CI binding, and a checker defect** (reconciliation
  v0.32; folds Factory issue **#155**, raised by AS). §8 gains `/.github/workflows/site-verify.yml`
  to the template and three rules: the seed ships the workflow, **seed read access is a named build
  prerequisite -- RESOLVED 2026-08-01 by PUBLISHING the seed** (operator ruling). The token had
  existed all along with the right permission and a July 2027 expiry, as a *repo* secret on
  `zuidgeluid-site` while the org held zero org-level secrets and `aismith-site` held none, so the
  defect was scope rather than absence. Rather than promote it, the seed was published after a clean
  review (no secrets in tree or in eight commits of history; its only client names already public
  verbatim on aismith.io), deleting the credential class instead of managing it. **Publishing did
  not finish the job**, which is the transferable part: both site workflows assert the SECRET's
  presence rather than the seed's reachability -- ZG hard-errors without it, AS leaves the spine
  steps unarmed -- so rule 3 was rewritten and both repos owe a Trigger-1 pull. And the
  shipped workflow **skips visibly and never fakes green**. The third rule is the load-bearing one:
  `verify.mjs` fails closed by design, so the two obvious unblocks for a failing seed checkout --
  dropping `--seed` or dropping `--ci` -- each turn a fail-closed gate into a no-op that reports
  green, which is precisely what verify exists to prevent. Structural, not an AS quirk: every site
  is a separate repo from the one shared seed, so the cross-repo private read hits every site on
  its first CI run, and ZG hits it the moment it wires CI (which #150 assumes it will).
  `site-contract` now **stamps** the workflow -- it previously stamped none, while `hub-contract`
  stamps `hub-deploy.yml`, and that asymmetry is why each site author wrote this from scratch.
  The stamped template also had `SEED_REPO: aismith100/site-seed`, a repo that does not exist, with
  the private-repo token line left as a comment. **Second item: verify [6] LOGO false-fails a mark
  delivered as a local component.** `isImageNode` recognised only inline JSX, an `<img>`, or an
  imported asset *file*, so aismith.io's real anvil-and-spark vector -- drawn with `currentColor`
  precisely so the header renders it Iron and the footer Paper -- classified as a text-only
  wordmark. Declaring `brandMark.kind='wordmark'` would be a false declaration and moving to
  `<img>` would break the inheritance the component exists for. Decisive evidence that this is the
  checker and not the site: **the reference seed's own logo fails the same check.** [6] now
  resolves a logo identifier to its imported local module and classifies the module's contents.
  AS kept CI knowingly red rather than silencing it (§7), which is the behaviour the rule wants.
  **Third item, and the one worth carrying forward:** `docs/credential-register.md` had recorded
  this precise failure on 2026-07-27 -- ZG's spine gate reading as a broken build for a day
  because `SEED_READ_TOKEN` had never been added -- five days before the site track re-discovered
  it as a contract patch. The register knew and the contract did not, because nothing joins them.
  A gate that depends on a credential owes a row in both, and they are one fact.
  Seed doc v0.13.4; `site-contract` **1.8.4**. No em-dashes.

- **v0.13.3 -- 31 July 2026:** `verify.mjs` **[1a] learns the sanctioned resync** (contract patch
  #150, raised by ZG). Recorded here for completeness: v0.13.3 shipped with a header note and no
  changelog entry. `site-contract` **1.8.3**.

- **v0.13.2 -- 30 July 2026:** **hue text variants folded** (#122 item 6c, the wave's last
  open ruling; operator RULED IN 2026-07-30: structurally identical to `--accent-text`,
  slots inert when undeclared, and the AA discipline is the reason it belongs in the
  spine rather than in a conversion's improvisation). Appendix A gains `--hue-N-text`;
  `Em` gains `hue?`; the S2.3 matrix now includes declared hue pairs -- and the verify
  gate FINALLY checks `--hue-N-ink` on `--hue-N`, which the standard asserted since
  v0.12.0 while no pair was in the checker's list (a standard/gate mismatch of the
  #135 class: an assertion nothing exercised). Seed doc v0.13.2; `site-contract`
  **1.8.2**. The 1.8.x wave is now fully folded -- nothing deferred remains. No em-dashes.

- **v0.13.1 -- 30 July 2026:** Band **`art`** slot folded (the half of #129 the 1.8.0
  bundle deferred; operator RULED it grammar 2026-07-30: an image-backed CTA band is a
  general marketing pattern and the scrim-over-image readability problem is worth solving
  once). Scrim keys to the band's own `--sec-bg`, so it holds on any tone; the image is a
  background layer (decorative, no alt surface). ZG deletes its `CtaBand` bridge on pull.
  Seed doc v0.13.1; `site-contract` **1.8.1**. Still open from the wave: #122 item 6c hue
  TEXT variants. No em-dashes.

- **v0.13.0 -- 30 July 2026:** **the 1.8.0 bundle** -- six ZG patches folded as ONE bump
  (Factory #122 #123 #128 #129 #139 #141; sequencing ruled at the 2026-07-30 reconcile; seed
  PR `aismith-site-seed#4`). Defect fixes: **vertical rhythm** in the frozen layer (titles/
  body/grids no longer butt together -- the FLOW_CSS bridge folded), **Marquee stacking raise**
  (later positioned sections painted over the tilted band), **MediaCard seam stamp** (the art
  placement clips a negative offset inside `overflow:hidden` by definition -- `stampPlacement=
  "seam"` renders it on the body). Additive grammar: MediaCard `loc` + meta pill + `ground`;
  EventCard `posterHref` + `posterLead` (+ the no-cover-crop rule); Band `eyebrow`; Btn
  `paper`; `Crumb` core primitive (S3.1 -- a breadcrumb is navigation, not decoration);
  **tiles** + **timeline** modules realised; CutBadge `ring` + `--badge-xl`; VideoFacade
  `labelVisible` + play-button slots; NewsletterForm **name+email default** (operator
  2026-07-27) + select placeholders; card grounds contract to `--card-bg`/`--line-card`
  (Appendix A slots extended). Gates: S2.2 gains the **undeclared-`var()` GATE line** +
  `verify.mjs` (d2) (#123 -- the silent black-render class); new **S10 build-time hub data**
  module (S10.1-S10.6: explicit publish flag, separate public copy, named columns, copied
  not signed, degrade-to-snapshot, best-effort rebuild; #139, hub-side note in the hub
  standard). Seed doc → v0.13.0; `site-contract` → **1.8.0**. ZG deletes its declared
  bridges on its Trigger-1 pull; SK conversion inherits the pack. No em-dashes.

- **v0.12.0 — 26 July 2026:** **WP-conversion component pack** (contract-patch #116, zuidgeluid
  conversion; consumed by the ZG cutover, SK next). Modules re-homed to `spine/modules/<name>.tsx`
  + co-located `<name>.css`, imported **directly** (no barrel re-export — S3.3 reworded; the
  "bundles neither" promise made true at >2 modules). Realised set += `video` (VideoFacade — S3.5
  generalised beyond Map), `gallery` (GalleryGrid + Lightbox + filter), `marquee`, `audio`
  (AudioPlayer), `deco` (DecoStar/Grain/ZigZag/TiltFrame/CutBadge/PulsePill; Section gains the
  `fx` layer, Band-`ambient` precedent). New **S4.6** bounded hue slots (`data-hue` 1–5,
  skin-declared AA pairs; tone = register, hue = brand family). Core cards: TierCard `hue`+`icon`,
  EventCard `--card-bg` + auto-`noposter`, MediaCard `pill`+`stamp` (all optional, backward
  compatible). Appendix A optional-slot note; Appendix B updated. Seed doc → v0.10.0 (modules by
  pointer); `site-contract` → **1.7.0**.

- **v0.10.0 — 23 Jun 2026:** Privacy notice made a baseline. New **S7.4** — every site ships a
  `/privacy` route (core `PrivacyNotice`) + footer `Privacybeleid` link, driven by the manifest
  `legal` block (controller + actual subprocessors), not boilerplate. Core list (S3.1) + Appendix B
  gain `PrivacyNotice`; `SiteFooter` gains `legalLinks`. Manifest schema gains a `legal` block;
  Launch checklist gains a privacy-review step. Bilingual NL + EN (manifest `legal.lang`). Cookie-consent banner stays a separate
  conditional layer; the facade (S3.5) keeps the default cookieless. `site-contract` → v1.5.0; seed spine → v0.11.0;
  seed instance → v0.10.0.
- **v0.9.3 — 23 Jun 2026:** First optional modules **realised** (were declared-only; sites
  hand-rolled them — e.g. Cafe Kamiel's map). **S3.3** records the modules home
  (`spine/modules.tsx` + co-located `modules.css`); new **S3.5** mandates the **facade
  pattern** for third-party embeds (no third-party request/cookie before user action).
  Appendix B gains realised prop contracts for **`Map`** (keyless `output=embed`, click-to-load)
  and **`Hours`** (structured, static). `site-contract` → v1.4.0; seed spine → v0.10.0.
- **v0.9.2 — 23 Jun 2026:** CTA-button contrast fix folded in (live-build feedback: outline
  and filled CTAs in dark banners read dark-on-dark, popping only on hover). New **S4.5** pins
  per-tone button contrast — `.btn-line` resolves to section ink, `.btn-action` gains a
  section-ink separation ring on dark/slate/accent grounds. Frozen-layer fix in the seed spine,
  no new per-site token. `site-contract` bumped to v1.3.1.
- **v0.9.1 — 22 Jun 2026:** Reconciliation with the repo build (resolves the same-version
  fork): **tone-map retained in `spine.css`** (S2.2 re-asserted), not `tokens.css`; the F-fold
  S8.2 (Netlify) from v0.9 is kept.
- **v0.9 — 22 Jun 2026:** Folded proposal item **F** (host model). **S8.2** rewritten — deploy
  target is **Netlify (Pro)** instead of Lovable publish: custom domain via CNAME/ALIAS to
  Netlify, demo subdomains under `demos.aismith.io` (Netlify-DNS-delegated by NS records);
  Netlify hosts the front end only. The **charter Host & runtime + §8 transfer-unit summaries**
  now read Netlify in place of the Lovable front end. SK is the parked Lovable-publish legacy
  exception; ZG is the staged migration target. Server-side runtime (Supabase Edge Functions)
  and the statelessness gate unchanged.
- **v0.8 — 18 Jun 2026:** Functions backbone settled (folded from `as-host-model-addendum.md`,
  superseding the per-site-Supabase half of v0.7). **S5.4** rewritten — Step 0 **connects** the
  site to the shared `AISmith-functions` project (AS org, Pro, eu-central-1, ref noted); **no
  per-site provisioning** for a stateless site, and the shared project **never holds a table**.
  **Statelessness is the only gate:** a site that must store data stops and provisions its
  **own** new account first (separate from the shared project and any hub), recorded
  `dedicated-db`. **S5.1** keeps `no-db` = "stores nothing" but points the functions reference at
  the shared backbone. **S6** rewritten with the **standard hardened contact function** spec (one
  shared function, origin allowlist = CORS with no wildcard, server-side fixed destination from an
  origin→destination map never the request body, honeypot + per-origin rate-limit,
  public/`--no-verify-jwt`, `RESEND_API_KEY` in secrets, no table). **S8.2** — runtime is the
  shared project, connected from the start; demo↔production is `noindex` + domain only (no backend
  change). **S8.3** transfer unit covers the stateless free-port + the stateful own-project paths.
  **Manifest** `site_supabase` enum → `shared-functions | dedicated-db | none`; a stateless site =
  `shared-functions`. **§8 seed Step-0** + the `/functions/` layout note updated (contact on by
  default, deployed to the shared project, registered in the function config). **Charter §9** data
  posture, host & runtime, and §8 transfer unit updated. The default contact is now the function
  form, not mailto; newsletter off by default. *(19 Jun follow-up, no contract change: the seed
  was externalised to project knowledge as `as-site-seed-spine.md` + `as-site-seed-instance.md`;
  the seed itself stays v0.7, so its Step-0/contact prose still reads in the older per-site
  register pending the queued seed pass — this doc's S5.4/S6 remain authoritative.)*
- **v0.7 — 18 Jun 2026:** Fleet host model settled (folded from `as-host-model-patch.md`).
  **S8.2** rewritten — deploy is **Lovable publish (Business)**; server-side runtime target
  = **Supabase Edge Functions**; the CI-to-Cloudflare/Netlify graduation is retired (zero
  per-project cost on Business). **S5/S5.1** redefine `no-db` as "stores nothing" — a site
  may pair with its **own functions-only Supabase** (edge functions, no tables, no DB
  client, reached by `fetch`) and still be `no-db`; the forbidden things are tables, a DB
  client, and stored data, not the project. **S5.4** rewritten — the sanctioned backend is
  the site's **own Supabase in the AS-owned org**, shipped empty of tables; **Lovable Cloud
  is never used**; `builder_backend_provisioned` still tracks Cloud specifically and stays
  `false`; Step 0 now *provisions* the AS-org functions-only Supabase rather than connecting
  nothing. **S6** names the functions **Supabase Edge Functions** (public/`--no-verify-jwt`,
  CORS-locked to the site domain, manual deploy, never auto-deployed; keys in Supabase
  secrets). **Manifest** gains `host` / `noindex` / `site_supabase` (+ `server_runtime`).
  **Charter §9** transfer unit = the Lovable front end + its functions-only Supabase.
  Demo↔production is configuration (a `noindex` toggle + domain), not a rebuild. Seed
  `functions/DEPLOY.md` consequently rewrites to Supabase Edge Functions (`Deno.serve`),
  dropping the Netlify/Cloudflare dual-export — applied in the seed repo, not this doc.
- **v0.6 — 17 Jun 2026:** First real Prompt 1 build folded back in (clean run, all six
  routes SSR, voice gate 0). **S5.4 rewritten** to current Lovable: no decline-at-creation
  control exists; Lovable Cloud auto-enabled-in-chat is a capability flag, not a provisioned
  backend. Step 0 is now connect-nothing / set-Cloud-to-ask / deny-if-prompted /
  verify-the-bundle (backend-bearing hubs still bind the AS Supabase org first, never Cloud).
  `builder_backend_provisioned` and the gate check an actual provisioned surface, not the
  flag. **S7.2** clarified that a `Response`-returning error fallback is not a second shell.
  Seed: corrected the `cultural.tsx` Door-2 hero (`culture`, was the neutral home fill);
  `sitemap.xml` reclassified paperclip-preferred.
- **v0.5 — 17 Jun 2026:** Third dry run folded in (clean, no blockers, agent-readiness
  moderate). Added core component **`PageTitle`** + a bounded hero size scale
  (`s-hero/xl/lg`); the six heroes drop their inline `font-size`. **S3.2** now bans inline
  *type* and permits inline *spacing* (per-site rhythm). Orphaned `.reveal` CSS removed from
  core; **reveal is now an optional module that ships with its driver** (S3.3/S3.4).
  **Appendix B synced to the realised components** (Btn `action|line|ghost`, Band `tone`,
  MediaCard `category`, TierCard/EventCard/etc.). Seed: `SCAFFOLD.md` starter/preset line,
  `functions/DEPLOY.md` netlify.toml omitted-by-design note.
- **v0.4 — 17 Jun 2026:** Second dry run folded in. **S2.3 generalised** to *every text
  token × every section tone it can land on* (a worked matrix now sits under §4 and is
  regenerated each audit), after the rule shipped a third same-pattern fail: soft body
  (Anvil `#6E6760`) on Mist = 4.28. Soft token darkened to `#5E574F` (Mist 5.47). **S2.2**
  extended to forbid raw colour literals — `rgba()` included — in the spine stylesheet;
  the two offenders tokenised (`--shadow-color` triplet, `--rule-on-dark`). Seed also: sans
  fallback for `--font-display`. (Same-session seed follow-ups, now folded in: `SCAFFOLD.md`
  version pin, per-file paperclip note, robots/sitemap host caveat, edge-function subject
  de-em-dashed, and dual edge-function host shapes + `functions/DEPLOY.md`.)
- **v0.3 — 17 Jun 2026:** First dry run folded in. **S2.3** rewritten to check on-dark
  pairs (not only on-light) and require a lightened `--accent-on-dark` token — the v0.2
  proof had shipped Ember-as-text failing AA on Iron (4.06) and Slate (3.28); `#E0915F`
  clears (6.73 / 5.43). **S4.1** enum gains `slate`; new **S4.3** pins accent-as-text
  resolution per tone (and the accent-on-accent trap); full-bleed renumbered S4.4. New
  **S5.4** — no builder-provisioned backend on a no-db site (decline Lovable Cloud at
  creation = Step 0). **S7.1/S7.2** made template requirements (the seed ships per-route
  `head()`, `sitemap.xml`, `robots.txt`, and a hard-set `lang`). §8 template paths synced
  to the realised flat `src/content/*.tsx` + `site.config.tsx`. Manifest gains
  `builder_backend_provisioned`.
- **v0.2 — 17 Jun 2026:** Added **S9 — Voice & copy** (zero prose em-dashes = GATE; no
  superlatives; voice register declared in the charter), incorporating
  `as-relationship-playbook.md` Principle 9 as the voice layer of the spine/skin/content
  model rather than a separate doc; manifest + summary gained a `voice` block; the
  template seed is realised as `aismith-site-seed`; registered the planned
  `as-wordpress-site-kit.md`. Eight contracts → nine.
- **v0.1 — 17 Jun 2026:** First draft. Established the conform-the-spine / vary-the-skin
  principle, the eight contracts (S1–S8) with the inverted exposure posture, the fixed
  semantic token set (Appendix A, ZG + AS worked skins), the component inventory
  (Appendix B), the template-seed layout, the WordPress-strip note, the per-site charter,
  and the public-site audit mode (manifest + summary). Derived from the ZG build shape
  and `as-stack-blueprint.md` §1B/§13.

---

*Companions: `as-site-seed-s
