# AI Smith — Site Intake Standard

**Version 0.10.1 -- 11 October 2026.** How a client or a prospect becomes a build-ready brief.
The front half of the public-site pipeline; the build agent is the back half.

**THE EVIDENCE BASE OF THIS STANDARD'S RULE-BEARING CLAUSES IS ONE CLIENT** (`cafe-josee`, 2026-08), stated ONCE here and not beside each rule. A later contrary case AMENDS the rule it meets rather than contradicting it.

> **What this is.** The standard for *intake*: turning an org into a single build-ready
> brief that the site build agent then builds from the seed, conforming to
> `as-site-spine-standard.md`. It covers the two ways a site starts (a client who hands over
> their material, or a prospect whose material is gathered for them), the inputs that
> initiate the process, the lanes that fill the brief, the order of authority between
> sources, the guardrails for building a concept on someone else's brand, and the post-build
> review that replaces the pre-build human gate. The café Kamiel brief (`cafe-kamiel-build-brief.md`) is the worked
> example throughout.
>
> **What it is not.** It does not build anything. It produces a brief. It is also not a
> per-site charter; the charter is the spine's declaration of one finished site. Intake
> feeds the brief; the build agent reads the brief; the audit checks the result.

---

## 1. Two scenarios, one brief

| | **Scenario 1 — working client** | **Scenario 2 — prospect concept** |
|---|---|---|
| Trigger | The client decides they want a site and hands over their material | A live surface the lanes can read (§2), and a short prep, before or after a first meeting |
| Material | Supplied by the client | Gathered *for* them by the lanes (§3) |
| Output | The same brief schema (§9) | The same brief schema (§9) |
| Status | A real build | A demonstration concept, private by default (§6) |
| Pitch fit | "Your site, built on your hub" | **"The work already done"** — they meet a working concept, not a quote |

The scenarios differ only in where the material comes from. Both converge on one brief, and
the build agent cannot tell which scenario produced it. Scenario 2 is scenario 1 with an
extraction front-end. This is deliberate: one agent, one brief, two front doors.

### 1.1 Public self-serve intake + approval gate (the automated front of Scenario 2)

Scenario 2 can be driven by hand (an operator hands the lanes a live surface after a meeting,
§2) **or** by a
**public self-serve door**: a form on `aismith.io` where a visitor submits a URL plus the
short prep (§2), and the lanes (§3) run to produce a build-ready brief automatically. This is
not a third scenario — it is the **automated front of Scenario 2**, feeding the same brief
schema (§8). The two-scenarios-one-brief model is unchanged.

**THE DOOR'S SUBJECT IS A LIVE SURFACE AND NOT A WEBSITE SPECIFICALLY (site-contract 1.8.25).**
§2's 2026-08-20 widening reached the trigger and stopped one section short of this one, so the
operator-driven path accepted a builder whose readable surface is social profiles plus a GBP
place while the self-serve door still asked for a URL. **The door accepts either satisfaction
§2 declares**: a website URL, or the profile addresses plus the GBP place. **AND THE SUBMISSION
RECORDS ITS SHAPE BEFORE LANE 1 RUNS**, one of `site-backed`, `social-only` or `no-surface`;
§2's shape bullet is that enumeration's single home and this sentence does not restate it.
**THE CONSENT BASIS FOR A SUBMISSION WITH NO URL IS NOT SETTLED HERE.** The approval gate below
still stands and still confirms a basis before any build runs, but §6's containment gate and this
section's exception are both written against a submitted URL, and what confirms legitimacy for a
submission whose subject is somebody else's profiles is an open question rather than a rule this
standard states. **RULED 2026-09-17: THERE IS NO SOCIAL-ONLY PATH AND THE DOOR IS URL-ONLY BY DESIGN.** A submission whose subject is somebody else's profiles is NOT accepted at the public self-serve door; a social-only client is OPERATOR-DISPATCHED through §2's scenario-2 path, where the consent basis is the operator's own confirmation before any lane runs. The asymmetry is a decision and not an oversight.

A public door changes nothing about *what* is built, but it widens *who* can trigger a build,
so it is fenced by an **operator approval gate** before any concept is generated or published:

- **Approval is a login-gated button POST, never an email link.** The operator approves (or
  rejects) a queued submission by clicking a control inside an authenticated AI Smith surface
  that fires a `POST`. It is **not** a "click to approve" link mailed to the operator: link
  scanners and mail clients **pre-fetch** URLs, which would silently auto-approve. The
  state-changing action must sit behind login and require a deliberate POST.
