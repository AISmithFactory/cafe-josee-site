# Report to the Factory: a social-only client is a different intake shape

**From** the cafe-josee build session, Client (Site) Workshop, 14 August 2026
**Against** `prompts/builds/site-build.md` **v4.6** and `dist/site-contract/as-site-intake-standard.md` **v0.7.3**
**Read from** a fresh sparse reference cache at Factory main `e0d91cd`, site-contract **1.8.18**
**Status of the run** complete. Repo `AISmithFactory/cafe-josee-site`, six routes, `npm run build`
green, `verify.mjs` exit 0 across [0] to [6], deployed noindex to `cafe-josee.demos.aismith.io`.

This is the half of the run written for the Factory rather than for the client. It is written
step by step because a summary would lose the thing worth having: **which sentences in the
runbook could not be executed as written, and what was put in their place.**

---

## 0. Two things about the cache, before the substance

**The cache command is correct and its scope check passes clean.** `rm -rf` then
`--depth 1 --filter=blob:none --no-checkout` plus the `/dist /agents /prompts/builds` sparse
set produced exactly `dist`, `agents`, `prompts` at top level, 2.2 MB, zero root-level
`as-*.md`. Everything this build read was in it.

**One correction to carry.** `prompts/builds/site-build.md` v4.6 names `agents/site/verify.mjs`
in three places. The real path in the cache is **`agents/audit/site/verify.mjs`**. The seed
repo's own README repeats the stale path. A build that copies the invocation out of the runbook
gets "cannot find module", which reads as a broken gate rather than a stale path.

**One observation, not a defect.** The brief pinned Factory main at `bbc538a`; the fresh clone
came up at `e0d91cd` (a dispatch v1.1 commit timestamped 20:30 CEST, minutes before the clone).
Main moves during a session. Nothing this build reads changed between them.

---

## 1. What the missing URL actually broke, step by step

### 1.1 The trigger could not be typed

> "**REQUIRED** - URL (the web address). Drives the live-site read, the GBP facts call, and the
> enrichment search."
> "Slug from the domain."

Café Josée has never had a website or a domain. There is no URL to put in the trigger and no
domain to derive a slug from. Both were supplied by the operator instead: slug `cafe-josee`,
derived from the trading name.

**This is not a thin lane. It is a missing input on a required field.** The runbook has no
branch for it, so the run could only proceed on an operator-adapted trigger. **Substituted:**
two rendered social URLs plus the GBP place, handed over explicitly.

### 1.2 Lane 1 (Content) had no page inventory to read

> "Content - their LIVE site via Chrome: the **FULL page inventory** (build every page, not a
> stub), copy extracted as facts and rewritten to spine voice, and each page's IMAGE URLs."

There is no page inventory. A site tells you its own structure; a social feed does not. What
Instagram and Facebook give instead is a **reverse-chronological stream with no hierarchy**,
where the important facts are scattered across 896 posts and the most important one is three
weeks deep.

**Substituted:** the page set was **designed from the offer**, not discovered from a structure.
Their own Facebook bio ("koffie, brunch, lunch, taart en apero") was treated as the site's
implicit sitemap and became `/`, `/drankkaart`, `/apero`, `/het-cafe`, `/praktisch`.

**And this is where the runbook's completeness rule quietly inverts.** "Build every page, not a
stub" is a rule against *under*-building what exists. With no site, there is nothing to
under-build, and the risk flips to **over**-building: inventing a page set the business never
asked for. The discipline that actually applied was the opposite one, and the runbook does not
state it.

### 1.3 Lane 1's image URLs are a real, hard failure

> "each page's IMAGE URLs" ... "photos reused by their live URLs (no generic placeholders)"

**This instruction cannot be followed from social, and the failure is silent until later.**
Instagram and Facebook both serve images from CDNs that **sign their URLs and expire them**.
The Chrome tools returned `[BLOCKED: Cookie/query string data]` for exactly this reason. A page
built on those URLs renders correctly on the day it is built and shows broken images within
days, which is the worst possible failure mode for a demo left with a prospect.

**Substituted:** the seven photos on this demo are the cafe's own photos referenced by their
**Google Business Profile CDN URLs** (`lh3.googleusercontent.com`), which are unsigned, stable
and verified to hotlink cross-origin from the deployed Netlify origin. **For a client with no
website, GBP is the only durable public image origin there is.**

### 1.4 Lane 3 (Brand) survived, and it is the surprise of this run

> "Brand - the homepage PDF/render: colour, type, layout, the mark."
> "the real logo is MANDATORY - extract the mark from the rendered site."

Social carried this lane **better than a small business website usually does**. The Facebook
profile image is a photograph of Café Josée's own printed card: two teal cups stacked over a
green dome, the name in a coral brush script, on cream stock. That is the whole identity in one
image, and it is a primary source.

**Substituted:** the mark was extracted from that photograph and keyed off its printed ground
into a transparent PNG. Colours were sampled from the pixels (`#0295A5`, `#0D9A62`, `#F0605E`)
and mapped to AA-conformed token roles. `verify.mjs [6]` passes on a genuine image mark; **no
`brandMark.kind: "wordmark"` declaration was needed.**

The honest caveat: it is a photograph, so the mark carries paper grain, and the coral script was
not extracted (the capture cut it off). Both are on the go-live list.

### 1.5 Lane 2 (Facts) was untouched, and it did the heaviest lifting

The GBP read ran exactly as written and settled everything: name, address, phone, hours,
category, price band, rating, dine-in. **It also settled the address dispute the brief flagged,
and both aggregators turned out to be half right**: GBP puts the cafe at Vosstraat 2 on the
corner of Gitschotellei, the Maps panel shows Te Boelaerpark directly opposite, and the cafe's
own Facebook bio says "aan het Te Boelaerpark". One place, two descriptions.

**The unexpected finding is that GBP and their own Instagram bio agree line for line on hours** -
unusual, and worth telling them. A third source, borgermap.be, still publishes a 2022 take-out
era record that is wrong in every cell.

### 1.6 Lane 4 (Enrichment) worked, and the ownership rule did real work

The lane found the establishment history the brief hoped for: Café Josée was one of the first
new addresses in the Boelaerbuurt as the neighbourhood revived; the corner, the parks, the three
districts. All of it about the establishment.

It also found, in their own feed, a farewell post from the **previous** owner naming her
takeover date, her two named predecessors and her cook. **Every one of those is a fact about the
cafe that is not a fact about the people the operator is meeting tomorrow.** The rule held:
**no person is named anywhere on this site.**

One thing the lane did that the runbook does not anticipate: **enrichment on a social-only
client returns the client's own archive, spanning previous ownership, mixed in with the current
one and dated only by post.** On a website the copy is current by construction. On a feed, half
of what you read belongs to someone else and looks identical.

### 1.7 The find that justifies the whole build

Buried three weeks into the Instagram feed, posted 18 July 2026 and confirmed 11 August:

> "Vanaf 14/08 openen wij elke vrijdag en zaterdag de deuren van 17:00 tot 23:00 uur voor de
> ultieme aperitief."

**The evening service starts today, 14 August 2026, and it is on none of their public records.**
Google still says the place shuts at 16.30. Their own Instagram bio still lists daytime hours
only. Anyone who checks before coming out on a Friday evening is told they are closed.

That fact is the demo's headline, has its own route, and is precisely the "wrong public data is
an asset" case intake §5 and §7 describe. **It was found by reading a feed, which is the one
thing a social-only intake does better than a site read.**

---

## 2. The answer to the question asked

**Yes. A social-only client is a different intake shape, not the same shape with a thinner
content lane.** Four reasons, in order of how much they cost:

1. **The required input is absent, not thin.** URL is a required field with no branch. The run
   only proceeded because a human rewrote the trigger.
2. **Content and Brand invert.** On a site read, Content is the reliable lane and Brand is the
   one that needs a render. Here Brand was **the strongest lane** (the mark is published as a
   profile image) and Content was **the weakest** (no structure, no hierarchy, no inventory).
   The runbook's ordering assumes the opposite.
3. **The asset rule has no valid resolution.** "Reuse their live image URLs" is unfollowable,
   and the failure is delayed and silent. This needs a stated fallback, not builder judgement.
4. **Enrichment changes character.** It stops being "the warm detail their site omits" and
   becomes "their own multi-owner archive, undated by ownership." That is a no-fabrication
   hazard the current text does not name.

What did **not** change: Facts, Intent, the guardrails, the gate, the seed, the deploy path.
Five of those held without a word of adaptation.

---

## 3. What to change, stated as patches rather than prose

Raised for the Factory to rule on. **This session authored nothing in the Factory and opened no
PR against it.** If any of these are accepted, they belong in `templates/contract-patch.md`.

**P1. `as-site-intake-standard.md` §2, the trigger.** Change "Required - URL" to
"**Required - the live surface.** A website URL where one exists. Where the business has none,
the rendered social profiles that serve as its public surface, named explicitly, plus the GBP
place." Slug derives from the domain where there is one and from the trading name where there is
not.

**P2. `as-site-intake-standard.md` §3 lane 1 + §6, the asset origin.** State the fallback
ladder: their own site's URLs; failing that, **their Google Business Profile CDN URLs**; failing
that, files supplied by the owner. And state the reason out loud: **Instagram and Facebook CDN
URLs are signed and expiring and must never be referenced from a built page.** This is the
single change that would most reduce risk, because the current rule fails silently and late.

**P3. `as-site-intake-standard.md` §3 lane 1, completeness.** Add the inverse of "build every
page": where no page inventory exists, the page set is **designed from the offer** and stays
minimal. Name the risk as over-building, not under-building.

**P4. `as-site-intake-standard.md` §3 lane 4 + §7, dated provenance.** Where the enrichment lane
reads an owned archive rather than third-party writing, **every fact carries the date of the post
it came from**, and any fact predating a change of ownership is checked against a current source
before it ships or is dropped. The ownership rule this session was handed by hand should be
canon, not a per-brief instruction.

**P5. `prompts/builds/site-build.md` v4.6, the verify path.** `agents/site/verify.mjs` to
**`agents/audit/site/verify.mjs`**, three occurrences, plus the seed README. Mechanical.

**P6. A note the runbook should carry about the sandbox.** The `npx @netlify/mcp` deploy needs a
few hundred MB and the shared disk was at 100% mid-run. An ENOSPC during that install leaves a
**corrupted `_npx` tree that then fails with `MODULE_NOT_FOUND` rather than a disk error**, which
sends you looking for a dependency bug. Clear `_npx` and retry.

---

## 4. Would I show this site to someone

Yes, and I would lead with the apéro finding rather than the design.

Six routes, all built, none a stub. The whole drinks card with real prices. Their real mark in
the header. Seven of their own photographs. Hours that match their own two current sources, with
the disagreeing third one written into the review list. Dutch throughout, no switcher. Not one
invented fact, and not one person named.

The gaps are honest and they are all on the go-live list: no food menu is public so the food is
described and not priced; apéro prices are not public so the page says nothing rather than
guessing; the photography and the mark are referenced rather than supplied; the contact form
points at the AI Smith catch-all and its origin still needs registering in `CONTACT_TENANTS`.

**The strongest argument for the site is not the site. It is that a stranger reading only public
sources found something true about their business that their own public record does not say.**