- **Approval is where the door's consent basis is confirmed — explicitly.** A public door
  invites **third-party-URL** submissions (anyone can paste anyone's site). The §6 **containment
  gate** is the basis for **operator-initiated** runs, but an open public endpoint is the **§6
  exception**: the operator approval **confirms a legitimacy/consent basis for the submission
  before the build is allowed to run**, and it is stated here so it is enforced, not merely
  implied. Statelessness, the `noindex`-shareable default, the temp
  subdomain, and the URL-validation guardrails of §6 all still apply to anything the door
  produces.
- **The door does not relax any §6 control.** A self-serve submission is still a Scenario 2
  prospect concept: `noindex` on, shareable, temp `<slug>.demos.aismith.io`, concept marker,
  assets referenced-not-claimed, stateless against `AISmith-functions`. The gate adds a step;
  it removes none.

**Payment gate [PARKED].** A paid public endpoint — a visitor pays to have a concept built
and unlocked — is **designed-for, not built**. Recorded so the surface is reserved, not
implemented this cycle. When it lands: **Stripe stays the hub money rail** (per
`as-stack-blueprint.md` / `as-hub-positioning.md`); a public *paid* endpoint **widens the
abuse surface** (paid-but-hostile submissions), so the controls are exactly A's: the **operator
approval gate** (above) plus **URL validation** on the submitted target. Payment does not buy
past approval or consent — it is gated by the same checks. [PARKED]

**WordPress conversion is a pointer, not a Scenario 3.** When the org is *leaving* an existing
WordPress site (not keeping it), intake runs this same extraction front-end against the live WP
site to produce the same build-ready brief, and adds a **migration plan** (the URL inventory +
301 map) alongside it. That is a different *output* (a live cutover, not a `noindex` concept),
handled by **`as-site-build-wp-conversion.md`** — it is **not** a third intake scenario. The
two-scenarios-one-brief model is unchanged; intake just hands the conversion pipeline the brief
plus the URL inventory.

## 2. The trigger (I1) — a small input set, not a questionnaire

Intake is initiated by a handful of artifacts. The point is to start from what already
exists, not to interview the client into a blank form.

- **Required — six identity fields, and they are the whole of what intake requires to START.**
  Company name; legal entity name, with a **same as above** tick where the two are the same;
  contact name; email; phone; address. **`vatId` is OPTIONAL**, matching `legal.controller`'s own
  shape in `schemas/manifest.schema.json`, where only `name` and `email` are required. The form
  doubles as a new-client form, which is why the contact fields are asked rather than gathered.
- **Contact details are collected to REACH the client and are NOT site content.** They exist so the
  client can be reached, and so the S7.4 privacy notice's controller identity has a source
  (`legal.controller`). **What appears on a rendered page still comes from the lanes under §4
  precedence, unchanged**, where a confirmed Google fact outranks client intent. Stated once, here.
- **Declared, not required — one live surface the lanes can read, where there is one.** ONE
  declaration with TWO satisfactions, and what is declared is the readable surface rather than any
  particular address:
  **(a) a website**, whose URL drives content extraction, the facts call and the enrichment
  search, together with a homepage PDF / print that carries the brand — colour, type, layout
  — because a text fetch cannot see rendered CSS (I5); **or (b) a social presence plus a GBP
  place**, the profiles carrying the org's own words and images and the Google Business
  Profile record carrying the facts customers act on (§5). **A builder that satisfies neither has
  no readable surface, and that is DECLARED rather than blocking**: intake starts on the six
  required fields above, the lanes run on whatever exists (§3), and `no readable surface` rides at
  the TOP of the §8 review list so the owner meets it at the go-live gate that already stands.
- **Required — say which SHAPE the builder is in, before lane 1 runs. THREE values, because two
  cannot describe a case this section now admits.** The trigger records the shape as
  **site-backed** (satisfaction (a): a website exists), **social-only** (satisfaction (b): no
  website, the surface is profiles plus a GBP place), or **no-surface** (neither, which §2 now
  declares rather than blocks). **`no-surface` IS NOT THE THIRD LANE STATE THIS STANDARD TWICE
  DECLINED TO MINT, and the difference is decidability**: a shape is read off the submission
  itself and a stranger can check it, where a lane outcome rests on whether the agent went and
  looked, which nothing can witness. A two-value enumeration over a three-value case is a partial
  enumeration, and leaving the third unnamed makes every later reader invent their own word for it. This is **a variant
  of this intake, not a second intake path and not a third scenario** — the same move §1.1
  already makes for the public door, which is *the automated front of Scenario 2* rather than a
  scenario of its own. Both shapes converge on the same brief schema (§8) and the build agent
  cannot tell which produced it. The shape is recorded because the five lanes (§3) read
  different surfaces under it, never because the output differs.
- **Optional — logo.** A high-quality source file (SVG/PNG) when the client has one; supply it
  and the build uses it as an exact asset, never approximated (I5). **No screenshot capture floor:**
  a missing source file is not blocking, and an exact source replaces whatever the build used at
  go-live. **A rendered live site is not assumed to exist**, so the mark cannot be treated as
  sourceable from one by default; a social-only builder (above) has no rendered site to read.
  **Where the mark may be sourced from is NOT settled by this standard yet** — that is the asset
  provenance question and it is open.
- **Optional — skin.** A look, authored by Claude Design (agent-fleet §3A): a named **preset** from
  `AISmithFactory/aismith-skins`, or a per-client **brand skin** / one-off skin bundle delivered via
  `folder=`. Carries brand (tokens + fonts + logo) + module selection — never the copy (that is the
  lanes' job). Absent a skin, the seed's default skin stands and the build reskins from the brand it
  reads. The skin is brand + modules; content precedence (§4) is unchanged.
- **Optional — client-intent note.** Anything from a prior conversation: what they want to
  change, add, or emphasise, and any facts already confirmed with the owner. Both scenarios
  can have one. It shapes scope and pre-closes review items (I3, I7).

## 3. The five lanes (I2)

Each input fans out into lanes that fill different parts of the brief. **Each lane states the
inputs it CONSUMES, because the six required fields (§2) guarantee none of them.** A precondition,
not a verdict: no lane gains a state, a label or a vocabulary here.

1. **Content** — the org's own readable surface (§2). **The lane's input is that surface, never a
   website specifically**: for a site-backed builder it is their own site, for a social-only one it
   is the profiles as published, together with any supplied capture/PDF. The *what they do*, the
   offer, the **full page inventory**
   (most simple sites are a few pages — build them all, not a Home+Info stub). Rewritten to
   spine voice (I5), never pasted. A page whose content isn't crawlable is supplied as a
   capture/PDF and **built**; link-out is a fallback for genuinely unavailable content, **not**
   a default for "it's a PDF".
2. **Facts** — the Google Places API (name, address, phone, hours, category). Authoritative
   for the things customers act on (I4). **Consumes the org's GBP/Places record**, read per §5.
3. **Brand** — a render of the live surface (§2) + the logo. Colour, type, layout, the mark
   (I5). Brand cannot be inferred from content (§6), so this lane needs a render whichever shape
   the builder is in: for a site-backed builder that render is the homepage PDF / print; for a
   social-only one it is the profile pages as rendered. **The lane's input is a render, never the
   homepage PDF specifically.**
4. **Enrichment** — a wider web search. **Consumes the org's name and place**, and nothing the
   client supplies. Founder story, team, reviews, history; the warm true
   detail the client's own site often omits. (Café Kamiel's owners and the namesake dog came
   from this lane, not their site.)
5. **Intent** — the client-intent note. **Consumes that note**, which is optional (§2), so this is
   the one lane the trigger can leave with no input at all. Scope and emphasis.

A lane that comes back thin does not block the others — the agent proceeds with what it has
and records the rest for the post-build review (I7). **Thin ≠ off:** for a Scenario-2 concept the five lanes
are **mandatory**, not optional — the agent runs the live-site read (Claude-in-Chrome), the
GBP/Places facts call, and the enrichment search; it may **not** skip a lane and build from a
single supplied doc by inference. A skipped lane is a no-fabrication failure (context invented
that could have been gathered), not a thin result.

**A lane whose input was not supplied is visible through the §8 record, never through a label.**
The preconditions above say what each lane consumes; a reader learns what was thin, and why, from
what the brief records the lane consumed and looked for (§8). **THE PARAGRAPH ABOVE IS UNCHANGED
AND SO IS ITS SCOPE**: the mandatory-lane rule and its no-fabrication verdict are scoped, as
written, to a **Scenario-2 concept**, and stating a precondition does not widen either onto a
working client. **Nothing here can prove an agent went and looked**, and that limit is stated
rather than engineered around: making the record checkable is a backlog row, not a rule here.

## 4. Precedence (I3)

When lanes disagree, resolve in this order, highest first:

1. **Guardrails** (§6, voice, AA, no fabrication). Never overridden, by anyone.
2. **Confirmed facts** — Google Business Profile / Places, or the owner directly.
3. **Client intent** — the stated note. Shapes structure, modules, emphasis.
4. **Scraped / inferred defaults** — content and brand read from their material.

So a client wish ("a separate opening-hours page") beats the inferred default page set, but
a client wish that contradicts a confirmed fact (publish hours GBP disagrees with) is a review
flag, not a silent win. And nothing at any level overrides a guardrail.

## 5. Facts: source hierarchy and the discrepancy flag (I4)

Local-business facts are contradictory in the wild. Café Kamiel's opening hours disagreed
across six sources during intake. The rule:

- **Authoritative: Google Business Profile** — what customers see in Maps and Search and act on.
  The **sanctioned access path is the Places API**, via a shared **`facts` function** on
  `AISmith-functions`. **That path is [DEFERRED]** (scoped, shelved — `facts-function-scope.md`):
  for a manual operator run its marginal value over a one-off browser read is small, and a
  concept's value is completeness of public data, not API-confirmation. **For now the facts lane
  reads the public GBP record directly via Claude-in-Chrome** (the rendered Maps panel) alongside
  the live site and a web search, and the concept **ships what it finds, marked publicly-sourced
  and unverified** (§7). The API becomes the path when the build runs **unattended / at volume**
  (the public self-serve door), where programmatic Maps reading is the ToS/stability problem the
  API exists to solve — a one-off operator read for a private demo is not.
- **Next: the owner**, directly, when reachable.
- **Then: owner-written prose** on their own site.
- **Lowest: structured widgets and third-party aggregators**, which are usually stale scrapes.
- **The discrepancy is itself a finding — and an asset.** If sources disagree, the concept still
  **ships the public value** and surfaces the disagreement for the review (§7). Because the demo is
  private and the client is its first viewer, telling them their own public-facing info is wrong
  (e.g. Google hours that would send a customer to a closed door) is a **direct, useful finding** —
  the work already done, a real problem found, before it ever reaches a customer. That closed-door
  risk is a **go-live** concern: at the demo no customer sees it; at go-live the hours ship to the
  public only once confirmed.

## 6. Building on someone else's brand (I5 brand rules + the prospect guardrails)

**Brand extraction.** Brand cannot be inferred from content; it has to be read from a render.
**A rendered live site is not assumed to exist** (§2), so *a render* means a render of whatever
live surface the builder has: for a **site-backed** builder the homepage PDF / print, for a
**social-only** one the profile pages as rendered (§3 lane 3).
The text lane had café Kamiel as warm brick-and-cream; the homepage PDF showed the real brand
is monochrome editorial, ink on white with all colour carried by photography. Building from
the scrape alone would have shipped a confidently wrong palette to a prospect. Therefore:

- **Colour** is read from the PDF/render, then mapped onto the semantic token roles and
  **AA-conformed** to the spine's S2.3 matrix. Brand intent in, AA-safe roles out; the concept
  ends up more accessible than their current site.
- **Copy** is extracted as *facts* and **rewritten to spine voice** (S9: no prose em-dashes,
  no superlatives, show don't tell). Scraped marketing text is never pasted.
- **Logo**, when a high-quality source file is supplied, is used as an **exact asset, never
  approximated** (an approximated logo looks worse than none). It is optional input: with no source
  file the build agent sources the mark from the live site it reads (Claude-in-Chrome) **where a
  rendered live site exists**. **A rendered live site is not assumed to exist** (§2) and a
  **social-only** builder has none, and for that shape **where the mark is sourced from is not
  settled by this standard yet**. No text stand-in under either shape.
  **A FOURTH RUNG (site-contract 1.8.25): EXTRACTED FROM A THIRD-PARTY CDN AND COMMITTED TO THE
  REPO.** Permitted where the three rungs above it cannot resolve the asset and the licence permits
  the copy, and **recorded as the rung the asset came from**. It is named because the fleet has
  already used it and had no sanctioned move: `cafe-josee` resolved its mark by extracting from a
  signed CDN and committing `public/cafe-josee-mark.png`, the repo's only committed image. **IT
  SITS AGAINST §6's *assets referenced, not claimed* AND THE TENSION IS STATED RATHER THAN
  RESOLVED**: a committed copy is still a placeholder in the licensing sense, replaced or licensed
  at go-live like any other, and a rung nobody sanctions is a rung a builder improvises.
  **AND THE SIGNED-URL PROHIBITION IS `as-site-spine-standard.md` S10.4 AND IS NOT RESTATED HERE**: a signed URL from a private bucket must never be baked into prerendered HTML, which is why extraction-and-commit is a sanctioned rung at all. Read the rule there; this sentence is a pointer and states none of it.
  **THE BRIEF SCHEMA'S PROVENANCE SLOT IS TAKEN AT site-contract 1.8.29** (§8): the rung was named at 1.8.25 and the slot that records it per asset lands here.

**Prospect guardrails (mandatory for any scenario-2 concept).** A concept is built on a brand you
do not own and may sit live for a while. **One site, built as production from day one:**
default host is **Netlify (Pro)**, connected to the shared **`AISmith-functions`**
project from the start (stateless: no per-site Supabase, no tables); the default contact is the
**function-backed form** wired to that project, newsletter off. The demo↔production difference
is configuration — a `noindex` toggle and the domain — with no backend change. **Statelessness
is the gate:** if a concept ever needs to store data, it stops and provisions its **own** new
Supabase account first (separate from the shared project and any hub). It ships:

- **`noindex`, shareable, by default.** A concept is **public-but-noindexed**, so the client
  can freely share the link for colleague feedback; it just is not crawled or indexed. The
  real control is `noindex` (meta + header), **not** a robots.txt `Disallow`, and **not**
  sitemap omission alone:
  1. `noindex` on every page, via `<meta name="robots" content="noindex,nofollow">` **and** an
     `X-Robots-Tag: noindex` response header. This is the actual de-index instruction.
  2. **Do not `Disallow` it in robots.txt.** Blocking the crawl stops the engine reading the
     noindex and can leave a bare URL in results. Allow the crawl, serve noindex.
  3. Omitting the sitemap and not linking it from `aismith.io` help, but they are **not** the
     control — search engines index URLs they discover by other means. `noindex` is.
  4. **A password remains available** for a client who wants true privacy (host visitor access
     control; a crawler then receives a 401 and the site is physically un-indexable). It is
     **no longer the default**, because it would defeat the link-sharing a concept is for.
     Offer it when a concept will sit for a long time, or when the client asks.
- **Temp subdomain**, convention `<slug>.demos.aismith.io` (e.g. `cafe-kamiel.demos.aismith.io`).
  Never made to resemble or sit on the client's live domain.
- **Concept marker** — a visible "Concept by AI Smith" line (folds into the footer credit).
- **Assets referenced, not claimed — the real ones, never generic placeholders.** Photos are
  the existing site's **own images, reused by their live URLs** (read from the rendered pages,
  §3 Content lane); a concept never ships stock or grey-box placeholders where the client's real
  photography exists. The logo is the **real mark extracted from the rendered live site**
  (Claude-in-Chrome) as an image asset — a **text-only wordmark is not an acceptable stand-in**.
  Both are placeholders in the *licensing* sense only: referenced now, replaced or licensed (and
  the exact logo source dropped in) at go-live. This is now a **mechanically enforced** verify
  check (`verify.mjs` [6]), not a preference: a text-only logo fails the gate unless
  `site.config` declares `brandMark.kind: "wordmark"` (default `image`) (build-agent §6).
- **Consent — the containment gate is the basis.** A concept may be built from any public site
  for outreach; the consent basis is **containment**, not a prior invitation. The concept is
  `noindex` and reaches no one until the **operator reviews it first**, and reaches **beyond the
  owner only at owner-approved go-live**. Its only external viewer is the owner, seeing their own
  public information — so the build uses **all public data, including named people** (§7). (Café
  Kamiel: the owner asked for help; an invitation is now *sufficient, not required*.) **The public
  self-serve door is the exception:** because it invites third-party-URL submissions at volume, its
  operator **approval gate (§1.1) still confirms a basis before any door-submitted build runs** —
  the containment basis covers operator-initiated runs, not an open public endpoint. **AND THE DEFAULT IS NOT REOPENED BY THE ARCHIVE RULE.** Where the enrichment lane reads an OWNED ARCHIVE, a fact carries the date of the post it came from and a fact predating a change of ownership is checked against a current source or dropped; **that rule is about PROVENANCE ACROSS A CHANGE OF OWNERSHIP and it does not touch the names default, which v0.7.0 set to used and which stands** (operator ruling 2026-09-17).

## 7. The run is end-to-end; review is post-build (I7)

There is **no human gate between discovery and a deployed concept.** The lanes gather, the
build applies the standing defaults below for anything they could not resolve, and the site
**runs all the way through to a deployed `noindex` demo** (`<slug>.demos.aismith.io`) with
whatever it has. Nothing pauses the run for data entry or a hosting sign-off. The review
happens **after** the demo exists, against the live demo and the review list (the brief's §9) —
and because the demo is `noindex` and shareable-not-public, a concept that came out wrong is
seen by no one before it is checked and fixed. Run first, review the result; anything missing is
added later, not blocked on.

**Completeness is the point of a concept.** A concept's value is the *completeness of what is
publicly available, assembled without the client's input* — the work already done. The build
**includes everything it can source from public data** (hours, address, phone, category, photos,
story) and ships it; it does **not** hold back a real public fact merely because it is
unconfirmed. Because the demo is private (`noindex`, client-first), public data that turns out to
be wrong is an **asset**, not a liability — it shows the client their public-facing information is
incorrect. The one line this does not cross is **fabrication**: inventing a fact no public source
supports. Real public data (shown, flagged unverified) is in; invented data is out.

**Standing defaults (applied automatically so the run never stops).** Each is the safe,
no-fabrication resolution of a class of open item; each is recorded in §9 and carried to the
post-build review as a go-live item:

- **Hours.** A concept **ships the publicly-available hours** (read from public sources — the
  Maps panel via Claude-in-Chrome, the live site, the web) in the `Hours` module (S3.3), with a
  **publicly-sourced / unverified** note and any cross-source discrepancy surfaced for the review
  (§5). The module is **not** held off for lack of owner-confirmation — completeness is the demo's
  value, and public hours that are wrong are a useful finding for the client who sees them first.
  **No fabrication:** hours come from a real public source, never invented. At **go-live** the
  closed-door rule reapplies — hours ship to the public only once **confirmed** (owner-direct, or
  the [DEFERRED] Places API).
- **Names / people.** **Used by default** — the concept ships **all public information, including
  named people** (owners, team, public reviews), sourced from the live-site / GBP / enrichment
  lanes. The privacy basis is the **containment gate** (§6): `noindex`, operator-reviewed before
  the owner sees it, owner-gated go-live — not withholding. **No fabrication** still binds: a name
  must come from a real public source, never invented. Because named individuals are **personal
  data**, go-live still **owner-confirms names** before they reach the public, and each named
  person is flagged for that confirm in the §9 review list. **THE ARCHIVE RULE DOES NOT REOPEN THIS.** S5's surviving half reaches only facts carried out of an OWNED ARCHIVE across a CHANGE OF OWNERSHIP, where a fact carries the date of the post it came from and a fact predating the change is re-sourced or dropped. **It is a PROVENANCE rule and not a names rule**, and the used-by-default setting v0.7.0 made STANDS (operator ruling 2026-09-17).
- **Accent.** The faithful **monochrome** read (photography carries the colour); an amber/green
  accent ships only if the brief resolves to it, AA-conformed (S2.3).
- **Fonts.** When the brand's exact face is a licensed/Adobe font that cannot be freely embedded,
  the concept ships a **free stand-in** matched to the register (e.g. Oswald display + Inter
  body); the exact face is the one go-live swap.
- **Logo.** The **real mark**, never an approximation of one (§6). **A rendered live site is not
  assumed to exist** (§2), and **where the mark is sourced from is not settled here.** Never a text
  stand-in — gated by `verify.mjs` [6] (`brandMark.kind`, default `image`).
- **Photography.** The existing site's **own images, reused by their live URLs** (§6); never
  generic placeholders.

**The only things that stop the run** are a **guardrail breach** that no safe default can satisfy
(no-fabrication, AA, voice, the §6 consent basis) or a **missing spine component** (a structural
need the spine does not have — build-agent §7). A guardrail is never bent to keep moving; the page
changes instead.

**The one deliberate pre-run gate is the public door.** For the **public self-serve door** (§1.1),
the operator approval is the single intentional pause — it confirms the consent basis for an
**anonymous third-party** submission before any build runs. It is unaffected by this section, which
governs the **operator-initiated** run (the normal path, including café Kamiel), where the consent
basis is already established and the run goes straight through to the demo.

## 8. The brief schema (I8)

Intake's only output is a brief in this shape (the café Kamiel file is the reference
instance). The build agent expects these sections:

1. **Provenance and guardrails** — sources, trigger inputs, consent, the §6 guardrails. **And the
   PER-LANE RECORD: for each of the five lanes (§3), what it CONSUMED and what it LOOKED FOR.** A
   record, not a verdict, and it is what makes a thin lane readable afterwards.
2. **Identity** — name, archetype, language, domain target, character.
3. **Skin** — token values (read, AA-conformed), fonts, logo handling, button variant.
4. **Content** — rewritten to voice, in the site's language.
5. **Structure** — the page set (intent overrides the default).
6. **Integrations** — contact, newsletter, memberLink, optional modules (intent can switch on).
7. **Facts** — the extracted, source-ranked facts.
8. **Assets** — referenced placeholders, **each recording the RUNG it came from** (§6: own site, GBP CDN, owner-supplied, or extracted-and-committed). The rung is a field of the asset and not a note beside it, so an audit can tell a GBP URL from a committed extraction without reading the diff.
9. **What extraction left for you to fix** — the review list (carried to the post-build review, §7).
   **`no readable surface` RIDES AT THE TOP OF THIS LIST** where the builder satisfied neither §2
   satisfaction. There is no publish floor and none is added: the demo is `noindex` and go-live is
   owner-gated (§6, §7), so **the owner gate IS the floor** and the owner has to meet this item
   there.

## 9. Handoff and conventions

- Output one file, `<slug>-build-brief.md`, `as-`/slug naming alongside the canon.
- The build agent reads the brief + `as-site-spine-standard.md`, builds from the seed, and
  touches only `tokens.css`, `src/content`, and `site.config` (spine invariant).
- Deploy per §6: **Netlify deploy** to a temp `<slug>.demos.aismith.io` subdomain
  (Netlify-DNS-delegated) with `noindex` on for the demo, connected to the shared
  `AISmith-functions` project from the start (the contact form is wired by default, its `to:` defaulting to the shared catch-all
  **`contact@aismith.io`** for a concept — never the prospect's address, with the real address
  wired at go-live as the one `CONTACT_TENANTS` swap);
  production flips `noindex` off and points the real domain — no host move and no backend
  change. The run reaches this deploy with **no human pause** (§7); the audit
  (`as-site-audit-prompt.md`) and the post-build review then check the live demo;
  a scenario-2 manifest is expected to record `host: "netlify"`, `noindex: true`,
  `site_supabase: "shared-functions"`, and `server_runtime: "supabase-edge-functions"`. A
  password is optional, not assumed.

---

## Changelog

- **v0.10.1 -- 11 Oct 2026:** **THIS FILE RIDES THE CUT FOR ITS CHANGELOG'S CLASSIFICATION ALONE, AND NO BODY TEXT MOVES** (site-contract 1.8.30 -> **1.8.31**, coupled with hub-contract 1.7.21; R167, the T3 register; the controller's Q5 ruling of 2026-10-11 on `prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2, *as recommended*: the hazard that deferred T3 was bytes moving under an UNCHANGED version, and this cut moves the version). Eighteen entries, v0.10.0 to v0.1, ALL RECORDS, no promotion owed: v0.10.0's URL-only door ruling lives in SS1.1 and its rung slot in SS8, v0.9.0's six-field trigger and three-value shape in SS2, v0.5.3's thin-not-off rule in SS3; the items v0.9.0 left not done are tracked as `backlog.md` rows, not here. Found and raised, not moved: the companions footer after this changelog is cut mid-sentence (since `380bb1b`), and the body still says the logo is extracted from the rendered live site in one place while two others leave the mark's source unsettled, the contradiction v0.8.0 named and left open. No em dashes.
- **v0.10.0 -- 20 Sep 2026:** **SIX EDITS, AND ONE OF THEM REPLACES A PUBLISHED VERDICT, WHICH IS WHY THIS IS A MINOR AND NOT A PATCH** (site-contract 1.8.28 -> **1.8.29**, the UNCOUPLED cut; `prompts/dispatch/plan-cut-1829-2026-09-19.md` v0.2 SS4b). **SS1.1's *RAISED, NOT RULED* VERDICT IS REPLACED BY THE RULING THAT ANSWERED IT** (E4, row 091, operator 2026-09-17): there is no social-only path, the public self-serve door is URL-only by design, and a social-only client is operator-dispatched through SS2's scenario-2 path. **S5's SURVIVING HALF IS SCOPED WHERE A BUILDER READS IT** (E2b, row 089), at both of this file's loci: the owned-archive rule is a PROVENANCE rule across a change of ownership and does not reopen the names default v0.7.0 set to used. **THE BRIEF'S SS8 ASSET SLOT RECORDS THE RUNG** (E3a, row 090), and SS6's *slot is left* sentence stops being false in the same act; the JSON intake schema is NOT touched and is held to the next hub cut. **THE n=1 EVIDENCE MARKER LIVES ONCE** (E6, row 095, Option 2): the parenthetical is struck from all SEVEN of its instances and stated once under the version header. **SS6's FOURTH RUNG GAINS A POINTER AND NOT A RESTATEMENT** (E7, row 095) to `as-site-spine-standard.md` S10.4's signed-URL prohibition. **AND ONE v0.8.0 CHANGELOG CITATION IS REPOINTED** to `docs/rulings/` (E9, row 109). No em-dashes.
- **v0.9.1 -- 6 Sep 2026:** **§1.1 CATCHES UP WITH §2, AND §6's ASSET LADDER GAINS THE RUNG THE FLEET ALREADY USED.** The 2026-08-20 widening reached the trigger and stopped one section short: the self-serve door asked for a URL while the operator-driven path already accepted a builder whose readable surface is profiles plus a GBP place. **The door now accepts either satisfaction §2 declares and the submission records its SHAPE before lane 1 runs**, `site-backed`, `social-only` or `no-surface`, §2's bullet staying the enumeration's single home. **THE CONSENT BASIS FOR A NO-URL SUBMISSION IS RAISED AND NOT RULED**: §6's containment gate and §1.1's exception are both written against a submitted URL, and the sentence that would state a basis for somebody else's profiles is not written here, because writing it would be a ruling. **§6's logo ladder names a FOURTH RUNG**, extracted from a third-party CDN and committed to the repo, permitted where the three above it cannot resolve the asset and the licence permits the copy, recorded as the rung the asset came from; `cafe-josee`'s committed mark is the worked instance and the tension with *assets referenced, not claimed* is stated rather than resolved. **THE BRIEF SCHEMA'S PROVENANCE SLOT AT §8 IS LEFT**, per its row's own split: the rung rides and the slot does not. Rides **site-contract 1.8.24 -> 1.8.25**. Per `prompts/dispatch/plan-cut-1655-2026-09-06.md` v0.4 SS4 (E7a, E7b, E7c, E7e; E7d WITHDRAWN by operator ruling Q5). No em-dashes.
- **v0.9.0 — 20 Aug 2026:** **§2 STOPS BEING A GATE. Intake starts on SIX REQUIRED IDENTITY FIELDS and accepts what arrives.** Company name, legal entity name with a *same as above* tick, contact name, email, phone, address; **`vatId` is OPTIONAL**, matching `legal.controller` in `schemas/manifest.schema.json`, where only `name` and `email` are required. The live-surface requirement becomes a **DECLARATION**: *a builder that satisfies neither has no readable surface and intake does not start* is no longer an intake precondition, the lanes run on whatever exists, and **`no readable surface` rides at the TOP of §8's review list** so the owner meets it at the go-live gate that already stands. **NO PUBLISH FLOOR IS ADDED AND ONE WAS PROPOSED AND WITHDRAWN**: §7's list of what stops a run is closed and no edit here opens it, the demo is `noindex` and go-live is owner-gated, so the owner gate IS the floor. **Contact details are stated ONCE, in §2, as collected to reach the client and NOT site content, and §4 precedence is deliberately NOT edited.** §3 gains a **PRECONDITION PER LANE**, what each lane CONSUMES, and lane 1 is made shape-aware as 1.8.20 did for lane 3 and did not do here: the lane's input is the org's own readable surface, never a website specifically. **THE FABRICATION SENTENCE IS UNTOUCHED AND SO IS ITS SCENARIO-2 SCOPE**, which is stated rather than assumed, because two earlier versions of the plan tried to resolve the mandatory-lane collision with a THIRD STATE and both were refuted: the scope relocated the undecidability rather than dissolving it, could not partition lanes because the logo and files are inputs to fetch lanes, and swapped a fabrication predicate for an input-existence one. **No new state, no new vocabulary, and the honest limit is stated**: nothing can prove an agent went and looked, and making the per-lane record checkable is a backlog row and not a rule here. §8 gains that record in section 1 and the review-list item in section 9. **WHAT IS NOT DONE HERE, AND IS NOT AN OVERSIGHT**: `schemas/intake/site.schema.json` still declares `required: ["scenario", "url", "homepage_render"]` under `additionalProperties: false` and therefore still rejects what this section now admits, its edit being SPECIFIED on a backlog row and NOT APPLIED because it is hub-contract stamped and held byte-identical on four live hub surfaces; §1.1's self-serve door still declares a URL, which is an open row; and the `legal.controller` write path from form to brief to `site.config.privacy` does not exist, which is a third. **AND §2's SHAPE BULLET IS A PARTIAL ENUMERATION AS OF THIS VERSION AND IS DELIBERATELY NOT WIDENED**: it names *site-backed* and *social-only*, both of which presuppose a readable surface, and removing the gate admits a builder with neither. The plan states no third value, minting one here would be the withdrawn third state arriving under another name, and the absence has a home in §8's record. **RAISED, NOT RULED.** Plan: `prompts/dispatch/plan-intake-reshape-2026-08-20.md` v4.0, after two attack rounds, 52 findings and 25 HIGH, of which this version is mostly what survived. No n=1 markers added: the marker SENTENCE is one of the four questions reserved to the operator on the provenance ladder's row. Rides **site-contract 1.8.20 -> 1.8.21**; the builder is run and the contract stamped by the controller in a follow-on commit, so `contracts-sync-check` is RED on this commit by design. **AMENDED BY THE CONTROLLER BEFORE STAMPING, on the worker's own refusal**: the SHAPE bullet was a TWO-value enumeration over a case this section now admits, a builder with neither satisfaction, and the worker declined to mint a third value on the ground that it looked like the twice-refuted third lane state. It is not, and the difference is stated in the bullet: a SHAPE is read off the submission and a stranger can check it, where a lane outcome rests on whether the agent went and looked, which nothing can witness. **`no-surface` is named**, because a partial enumeration leaves every later reader inventing their own word. Amended into this entry rather than taken as a v0.9.1, the version being unshipped and unstamped at the time.
- **v0.8.0 — 17 Aug 2026:** **The live-site premise is removed: this standard no longer assumes a rendered live site exists, and now says which SHAPE a builder is in before lane 1.** NINE edits *(SEVEN until 17 Aug; the scope went seven to ten on three worker refusals, all three upheld and two of them the controller's own defects, plus a concept-shaped re-sweep the phrase-shaped one could not do. The tenth edit is in `prompts/builds/site-build.md`, which is FREE and unstamped and rides no bump.)*. §2's **two** Required inputs (URL, homepage PDF / print) collapse to **ONE** requirement, *a live surface the lanes can read*, with two satisfactions: a **website**, or a **social presence plus a GBP place**. §2 gains the **shape** the trigger records — **site-backed** or **social-only** — which is a **VARIANT of this intake, not a second intake path** (operator ruling, Gate 0.18, `docs/rulings/ruling-gate0-2026-08-16.md` R3, on the principle *fork when the OUTPUT differs, patch when only the INPUT does*; the same move §1.1 already makes for the public door). §2's optional-logo bullet stops treating the mark as sourceable from a rendered site; §3 lane 3's input becomes **a render of the live surface** rather than the homepage PDF specifically; §7's Logo standing default drops the *extracted from the rendered live site* premise, its *never a text stand-in* rule **untouched**; §1's Scenario-2 trigger cell and §1.1's by-hand clause stop declaring **a URL**. **§6 GAINS THE TWO PREMISE CLAUSES THE FIRST PASS COULD NOT REACH**: the **Brand-extraction** premise, *it has to be read from a render*, now says a rendered live site is not assumed and that the render is of whatever live surface the builder has; and the **Logo** bullet's *the build agent sources the mark from the live site it reads* is made CONDITIONAL on such a site existing, the provenance rule inside it preserved word for word and a social-only builder's mark left explicitly unsettled here. **THE PROVENANCE HALF OF §6 IS UNTOUCHED**: the *Assets referenced, not claimed* bullet, and everything about where an asset may come FROM, is **site-contract 1.8.21** — so §6 still states rendered-live-site provenance that §2, §7 and its own two premise clauses no longer assume. **That contradiction is NARROWED AND NOT CLOSED, and is a stated cost rather than an oversight**: what survives is a pointer whose target is one bump behind, for one bump. Plan: `prompts/dispatch/plan-site-1820-2026-08-16.md` v1.7 §0a, the operator's split ruling as applied. **The n=1 marker is carried by the seven rule-bearing edits and is PENDING operator approval.** Promoted: **site-contract 1.8.19 → 1.8.20**.
- **v0.7.3 — 29 Jun 2026:** §6 logo rule promoted from a stated "verify check" to a **mechanically enforced** one — `verify.mjs` [6] now fails a text-only logo unless `site.config` declares `brandMark.kind: "wordmark"` (default `image`). No rule change; closes the enforcement gap that let a text wordmark ship. Promoted: site-contract 1.6.12 → 1.6.13.
- **v0.7.2 — 29 Jun 2026:** §2 trigger gains an **optional skin** input — a named preset from `AISmithFactory/aismith-skins` or a custom/brand skin via `folder=`, authored by Claude Design (agent-fleet §3A). Skin = brand (tokens+fonts+logo) + module selection; content stays the lanes' job (§4 precedence unchanged). Promoted: site-contract 1.6.8 → 1.6.9.
- **v0.7.1 — 29 Jun 2026:** Coherence fix after v0.7.0. §1.1 public-door bullet reworded — it no
  longer attributes the removed "build only where contact is reasonable" rule to §6; the door is
  now stated as the **§6 exception** whose approval confirms a legitimacy/consent basis for
  third-party/at-volume submissions (the containment gate covers operator runs). Pairs with
  `as-site-build-agent.md` §4 v0.5.1 (named people **used by default**, not brief-gated). Promoted:
  **site-contract 1.6.5 → 1.6.6**.
- **v0.7.0 — 29 Jun 2026:** **Prospect-concept consent model — names default flipped.** §7
  Names/people default **held → used**: a concept now ships **all public information including
  named people** by default (owners, team, public reviews), no-fabrication still binding (a name
  must come from a real public source). §6 **Consent** reframed from a prior-invitation
  precondition to the **containment gate** as the basis — build any public site for outreach;
  protection is `noindex` + **operator-reviewed before the owner sees it** + **owner-gated
  go-live**. The **public self-serve door keeps its §1.1 approval gate** (third-party submissions
  at volume). Go-live **owner-confirms names** (personal data). Promoted: **site-contract
  1.6.4 → 1.6.5**; the Workshop trigger `prompts/builds/site-build.md` v4.0 → v4.1 matches.
- **v0.6.0 — 28 Jun 2026:** **Gate removed — the run is end-to-end.** §7 rewritten: there is **no
  human gate between discovery and a deployed `noindex` demo** and **no pre-host sign-off** — the
  operator-initiated run applies a **standing-defaults** table (publicly-sourced hours shipped
  unverified for the demo — read via Chrome, not held off; names held by
  default, brief may override on; monochrome accent; free font stand-ins; real logo extracted; real
  photos reused) and ships itself to `<slug>.demos.aismith.io`; the **human review moved to
  post-build** against the live demo + the §9 review list (noindex contains a wrong concept). §6
  asset rule hardened to a **verify check**: real live-image URLs reused, **no generic
  placeholders**; logo is the **extracted live-site mark**, a **text-only wordmark is not an
  acceptable stand-in** (fixes the text-only logo from the test run). §9 deploy noted as
  **no-human-pause**. The §1.1 public-door operator approval is **retained** — it is the one
  deliberate pre-run gate, for anonymous third-party submissions only. **Demo posture clarified:** a
  concept ships **completeness of public data** (no client input) and **wrong public data is an
  asset** (the client sees it first); no-fabrication forbids *inventing*, not *displaying real
  public facts that may be wrong*; the closed-door rule is **go-live-only**. The **GBP Places `facts`
  function is [DEFERRED]** (scoped + shelved); the facts lane reads the public GBP record via
  Chrome for now (the sanctioned API is the path only for the unattended self-serve door).
- **v0.5.4 — 23 Jun 2026:** Demo-subdomain convention reconciled to one form — `<slug>.demos.aismith.io` (Netlify-DNS-delegated), matching §9, spine S8.2, the build agent §3, and the fleet host model. §1.1 and §6 had carried the stale `<slug>-site.aismith.io`. No behaviour change; removes a contradiction the Workshop would otherwise inherit via the contract.
- **v0.5.3 — 23 Jun 2026:** §3 hardened — **thin ≠ off**: for a Scenario-2 concept the five lanes are mandatory (live-site read via Claude-in-Chrome, GBP/Places facts, enrichment search), not optional; skipping a lane to build from one supplied doc by inference is a no-fabrication failure, not a thin result. (Closes the gap the café-Kamiel test run exposed.)
- **v0.5.2 — 22 Jun 2026:** Logo downgraded from "Required (capture floor)" to **optional** — the build agent reads the live site via Claude-in-Chrome, so a screenshot capture floor is unnecessary; a high-quality source file is still used as an exact asset when supplied.
- **v0.5.1 — 22 Jun 2026:** Reconciliation with the repo's café-Kamiel thread — ported the
  intake discipline onto the v0.5 (A+B+F) base: **full page inventory / no Home+Info stub /
  capture-built-into-route**, the **logo capture-floor** (screenshot floor for a prospect, no
  text stand-in), and the **`contact@aismith.io`** catch-all default for concepts.
- **v0.5 — 22 Jun 2026:** Folded proposal item **F** (host model). §6 + §9 deploy now target
  **Netlify (Pro)** instead of Lovable publish; demo subdomains move to `<slug>.demos.aismith.io`
  (Netlify-DNS-delegated). Scenario-2 manifest expectation flipped to `host: "netlify"`
  (`lovable` only for the SK legacy exception). Demo→production is still `noindex` + domain, no
  host move; Supabase Edge Functions backbone unchanged.
- **v0.4 — 21 Jun 2026:** Public self-serve intake + approval gate folded in (proposal items A + B,
  from `as-frontend-rethink-proposal-REVIEW.md`). New §1.1 — a **public self-serve door** is the
  **automated front of Scenario 2** (same brief schema, not a third scenario), fenced by an
  **operator approval gate**: approval is a **login-gated button POST, never an email link** (scanners
  pre-fetch links), and approval is **where the §6 consent guardrail is enforced explicitly** (the
  public door invites third-party-URL submissions). The **payment gate is recorded [PARKED]** —
  designed-for, not built: Stripe stays the hub money rail, and the public paid endpoint is guarded by
  the same approval gate + URL validation, not bought past. Also folded the **G pointer**: §1.1 notes
  WordPress conversion runs intake's extraction front-end + adds a migration plan (see
  `as-site-build-wp-conversion.md`) and is **not** a third scenario (refinement A2).
- **v0.3 — 18 Jun 2026:** Functions backbone folded in (from `as-host-model-addendum.md`,
  superseding the per-site Supabase of v0.2). §6 — a concept connects to the shared
  `AISmith-functions` project from the start (stateless: no per-site Supabase, no tables) and
  the default contact is the **function-backed form**, newsletter off; statelessness is the gate
  (store data → its own new account first). §9 deploy + manifest expectations updated
  (`site_supabase: "shared-functions"`, `server_runtime: "supabase-edge-functions"`; production
  flip is `noindex` + domain only, no backend change).
- **v0.2 — 18 Jun 2026:** Host model folded in (from `as-host-model-patch.md`). §6 reframed —
  one site built as production from day one on **Lovable publish (Business)** + the site's own
  **functions-only Supabase**; concept privacy default is now **`noindex`, shareable** (so the
  client can share the link for feedback) with the password **optional, not default**; the real
  control is `noindex` (meta + header), not a robots `Disallow` or sitemap omission. §9 deploy
  + manifest expectations updated (`host: "lovable"`, `noindex: true`, `site_supabase`). Places
  API key location pointer corrected to the blueprint §1A/§1B (site Supabase secrets, via edge
  function).
- **v0.1 — 18 Jun 2026:** First draft, derived from the café Kamiel intake run. Established
  the two-scenarios-one-brief model, the trigger input set (URL + homepage PDF required, logo
  recommended, intent optional), the five lanes, the precedence order, the GBP-authoritative
  facts hierarchy with the discrepancy flag, the brand rules (render-mandatory, colour
  AA-conformed, copy to voice, logo exact), the prospect guardrails (with the real
  keep-it-out-of-search controls and the password-for-duration requirement), the gate
  contract, and the brief schema.

---

*Companions: `as-site-spine-standard.md` (the build contract the