# AI Smith -- Stack Blueprint for Parallel Projects

Version 1.34 -- 15 October 2026

> Tech and tooling defaults for any new project Simone spins up under the
> AI Smith umbrella. Tightened against the Zuidgeluid gap analysis (May
> 2026). Companion: `as-project-playbook.md` -- how to *run* a project on
> this stack (IA, content migration, multilingual, sector extensions,
> governance, accessibility, budget). The blueprint stays stable for
> years; the playbook evolves per project and per sector.
>
> Worked examples: simoneskitchen.com / SK Hub (food, restaurant ops),
> knowthyselfapp.com (wellness app, no WP). Defaults below are the
> current best guess; SK's historical actuals may differ in places
> (theme, host) -- treat SK as a worked example, not as the canonical
> default.

**v1.34 changes from v1.33:** hub-contract 1.7.23 -> **1.7.24** and site-contract 1.8.32 -> **1.8.33**, the coupled cut (`prompts/dispatch/plan-cut-1724-2026-10-15.md` v0.2 member (6), and Q3 (a) of the operator's ruling of 2026-10-15: site-contract 1.8.33's only content is this file). SS7's deploy checkpoint is ruling 81's (`docs/rulings/ruling-two-tracks-2026-09-24.md` v1.48): its *human merge checkpoint* and *human checkpoint* read *the deploy checkpoint* at the six places that named it (SS1A twice, SS7's deploy-pipe paragraph twice and its enforcement paragraph twice), and SS7 states once that the deploy checkpoint is a merge by a controller seat or by the operator, after the required checks and the review ruling 64 selects, never the merge of the lane that built the change and never unattended; the invariant that no agent or CI session holds an unattended deploy credential stands word for word (ruling 81 (c)). One root file stamped into both tracks, so the site copy moves with the hub copy (the plan's J1). The unstamped twins (`as-agent-fleet.md` v0.14, `agents/support/hub/SUPPORT.md`, `agents/scaffold/hub/CLAUDE.md`) move in the same PR, held by `scripts/deploy-checkpoint-check.py`. No other section moves; SS7's dated live read of 2026-08-04 naming `aismith-hub` stays as history (member (4)). A RECORD for the T3 register (`backlog.md`'s PENDING-PROMOTION row): no rule rides this entry. No em dashes.

**v1.33 changes from v1.32:** hub-contract 1.7.20 -> **1.7.21** and site-contract 1.8.30 -> **1.8.31**, the coupled cut (`prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E15 and E19). SS7's merge run-book stops gating a branch delete on `merged: true` as the normal path: GitHub deletes the merged branch on merge (`delete_branch_on_merge`, set 2026-09-29 on every non-archived repo in `AISmithFactory` and `aIsmith100`), a merge is still confirmed `merged: true` before it is reported, and a branch that survives a confirmed merge is deleted only after every open PR stacked on it is retargeted, which is `docs/controller-role.md` SS0's sentence (R196). **This doc's changelog is classified for the T3 register (R167)**: 25 entries, the 21 top-of-file `changes from` entries and the four archived tail entries (v1.11, v1.10, v1.9, v1.8); 23 are RECORDS whose rules already live in SS1A, SS1B, SS5, SS6 or SS7, and TWO are RULES the body did not state, both PROMOTED to SS7 here with their entries marked where they stand: v1.24 (a), `frontend-check` runs `tsc -b --noEmit --force` with a zero-files guard (SS7's four-gates paragraph still read `tsc --noEmit`), and v1.26's method rule, a parser feeding a required gate is run once against real CLI output before it ships (stated until now only in `hub-deploy.yml` and `docs/operating-gotchas.md`). No em dashes.

**v1.32 changes from v1.31:** SS7's post-merge prod health assertion is described as hub-contract 1.7.18 built it. The deploy job reads `supabase migration list --db-url "$HUB_DB_URL" --output-format json` after `db push --db-url "$HUB_DB_URL"`, on the session pooler with the project's own password in `PGPASSWORD` and no `supabase link`, and fails closed when the history cannot be read; the Trigger-1 adoption precondition reads prod history the same way. Both passages said `migration list --linked`, which no stamped step runs since 1.7.18 (attacker-2's code review of Factory #1158, F10, the controller's ruling). Both contracts move: hub-contract 1.7.18 and site-contract 1.8.30, the site side a ride-along with no site behaviour change.

**v1.31 changes from v1.30:** the abandoned tail (v1.11, v1.10, v1.9, v1.8, four entries under a `*Document Version: 1.11*` footer) is re-labelled so no line parses as a version: each entry now opens `*Archived entry, <date> (was the vN.N tail):` and every other word is untouched; the footer, read by nothing, is dropped. The live changelog is this top-of-file block. `scripts/doc-version-check.sh` declares the file HEADER_ONLY in place of `DISAGREES 1.30 1.11` (operator ruling 2026-09-13 on the worker-2 measurement in #951). Both contracts move as version-only ride-alongs: hub-contract 1.7.5 -> 1.7.6, site-contract 1.8.27 -> 1.8.28.

**v1.30 changes from v1.29:** the SS13 companion list stops pointing at two RETIRED documents. The
studio-bundle companion is DROPPED whole (its content is this blueprint, so there was nothing left
to point at) and the Studio-Programme reference bullet is REWRITTEN as `as-agency-model.md`, the
agency model having been settled there at v1.1: roles, agreements, the platform fee, authorisation,
for external agencies rather than internal projects. Both were retired from
`scripts/doc-version-check.sh` at #943 and this list held the last live pointer at either; neither
filename appears anywhere in this file now, which is the done-when, so this entry names them by
description rather than by path. **Every other `Studio` in this file is Supabase Studio** (the SQL
editor) and is untouched; a mechanical rename here would have been the defect rather than the fix.
**The abandoned 1.11 tail was commissioned for re-labelling in the same pass and is NOT done**:
measured with the checker's own TAIL grammar this file carries FOUR entries (1.11, 1.10, 1.9, 1.8)
rather than the single stray the ruling assumed, so re-labelling one leaves three and `HEADER_ONLY`
is false; the declaration in `scripts/doc-version-check.sh` stays a DISAGREES and takes this bump's
header figure, and the limb is raised for the controller rather than resolved here. VERSION-ONLY
RIDE-ALONG on both tracks, no hub-side and no site-side behaviour change. Re-synced dist:
hub-contract **1.7.5**, site-contract **1.8.27**.

**v1.19 changes from v1.18:** frontend-stack ruling (2026-07-14) -- the default is now **by surface, not by creation date**. Authenticated surfaces (hubs, assistants, app cores) default to **Vite + TanStack Router (client-side SPA)**; **TanStack Start + SSR** is reserved for public/SEO surfaces (sites). Rationale: the SSR default was inherited from Lovable (retired) and its only real win (SEO) is a public concern; client-side gives one governed server surface (Edge Functions only), the canonical Supabase JWT+RLS auth, simpler static hosting, and a natural PWA shell. Contract-safe (spine Cv0.4: SSR is an enhancement, not a contract). Consequences: oli-hub matches the new default (hub-seed base); SK = router-swap owed; ZG = tolerated Start variant. §1A note + Frontend bullet + surface table + §1B SSR clarification updated. Re-synced dist: hub-contract v1.5.9, site-contract v1.6.15.

**v1.20 changes from v1.19:** deploy standard tightened to the **hybrid** (operator 2026-07-25). The GitHub Action (`hub-deploy.yml`) is now the **sole production deploy path**; Supabase native branching is demoted from a co-sanctioned *alternative pipe* to an **optional preview-only layer** run with Supabase **"Deploy to production" OFF** (previews keep their per-PR DB advantage; prod is written only by the Action, so the two never race). §1A deploy line + §7 heading/opening/(a)/(b) updated; `hub-deploy.yml` header updated -- no workflow-code change, it already does `db push` + `functions deploy`. ZG adopted it (Deploy-to-production toggled OFF, 2026-07-25). Re-synced dist: hub-contract v1.6.1, site-contract v1.6.16.

**v1.21 changes from v1.20:** ZG deploy-pipe contract patch folded (reconciliation bucket 4, operator 2026-07-25): SS7 gains the migration-authoring rule (storage bucket/object changes = Storage-API / operator steps, never SQL migrations; prod-only rejection of storage.objects DML was the trigger) + the post-merge prod health assertion (schema_migrations HEAD on prod == repo HEAD; a frontend deploy is never evidence the DB moved). The pilot's third recommendation (preview-branch as authoritative validation) is already covered by the v1.20 hybrid doctrine. Re-synced dist: hub-contract v1.6.2, site-contract v1.6.17.

**v1.22 changes from v1.21:** the CI/deploy bucket-4 bundle folded (reconciliation 4a-4d, operator 2026-07-27). SS7 gains **two new PR gates in `hub-deploy.yml`** -- `frontend-check` (`tsc --noEmit`) and `deno-check` (`deno check` over `supabase/functions/*/index.ts`) -- closing the ungated lanes the deploy split leaves behind: the Action owns db + functions while **Netlify owns the frontend and fails fail-safe-but-silent**, so a hub could ship an unbuildable frontend to `main` with no red check and serve stale UI in prod (ZG `f0f1340` / hub PR #73; Factory issue #111 for the functions half). Both land **non-required and staged** -- marking them required in the same pass that introduces them bricks the merge path of any hub carrying type debt. The standalone `migrations-check.yml` is **dropped from the contract** (4a: duplicated the in-file job with no unique guard; 4 of 5 hubs never carried it), leaving `hub-deploy.yml` as the single stamped CI template, and the "TWO migrations-check runs" run-book note is superseded. New **Edge-function imports** section: `npm:`/`jsr:` pinned specifiers, never esm.sh -- generalising the pdf-lib rule after an esm.sh 522 outage aborted ZG's prod deploy (`ba21094`); it also hardens `deno-check`, which resolves remote imports. Re-synced dist: hub-contract **v1.6.3**, site-contract **v1.7.1** (the blueprint is shared; the site track takes the version bump only, no site-side behaviour change).

**v1.29 changes from v1.28:** the **Phase C batch**, five edits to one file because it is stamped
into BOTH contracts and every edit to it costs the same bump (hub-contract **1.6.29** /
site-contract **1.8.18**). **(1) The flat $20/mo was false and the correction was pointed at the
wrong lines.** The plan said to preserve TWO changelog occurrences and rewrite one body line; it is
the inverse -- lines 162 and 228 stated the price as live fact, and the single changelog hit sits
inside the ABANDONED pre-v1.12 tail that `scripts/doc-version-check.sh` explicitly refuses to
register this file for. So the tail is preserved and MARKED, and the two live statements are now
written as a RATE. **A flat figure in a stack document becomes the number every estimate inherits.**
**(2) The host decision record**, with the measurement rather than the conclusion: build minutes ran
19, then 365, then 48 in two days, while web requests went 13K, 84K, 7.6K. **Requests FELL while the
bill rose, so the driver is the fleet's own CI and not its audience**, and the remedy is a build
`ignore` rule rather than moving twelve projects to answer a question that was never about the host.
Both directions of that rule are proven against Netlify on one repo, and the excluded set is
recorded as NOT travelling. **(3) SS7's self-commit verify-by moves from JOB level to STEP-level
REACHABILITY.** Third scope correction on one rule in three days -- file, then action, then step --
and they trace one shape: each fix was correct and the next blind spot was one level down. Run
literally, the job-level test flagged the very file the rule was written from. **(4) The
`deno-check` `v1.x` pin carries its reason.** At Deno 2.9.4 a repo-root `package.json` puts Deno
into byonm mode and `deno check` fails on every `npm:` specifier, so the pin is the only thing
keeping a required gate green on every hub, and Deno 1.x is EOL. It was raised as an observation
rather than a defect, which is why nothing was owed against it. **(5) A status surface must not
share a failure domain with what it reports on:** pull is the floor, push is detail, three states
not two. **NOT in this bump, and measured before dropping rather than assumed: the Lovable sweep's
§1/§3/§4/§6 product-surface half, which the plan carried as owed.** v1.16 deferred it and **v1.17
completed it**; every remaining Lovable mention in the body was read this pass and each is a
historical example or an already de-branded reference. The plan inherited v1.16's deferral note
without checking whether the next version discharged it. No gate added or promoted. No em-dashes in
what this entry adds.

**v1.28 changes from v1.27:** the **self-commit rule** (SK contract patch 2026-08-03, folded 2026-08-04). **A workflow does not commit to a pull-request branch with `GITHUB_TOKEN`; it asserts drift and fails.** Verified against GitHub's own documentation rather than from memory: *events triggered by the `GITHUB_TOKEN` will not create a new workflow run*, and the sole `pull_request` exception is a workflow that OPENS or UPDATES a PR, which even then lands approval-required. SK's `gen-types.yml` commits a regenerated `types.ts` onto the branch under review, so its four required checks cannot run on the resulting head: hub PRs **#66** and **#70** each reached a head with **0 of 4 present and no way to acquire them**, and both had to be unblocked by a human commit -- visible in the record as a human-authored final commit on each. **#61 survived only because the bot commit landed mid-stack and a human commit followed it**, which is luck, and it made the lane look healthy. **The block is the benign outcome.** The dangerous one is a maintainer merging on four greens earned by the PRE-BOT commit, which is the 1.6.5 and 1.6.7 family one layer out: **not whether the checker is right, but whether it ran on the artifact that ships.** **This is the same file and the same argument as v1.27** -- a rule scoped to a stamped file leaves hub-authored workflows unreached -- so it binds every workflow in the repo and Trigger 1 greps the tree. **The Factory re-took SK's fleet enumeration and found one more self-committer than the patch listed**: three, not two, with `aismith-status/update-status.yml` joining `gen-types.yml` and `contact-export.yml`; only SK's is `pull_request`-triggered, so only SK is affected today and the class is growing. **§7B cannot reach this**: it binds *required* to *what runs*, and SK satisfies it completely at four and four -- nothing relates the required set to the commit that ships. Remedy keeps the browser-only operator path: the `pull_request` arm fails on drift, the `workflow_dispatch` arm already pushes a `chore/` branch for a human to open a PR from. A re-triggering PAT was rejected on the §7A credential topology and for fixing one instance while leaving the class. **No gate added or promoted, so no hub's merge path changes on adoption.** Re-synced dist: hub-contract **v1.6.27**, site-contract **v1.8.16** (blueprint shared; no site-side behaviour change).

**v1.27 changes from v1.26:** the **setup-cli scope correction** (SK contract patch 2026-08-01, folded at reconciliation v0.32). The 1.6.5 pin rule was scoped to a FILE (`hub-deploy.yml`) rather than to the ACTION, which put every hub-authored workflow outside its reach; SK pulled 1.6.8 clean and still carried an unpinned `supabase/setup-cli@v1` in its own `gen-types.yml`, generating and committing the `types.ts` that `frontend-check` typechecks against -- two CLI versions describing one schema, with the drifting half producing the tracked artifact. SS7 gains a standing rule: the pin + `github-token` bind every invocation in `.github/workflows/**`, and Trigger 1 greps the tree rather than the stamped file. SK raised it rather than fixing it locally, per the #59 precedent that the Factory folds these corrected. Re-synced dist: hub-contract **v1.6.9**, site-contract **v1.8.4** (blueprint shared).

**v1.24 changes from v1.23:** the **required-gate bundle** folded (reconciliation v0.25 bucket 4, 2026-07-28). One theme, three symptoms: a required gate whose result carries no information about the change it guards. (a) `frontend-check` moves from `tsc --noEmit` to **`tsc -b --noEmit --force`** plus a zero-files-checked guard -- bare `tsc` does not follow project references, so on a solution-style `tsconfig.json` it compiled the root project's empty file list and exited 0, green through the entire life of a real type error (SK hub PRs #55/#57/#58; verified at TS 5.6.3/5.8.3/6.0.2, and `--force` is required for the guard because `-b` skips up-to-date projects and a skipped project lists no files). (b) `supabase/setup-cli` is **pinned to an explicit CLI version and passed `github-token`** -- `version: latest` resolves through an unauthenticated GitHub API call, so the required `migrations-check` went red on a docs-only PR with "rate limit exceeded" before reading a migration (ZG hub PR #95). (c) the **post-merge health assertion gains a Trigger-1 adoption precondition** (read `migration list --linked` and repair `only_remote` versions before arming it), since it lives in the deploy job and cannot land non-required. Plus (d) SS7 gains the **no-prune rule**: a deployed function outlives its repo directory, the Action now fails on an orphan, and removal is explicitly two steps with the `functions delete` left as an operator action. Re-synced dist: hub-contract **v1.6.5**, site-contract **v1.7.3** (blueprint shared; version bump only, no site-side behaviour change). *(Part (a)'s rule PROMOTED to SS7's four PR gates at v1.33, R167; this entry stands as written.)*

**v1.26 changes from v1.25:** orphan-gate parser fix (contract patch #149, raised + fix proven by ZG as hub #129 after the gate's FIRST live run failed a healthy prod): the `functions list` parse now drops the table separator row (`$2 !~ /^-+$/`), which is |-separated dashes and read as a phantom orphan named `-----`, turning the gate red AFTER `db push` + `functions deploy` on every deploy of every 1.6.7 hub. Method rule recorded in the template: a parser feeding a required gate is exercised once against real CLI output before it ships -- this one had no live run between authoring and prod (the #135 class: a gate asserting nothing it verified). (v1.25 = Cloudflare-DNS first-mover note, 2026-07-30.) *(The method rule PROMOTED to an SS7 bullet at v1.33, R167; this entry stands as written.)*

**v1.23 changes from v1.22:** the migration-ordering bundle folded (ZG hub PRs #75/#80/#81, 2026-07-27). SS7 gains a **fourth PR gate, `migration-order-check`**: a new migration's 14-digit version must sort after every migration already on `main`, and migrations already on `main` may not be edited or deleted. Two sibling branches cut from the same base each stamp "now"; whichever merges second is older than prod's history, so its `db push` is **refused after the merge**, with prod already moved (the versioned-artifact collision rule, made mechanical). The **post-merge prod health assertion** stops being a run-book step and becomes a **step in the deploy job**: `supabase migration list --linked` after `db push`, failing loudly on any version present on one side only -- local-only means the push did not land, **remote-only means something other than this Action wrote prod, or a run recorded a version then failed part-way**. Paired with a new evidence rule in the audit prompt: a `schema_migrations` row is **not** proof the DDL ran, so a phantom row is never fixed by renaming a file to match it. Gate lands **non-required** per the 1.6.3 staging rule; it self-skips when the PR touches no migrations. Re-synced dist: hub-contract **v1.6.4**, site-contract **v1.7.2** (blueprint shared; version bump only, no site-side behaviour change).

**v1.18 changes from v1.17:** oli-hub build fold -- added the §7 **merge run-book note**: a PR to a hub `main` fires TWO `migrations-check` runs (the standalone static workflow AND the `hub-deploy.yml` ephemeral-Postgres job, ~4-5 min); branch protection needs BOTH green, so wait for all runs completed+success before merging and gate branch-deletion on the merge API returning `merged:true`. Additive; no change to the §7 pipe invariants. Re-synced dist: hub-contract v1.5.8, site-contract v1.6.14.

**v1.17 changes from v1.16:** Completed the build-path rewrite v1.16 deferred -- the §1/§3/§4/§6 "Lovable-as-product-surface" build sections, the build checklist, and the Lovable-build-tool gotchas are now **agent-direct** (Claude Code authors the repo from `seed + brief`; the long §3/§4 config detail is slimmed and points to `as-site-build-agent.md` §5 / `as-site-seed-instance.md` rather than duplicating mechanics). §1 surface table + §1A "thread" line de-Lovable'd; §3/§4 section titles dropped "Lovable Side"; subdomain/SSL detail re-pointed at Netlify; build-checklist steps now create a seed-scaffold repo + wire Supabase manually; gotchas re-framed tool-agnostic. The **BYO-Supabase** rule is generalised to "never a bundled/managed backend" with **Lovable Cloud kept only as the historical example** of the anti-pattern. **Cost:** the Lovable Pro build-tool line is dropped (net-cheaper hub; authoring cost folds into the existing Anthropic/Claude line). Lovable is retired as the build tool/host; the only remaining Lovable-resident projects are **CrewDen** and **judyportfolio** -- not live, pending migration off. Tool-agnostic stack content (BYO-Supabase `client.ts`/`client.server.ts` wiring, Netlify custom domains, secrets-not-in-`VITE_*`) is kept, just de-Lovable-framed.

**v1.16 changes from v1.15:** Lovable fully retired from the fleet — as both host and authoring tool. §1A/§1B host model: no host exceptions remain (SK migrated off Lovable publish onto Netlify 29 Jun 2026; ZG live on Netlify). §1A authoring collapsed to **agent-direct only** (the paste-loop option struck); §7/§11 Edge-Functions passages now deploy from the repo via the hub deploy pipe (not Studio paste / Lovable's GitHub sync); `.lovable.app` preview caveats de-branded to deployed-URL testing. Sub-processor DPA list: Lovable + its hosting provider removed, **Netlify (US) added**. (Left for a separate pass: the §1/§3/§4/§6 Lovable-as-product-surface build sections and the build checklist — these describe authoring/UI mechanics, not host/live-state, and a clean rewrite is out of this surgical scope.)

**v1.15 changes from v1.14:** recorded that the §7 deploy checkpoint is **plan-dependent** -- the deploy-side twin of the required-check caveat. The `production` Environment's **required-reviewer** rule enforces on a **private** repo only under **Enterprise**; on **Pro/Team** it can't be set, so the **human merge** (gated by required `migrations-check` + admin-enforcement) is the deploy checkpoint, and the env is tracking-only (it activates on an Enterprise upgrade). No-unattended-credential + human-checkpoint invariants hold either way. (Surfaced adopting `hub-deploy.yml` on the `AISmithFactory` Team org.) Re-synced dist: hub-contract v1.4.2.

**v1.14 changes from v1.13:** flipped the §7 hub deploy default after the Lovable exit removed native branching's only per-hub friction. The **GitHub Action (`hub-deploy.yml`) is now the fleet default** for scalability -- per-PR preview-DB cost doesn't scale across many low-traffic hubs; **Supabase native branching is demoted to a co-sanctioned option** (kept for hubs that specifically want the deploy credential out of CI and accept the cost). Closed the default's one correctness gap by adding a **`supabase db start` / `db reset` ephemeral-apply step** to `hub-deploy.yml`'s `migrations-check` job -- migrations run against a real throwaway Postgres pre-merge, no credential, no preview-DB cost. §1A branching line + §7 (a)/(b) updated; `as-agent-fleet.md` §6 pilot wording resolved to match; corrected the stale §1A edge-functions glance line (functions deploy from the repo via the pipe, not manual Studio paste; the Lovable-scoped paste-deploy passages in §7/§11 are left for the separate Lovable-exit cleanup). Re-synced dist: hub-contract v1.4.0, site-contract v1.6.2.

**v1.13 changes from v1.12:** added a "Recovering a drifted hub" subsection to the deploy-pipe section -- a one-time recovery path for legacy/Studio-built hubs already drifted before adopting the pipe (capture-live baseline, no `db pull`, squash baseline, migration repair, verify; SK worked example). Additive; no change to the §7 pipe invariants. Re-synced dist: hub-contract v1.3.0, site-contract v1.5.4.

**v1.12 changes from v1.11:** promoted the Supabase **native-branching hub deploy pipe** from agent-standard into the hub contract after the ZG pilot proved it end-to-end (2026-06-22) -- new §7 "Hub deploy pipe" subsection (two sanctioned pipes, mechanism-independent invariants, BOM/TOML gate, plan-dependent enforcement caveat); §1A branching line promoted from "piloting on ZG" to the sanctioned default. Flows down to every hub via `dist/hub-contract/` (re-synced, hub-contract v1.1.0).

**v1.1 changes from v1.0:**
- Doc split: how-to content moved to `as-project-playbook.md`
- Cloudflare Registrar promoted to default (GoDaddy = legacy)
- Combell promoted to default WP host (Vimexx demoted)
- GeneratePress Premium named as default theme
- Plausible promoted to default analytics (GA4 = legacy / opt-in)
- Complianz promoted to default cookie banner (Cookiebot for multilingual)
- Fluent Forms named (over WPForms Lite)
- Cloudflare WAF replaces Wordfence (pick one)
- Relevanssi added as default WP search
- WooCommerce demoted to conditional
- Brevo added as newsletter default
- Polylang added as conditional multilingual default
- Mollie added as Belgian payment alternative to Stripe
- Anthropic API key demoted to conditional in the checklist
- Supabase Auth + email/password promoted to hub default from day one
  (PIN gate retired as default; only for throwaway prototypes)
- Dutch subdomain naming (`leden.`, `team.`) added for BE-NL projects
- Default hub role taxonomy: admin / coordinator / member / treasurer
- Backup retention stated: 30 days minimum
- WCAG 2.1 AA + Lighthouse 85+ stated as performance targets
- Brand tokens location named: `xx-tokens.md` in project knowledge
- Sub-processors list corrected (Lovable + its host listed separately)
- "RLS is per project" phrasing corrected (RLS is per table/role; the
  separation argument is operational, not technical)
- VAT table reordered (education / cultural / Art. 44 at top)
- Decision criterion added: public Lovable app vs WP-with-iframe-embed
- Gated file storage pattern added (Supabase Storage + signed URLs)
- "No ACF / no CPT-UI / no child theme" softened to "avoid unless a
  maintainer prefers" -- principle, not prohibition

---

## 1. The Shape

Every project has up to three surfaces. Not every project needs all of them.

| Surface | Tech | Audience | URL pattern |
|---------|------|----------|-------------|
| Marketing site | WordPress | Public, SEO | `rootdomain.tld` |
| Public app | Built stack (TanStack Start + Supabase) | Public, authenticated users | `app.rootdomain.tld` or sister domain |
| Private hub | Built stack (Vite + TanStack Router, client-side + Supabase) | Staff / admin / members, gated | `leden.rootdomain.tld` or `team.` (NL) / `hub.` (EN) |

**Decision criterion: do you need a standalone public app, or just WP with an iframe-embedded form from the hub?**

| If the public-facing interactive surface is... | Build it as |
|-----------------------------------------------|-------------|
| A few forms (booking, signup, contact, donation) | WP page + iframe embed from the private hub's `/embed/*` route |
| A stateful application (account, dashboard, assessments, library) | Standalone public app (built stack) |
| Browsing a catalogue with detail pages, no auth needed | WordPress (better SEO + editing workflow) |
| Auth-gated content that users return to repeatedly | Public app (built stack) |

KT skipped WP because it's app-first. SK Hub skipped the public app
because the public-facing surfaces are forms, not stateful apps --
they're embedded into WP via iframe from `hub.simoneskitchen.com/embed/*`.
Most non-profit projects (music schools, community orgs, small
foundations) need WP + private hub, no public app.

The thread that runs through every project:
**Claude for language and the build (agent-direct authoring -- see
§1A), Supabase for state, Stripe or Mollie for money, Resend for
transactional email, Brevo for newsletters.**

**Frontend framework, by surface (ruling 2026-07-14).** The 13 May 2026 flip to
TanStack Start + SSR was inherited from Lovable (which had switched to it); its one real
win -- SEO / public first-paint -- is a *public-site* concern that does not exist behind a
login. With Lovable retired, the default is now **by surface, not by creation date:**

- **Authenticated surfaces -- hubs, assistants, and app cores -- default to Vite +
  TanStack Router (client-side SPA).** For an internal app this is the better fit, not just
  an acceptable one: **one governed server surface** (all server logic in Supabase Edge
  Functions, no SSR render layer to police -- see the spine's Cv0.4), the **canonical
  Supabase JWT-plus-RLS auth model** (no server-side session threading), **simpler static
  hosting** on Netlify (no server runtime, no cold starts), and a **natural installable-PWA
  shell**.
- **Public surfaces -- marketing sites, and any narrowly-scoped public/shareable route of
  an app (e.g. edge-rendered OG cards) -- use TanStack Start + SSR**, where SEO / first-paint
  is the point. A public presence is normally a **separate site app** anyway (`as-site-*`).

**Contract-safe:** the spine already holds **SSR is an enhancement, not a contract** (Cv0.4),
so this changes no C-assertion -- a hub conforms on either stack. Fleet consequences:
**oli-hub already matches** the new default (Vite + TanStack Router) and is the **hub-seed
base**; **SK's** eventual move is a light **router-swap** (react-router-dom -> TanStack
Router), not an SSR migration; **ZG** stays conformant as a **tolerated TanStack Start
variant**, re-platformed to the client-side default when convenient. Both stacks are
TanStack-Router-family, so components + tooling stay shared -- the split is
SSR-only-where-SEO-needs-it, not two worlds.

---

## 1A. The hub stack at a glance

The canonical stack for a private operational hub. The marketing-site layer (§2) is
separate and only used where a public SEO site is needed.

**Frontend**
- **Vite + TanStack Router (client-side SPA)** -- the authenticated-surface default for
  hubs, assistants, and app cores (ruling 2026-07-14; **oli-hub = reference / hub-seed base**).
  **TanStack Start + SSR** is reserved for public/SEO surfaces (sites). Legacy: **SK** on
  React + Vite + react-router-dom (router-swap owed); **ZG** on TanStack Start (tolerated
  variant)
- Tailwind CSS + shadcn/ui
- Build/authoring environment — **agent-direct** (the sole authoring path; both stacks, same
  artifact). **Claude Code authors the repo from `seed + brief`** (validated by the
  proposal-item-E spike: `verify.mjs` exit 0, spine byte-for-byte, conformance-identical to
  the former Lovable build, and free of the three legacy paste-loop frictions — angle-bracket
  stripping on pasted `.tsx`, the 6-files-per-prompt ceiling, and authoring-tool claims of
  changes that are not present). See `as-site-build-agent.md` §5. The host is independent of
  authoring: a repo authored here ships on Netlify (below).

**Frontend hosting**
- GitHub — repo is source-of-truth + the frontend ownership anchor (two-way synced)
- Production serving is **Netlify (Pro plan)** — a $20/mo BASE RATE plus metered
  build minutes, not a flat $20/mo, with unlimited team members, unlimited projects,
  custom domains + automatic SSL (Netlify's April 2026 credit-based pricing). **The
  meter is the part that moves: invoices ran $9, $17, $20, then $33.00 on 3 Aug 2026
  against 12 projects and one member.** Write it as a RATE wherever it is quoted; a
  flat figure in a stack document becomes the number every estimate inherits. Every new front end ships on Netlify (see the fleet host model,
  `as-fleet-organisation.md` §7). **No host exceptions remain:** the **SK hub migrated off
  Lovable publish onto Netlify on 29 Jun 2026** (its Vite-SPA legacy now serves from Netlify
  like the rest of the fleet), and **ZG is live on Netlify**. The old Cloudflare Pages/Workers
  graduation stays **retired**; the SSR/SPA split does not pick a host.
- **Server-side runtime = Supabase Edge Functions.** The hub already runs all governing
  logic + the Anthropic proxy there; that is the runtime for everything server-side.
  **Netlify hosts the front end only — no server logic runs there — and Cloudflare is not a
  host or compute target.** (A stateless
  public site's server-side calls run in the **shared `AISmith-functions` project**, not a
  per-site one; the **Google Places API key**, when a facts function is added, lives in
  **that project's Supabase secrets**, server-side, called from an edge function. See §1B
  and `as-site-intake-standard.md`.)

**Backend (identical on both frontends)**
- Supabase — own project per hub (BYO Supabase, never a bundled/managed backend); transferable on exit
- PostgreSQL + Row-Level Security on every table
- Supabase Auth (email/password from day one)
- Supabase Edge Functions — all hub-owned governing logic; deployed from the repo through the
  hub deploy pipe (§7, behind the deploy checkpoint), never by manual Studio paste or unattended
  auto-deploy
- Supabase Storage + signed URLs
- pg_cron + Queues (pgmq) — scheduled/queued hub-internal work
- Hub **deploy pipe** — the GitHub Action (`hub-deploy.yml`: `db push` + `functions deploy` on merge, behind the `production` reviewer) is the **sole production deploy path**; Supabase native branching is an **optional preview-only layer** (per-PR preview DB, with Supabase “Deploy to production” **OFF** so it never touches prod). See §7 “Hub deploy pipe”.

**AI**
- Anthropic API via an Edge Function proxy — grounded in the hub's canonical
  knowledge; **stays an edge function on every hub, including TanStack ones**
  (decided: it holds a key and is the most cost/security-sensitive path — keep it
  identical across the fleet)

**Payments / email:** Stripe (Mollie = BE alternative); Resend (transactional),
Brevo (newsletter)

**Domains / DNS:** Cloudflare Registrar; Cloudflare DNS. A Netlify-hosted custom domain
points to Netlify by **CNAME** (subdomain) or **A/ALIAS** (apex) — Cloudflare is the
**registrar/DNS layer only, not a host or compute target**. **One exception:
`demos.aismith.io` is delegated to Netlify DNS by NS records at the Cloudflare registrar**
(apex `aismith.io` stays at Cloudflare), so demo subdomains are managed Netlify-side.
(Cloudflare CDN/WAF apply to the WordPress path, §2, not to a Netlify-served front end,
which carries its own SSL/CDN.)

**Cross-system work (outside the hub boundary):** Cowork = supervised, human-present
UI bridges (never touches hub data); Routines / cloud scheduled tasks = unattended
API/connector glue where no UI needs driving; **n8n is not in the hub stack** —
studio-ops only, superseded inside the hub by edge functions + pg_cron.

**Non-negotiables (not just defaults):** edge functions deploy from the repo through the hub
deploy pipe (`hub-deploy.yml`, behind the deploy checkpoint), never by manual Studio paste;
Studio-only schema changes must be mirrored to tracked migrations (top recurring
tech-debt); code/live schema is authoritative over docs; one Supabase org, one
project per hub; repo + Supabase project are the two transfer-on-exit anchors.

## 1B. Public site: stack & database decision

For a **new** project (no existing WP; or replacing an old Wix like ZG's), TanStack's
SSR means the front-facing site *can* be built on the hub stack. SEO is no longer the
decider. The real fork is **how content-heavy the public site is and how much the
client self-edits it.**

**Host model (the lead rule — sites and hubs alike).**
- Default host for **every** front end is **Netlify (Pro plan)** — a $20/mo base rate
  plus metered build minutes (**$33.00 on the 3 Aug 2026 invoice**; see the host decision
  record below), unlimited members + projects, custom domains + automatic SSL. **No host exceptions remain:** SK
  migrated off Lovable publish onto Netlify on 29 Jun 2026 (Vite-SPA legacy, now Netlify-served);
  **ZG is live on Netlify**. Cloudflare stays the registrar/DNS layer only; Supabase Edge
  Functions remain the only server-compute target (see §1A).

**Host decision record -- Netlify STAYS (operator, 2026-08-05).** Recorded with the measurement
that settled it, because a conclusion on its own cannot be re-derived and cannot be re-opened
honestly when the inputs move.

- **What the bill actually tracks: BUILD MINUTES, not traffic.** Build minutes ran **19** (3 Jun to
  2 Jul), **365** (3 Jul to 2 Aug), then **48 in the first TWO DAYS** of 3 Aug to 2 Sep, which
  annualises to roughly 720/month against the 365 that produced the last invoice. Web requests over
  the same three periods went **13K, 84K, 7.6K** -- so requests FELL while the bill rose. Invoices:
  $9 (1 Jun), $17 (21 Jun), $20 (21 Jul), **$33.00 (3 Aug)**.
- **So the cost driver is the fleet's own CI, not its audience**, and the remedy is a build
  `ignore` rule rather than a host migration. A migration would have moved twelve projects to
  answer a question that was never about the host.
- **The remedy is proven against Netlify, on one repo, both directions** (`zuidgeluid-site` PR #36).
  The BUILD path: the `netlify.toml` commit is not itself excluded, so merging it had to deploy, and
  deploy `6a733b46` fired on merge `99d7595`. The SKIP path, which no scratch repo can prove: a PR
  touching `backlog.md` alone merged and the published production deploy was **still `6a733b46`,
  unmoved**.
- **The rule is EXCLUSION-only and never an inclusion list**, so it fails toward deploying. A wrong
  `ignore` rule is invisible until somebody notices production is stale, which is why it staged on
  one repo before travelling.
- **The excluded set does NOT travel as written.** On that repo all ten `.md` files are docs or
  canon and site content lives in `src/content/*.tsx`. A site that authors pages IN MARKDOWN would
  be broken by the identical line. Each repo enumerates its own excluded set.
- **Not read, and named so nobody reports the read as complete:** credits-per-day and
  builds-by-project are canvas charts and were not extracted. The minutes figures above are the
  operand and are sufficient for the decision.
- **Prerender-first stays the documented default for sites** (SSG or framework SSR at build time,
  served by Netlify), unchanged by this record. The `ignore` rule reduces how OFTEN that build
  runs; it does not change what is built.
- **The server-side backbone for every stateless site is one shared Supabase project,
  `AISmith-functions`** (AS org, Pro, eu-central-1 Frankfurt,
  `https://jctzzxibnflyvfallpva.supabase.co`). Every site connects to it from the start,
  demo or production. It runs **edge functions only and never holds a table**; sites
  store nothing in it. There is **no per-site Supabase project for a stateless site** —
  one flat Micro serves the whole fleet of stateless sites instead of an always-on
  ~$7.50/mo project per site that mostly does nothing.
- **Statelessness is the only gate.** The split is **stateless vs stateful**, not
  demo-vs-production. A site that must **persist data** triggers a hard gate: a **new,
  separate Supabase account/project is set up first, then implementation proceeds** (the
  hub pattern). That stateful site's project is separate from any hub project too.
  `AISmith-functions` never gets a table, by rule, so the gate cannot be crossed by
  accident. **Hubs are unchanged: their own Supabase, with a database** (tables + RLS).
- **A bundled/managed backend is never used** (unowned, irreversible, no transfer
  path -- Lovable Cloud was the canonical example).
- **Rendering vs runtime — the SSR clarification.** Front-end **rendering** (SSG or
  framework SSR) is served by **Netlify** and is allowed; **public/site** projects default
  to the TanStack **Start + SSR** starter via Netlify's framework adapter, while
  **authenticated apps** (hubs/assistants/app cores) default to the **client-side Vite +
  TanStack Router** build (ruling 2026-07-14, §1A). "Runtime = Supabase
  Edge Functions" governs **data and business logic**, not page rendering. The
  bundled-backend ban still targets **data lock-in** (unowned backend, no transfer
  path); the SSR front end is the app in your GitHub repo, liftable to any Node host —
  which is exactly why moving the host to Netlify is a clean, low-coupling change.
  The SSR layer holds **no secrets and no data path**; all of that stays in Edge Functions.
  (See `as-fleet-organisation.md` §7.)
- **Build as production from day one; ship a concept by configuration.** A demo is the
  same build with `noindex` on and a temp **`<slug>.demos.aismith.io`** subdomain
  (Netlify-DNS-delegated, §1A); production flips `noindex` off and points the real domain.
  Both connect to `AISmith-functions`
  from the start — no host move, no rebuild, no backend change between demo and production.
- **Default contact = a function-backed form, not mailto.** Every site ships the standard
  contact form wired to `AISmith-functions` by default; newsletter stays off by default.
  The shared `contact` function is hardened from its first deploy (origin allowlist =
  CORS control, no wildcard; fixed per-site destination resolved server-side from an
  origin→destination map, never from the request body; honeypot + per-origin rate limit;
  public/`--no-verify-jwt`; `RESEND_API_KEY` in Supabase secrets; stores nothing).
  Onboarding a site is **config, not a fork**.
- **Backbone proven live (19 Jun 2026).** The shared `contact` function was deployed to
  `AISmith-functions` and verified end to end with a throwaway tenant: (a) allowed origin →
  `{ok:true}` and the mail arrived (correct from/subject/reply-to); (b) non-allowlisted
  origin → `403`; (c) honeypot → `{ok:false}`. Every fix during the bring-up was a **secret
  edit, never a function-body edit** — the config-driven property held. **Gotcha worth
  keeping:** the `from` (per-tenant or `CONTACT_FROM_DEFAULT`) must be a full mailbox,
  `something@send.aismith.io`, **not** a bare domain — Resend 422s `Invalid 'from' field`
  otherwise. Config secret = `CONTACT_TENANTS` (JSON; keys are origins = the allowlist,
  values carry `to`/optional `from`/`subject`); other secrets `RESEND_API_KEY`,
  `CONTACT_FROM_DEFAULT`. Sender domain `send.aismith.io` verified in Resend.
- The **one read-only doorway** for a site that must show **live hub data** is
  unchanged: an anon-safe read-only view on the **hub's** Supabase, never shared
  credentials, and entirely separate from `AISmith-functions`.

**Decision rules:**
1. **Client already has WP** → **two offerings, the client's choice: keep or convert.**
   **Keep it** — the hub integrates behind it (the refined, established model — most
   SMB/non-profit prospects arrive on WP, reason 4), nothing rebuilt. **Or convert it** to
   the built fleet stack with a real domain cutover (`as-site-build-wp-conversion.md`,
   reusing `as-project-playbook.md` §3 for the migration discipline). **Offer both; default
   to neither;** a client's preference to **keep WP is always honoured**. Don't migrate for
   its own sake — but converting a stable, content-light WP site is a legitimate offer, not
   a forced migration. **Convert is preferred only when the site is not heavy or
   daily-self-edited**; otherwise rule 3 (keep-WP) holds until the edit-flow matures into a
   true wp-admin rival.
2. **Greenfield, content-light** (a few stable pages, monthly changes) → build it on
   the hub stack as a **separate app** (see below). No WP to host/patch/rot; SSR
   handles SEO; rare changes go through the hub edit-flow. This pulls the public
   surface into the fleet as a manufacturable archetype.
3. **Greenfield, content-heavy or daily self-edited** (news/blog, client-posted
   events, a shop, editor workflows) → **still WP** for the public face, hub behind
   it. The edit-flow does not yet beat wp-admin for real daily editing, and WP's
   plugin ecosystem still earns its place. Reassess when the edit-flow matures into a
   true wp-admin rival — that's the capability that lets rule 2 eat rule 3 over time.
4. **Never combine** the public site and the hub into one app, whatever the stack.

**Separate apps, not combined — always.** Public marketing surface and private gated
hub have opposite security postures (anon-world-readable vs auth-gated-RLS),
different audiences, cadences, and ownership boundaries. "Same stack, two apps" gives
the consolidation win (one framework, one toolchain, one deploy discipline) without
collapsing the trust boundary the spine depends on. One combined app reintroduces
exactly the complexity the spine keeps out, and muddies the §8 transfer unit.

**Database: separate by default; one read-only doorway when needed.**
- **Default: separate Supabase projects** (or no database at all for static
  content). The boundary is then *physical*, not policy-dependent — a public visitor
  has no path to hub tables. A shared project would bet the hub's confidentiality on
  flawless RLS forever, including never repeating the Studio-RLS-drift mistake.
- **When the public site must show live hub data** (events, menu, programmes) → do
  **not** share the database. Expose **one narrow read-only doorway** from the hub: a
  public anon-safe view or a read-only edge function serving only the published,
  public-meant fields. The site pulls; nothing else is reachable. Declare it as a
  bridge (same discipline as the KT↔SK boundary contract); the audit checks the one
  doorway.
- **Combine only** for throwaway-tiny projects with nothing sensitive behind the
  gate. For anything board-governed or holding personal data, separate wins.

**Why the read pipe is the better pattern (and less work).** Pushing hub data *into*
WP means writing into a foreign system (WP REST auth, schema mapping, sync state).
The read pipe inverts it: the hub exposes one window, the public site pulls — no
write credentials into another system, no mapping, no sync. Safer *and* less to
build than the WP-update path.

---

## 2. WordPress Side

### Hosting

- **Default: Combell** (BE, EU region) -- Belgian-owned, Dutch-language
  support, EU data residency built in, one-click staging + automated
  backups, well-known to Dutch-speaking Belgian freelancers. WordPress
  Hosting plan under EUR 10/mo.
- Acceptable alternatives: Vimexx (NL), SiteGround (EU region),
  Kinsta (managed, premium pricing).
- **EU region mandatory** for GDPR and proximity to the rest of the
  stack (Supabase West EU Ireland, Resend EU, Stripe / Mollie EU).

### Install approach

- **Vanilla WordPress** via the managed-host one-click install. Not
  Bedrock, not a custom framework. Editable from a Chromebook in
  Gutenberg.

### Theme

- **Default: GeneratePress Premium** (EUR ~59/yr). Lightweight, full
  block-editor support, Dutch-language docs, used widely across Belgian
  agencies, easy handover to another maintainer.
- Acceptable alternatives: Blocksy, Kadence. Avoid Twenty Twenty-N
  default themes for projects with patchy ongoing maintenance (they
  change across WP releases).
- **Child theme: avoid unless a maintainer specifically prefers one.**
  Default approach is WPCode snippets + theme global styles.

### Page builder

- **Native Gutenberg blocks**, plus `Custom HTML` blocks for iframe
  embeds. No Elementor, no Bricks, no Divi.

### Plugin list

Default kit. Add only what the project actually needs; keep total
plugin count under ~12 active. Plugins marked `(conditional)` are
installed only when the feature is in scope.

| Plugin | Purpose |
|--------|---------|
| GeneratePress Premium | Theme + design tokens (see Theme above) |
| WPCode (Insert Headers and Footers) | Inject analytics, custom CSS/JS, schema, redirects without touching theme |
| Complianz | Cookie banner + GDPR scan. Free, WP-native. (Use Cookiebot only if multilingual auto-detection is needed) |
| UpdraftPlus | Off-site backups to Google Drive / S3, weekly schedule, 30-day retention |
| Rank Math SEO | Meta, schema, sitemap, redirects. Yoast acceptable if maintainer prefers it |
| Fluent Forms (free tier) | Contact forms, application forms not handled by an embedded app iframe |
| LiteSpeed Cache or host-bundled cache | Page cache (depends on host) |
| ShortPixel | Image optimisation on upload |
| WP Mail SMTP | Route WP transactional mail through Google Workspace SMTP |
| Relevanssi | Better than native WP search (fuzzy match, relevance scoring) |
| Polylang (conditional) | Multilingual NL/FR/EN. Install only if multilingual at launch |
| WooCommerce (conditional) | E-commerce. Install only if there is an actual shop |
| WooCommerce Stripe / Mollie Gateway (conditional) | Payment gateway, paired with WooCommerce |

**Security:** Cloudflare WAF (proxy enabled at DNS layer, free tier).
Skip Wordfence -- it conflicts with Cloudflare caching and is redundant
when Cloudflare proxy is on.

**CDN:** Cloudflare free tier at the DNS layer. No plugin needed.

### Custom post types, taxonomies, ACF

- **Avoid by default.** Pages, Posts, and WooCommerce Products handle
  most projects.
- If CPTs are genuinely needed: CPT-UI plugin or a WPCode snippet --
  maintainer's choice.
- **ACF:** avoid where possible (structured content belongs in Supabase
  with the app rendering it). Loose principle, not a hard ban
  -- Belgian freelancers may be more productive with ACF on heavily
  bespoke WP sites.

### Custom code

- **WPCode snippets** for: cookie banner inject, analytics inject,
  schema markup, redirects, robots tweaks, email-from headers.
- **No mu-plugins** unless a maintainer specifically needs them. Keep
  everything visible in the WP admin.
- **One global JS snippet: IIFE-scope every block.** When per-page
  scripts are concatenated into a single site-wide WPCode JS snippet,
  repeated top-level `const` declarations throw a duplicate-declaration
  `SyntaxError` that aborts the *entire* bundle -- every page's JS dies,
  not just the duplicated block. Wrap each block in its own
  `(function(){ ... })();` and null-guard every element lookup so blocks
  are isolated and harmless where their elements are absent.
- **Site-wide shared overlays: inject once, init at DOM-ready.** An
  overlay used across pages (e.g. a lightbox) is appended once to the
  footer HTML snippet -- but WPCode doesn't guarantee footer-snippet
  output order, so bind it on `DOMContentLoaded`, not at parse time, or
  the script runs before the node exists and the overlay is silently
  dead.
- **Decorative SVG: inline as a data-URI in CSS, don't upload.**
  WordPress blocks SVG uploads by default (and Safe SVG is an extra
  plugin + attack surface). For decorative SVG (a zigzag edge, a
  divider), base64 it into the stylesheet -- no plugin, no upload, and
  it ships with the CSS.

### Email setup (transactional)

- **Google Workspace on root domain** (e.g. `hello@rootdomain.tld`).
- **Google for Nonprofits** for VZWs: free or steeply discounted.
  Apply via TechSoup Belgium (`techsoupbelgium.org`). Requires
  registered VZW with statuten, KBO/BCE number, eligible mission.
- **MX records on root** for Google Workspace inbound mail.
- **Resend on `send.rootdomain.tld` subdomain (conditional)** for
  high-volume transactional email from Edge Functions. DKIM, SPF, MX
  on `send.` -- avoids any conflict with Google Workspace MX on root.
  Skip Resend for low-volume projects where WP Mail SMTP through
  Google Workspace is enough.
- **WP Mail SMTP** routes WordPress's own transactional mail
  through Google Workspace.
- **Host caveat -- GoDaddy Managed WP silently blocks outbound SMTP**
  (both 587 and 465). WP Mail SMTP to any external host then hangs on
  the dead socket -- diagnose by the *hang* (a wrong password fails fast
  with an auth error; a silent hang is a firewalled port) -- exhausting
  the PHP worker and 502-ing the page. Fix: switch to an **HTTPS-API
  transport on port 443** (Brevo is FluentSMTP/WP-Mail-SMTP-native,
  300/day free, sends over API and lands inbox-not-spam). SPF merge
  rule: one record only -- append `include:spf.brevo.com` alongside the
  existing mail-host include, never two SPF records.

### Newsletter platform

- **Default: Brevo** (formerly Sendinblue) -- EU-hosted, GDPR-clean,
  Belgian-friendly, generous free tier (300 emails/day), automation
  flows, good NL/FR support.
- Acceptable alternatives: MailerLite (EU), Mailchimp (US, only if
  the project has a specific reason).
- Embedded signup form on WP via Brevo's WP plugin or an app iframe
  writing to Brevo via API.

### Multilingual (conditional)

- **Default: Polylang free** for NL/FR/EN. Strong free tier, mature,
  Belgian-freelancer-familiar.
- Default position on multilingual: **monolingual at launch.** Add a
  second language only when there's real audience demand. Premature
  multilingual is the most reliable way to double the maintenance load
  for no traffic.

### Staging + deploy

- **Managed host's one-click staging environment.** Push to staging,
  preview, promote to production.
- **Backups before any risky theme/plugin update:** UpdraftPlus full
  backup -> apply on staging -> visual QA -> apply on prod.
- No Git-based WP deploy. WordPress is treated as a CMS, not a code
  repo.

### GoDaddy Managed WP + Kadence (host/theme deviations)

When a project runs on **GoDaddy Managed WP with a Kadence child theme**
instead of the Combell + GeneratePress default (ZG's website), these
deviations apply:

- **Child-theme CSS goes in the *enqueued* file, not `style.css`.** A
  Kadence child theme's `style.css` is often the manifest, enqueued
  empty; the live stylesheet is whatever `functions.php` actually
  enqueues (ZG: `assets/css/design-tokens.css`). Read `functions.php` to
  find the real file before pasting CSS.
- **Cache-bust enqueues with `filemtime()`.** GoDaddy fronts assets with
  a CDN that serves stale CSS after every edit; version the enqueue with
  `filemtime($path)` (guarded by `file_exists`) so each save busts both
  browser and CDN cache. Saves chasing "my CSS edit isn't showing"
  non-bugs.
- **Kadence loads only fonts assigned to a typography slot.** A family
  referenced solely via a CSS custom property (`var(--logo)`) with no
  slot assignment won't load. If a font must render, assign it to a slot
  (Base/Heading/Buttons); and don't *also* enqueue a Kadence-loaded font
  in `functions.php` -- double-load.
- **Full-bleed `100vw` breaks on mobile** when an ancestor still carries
  Kadence's responsive `--global-content-edge-padding` /
  `--global-content-boxed-padding`. Zero both at `:root`, broaden the
  wrapper reset across the Kadence containers, and set
  `html,body{width:100%;max-width:100%}`.
- **Don't set the WP primary domain before DNS resolves.** Setting it to
  the apex while the domain still points elsewhere rewrites the Site
  Address to the not-yet-pointing host and 400s wp-admin. Keep the
  primary on the staging URL during the build; flip to the apex only at
  cutover, after DNS resolves.

(Outbound SMTP on this host is blocked -- see Email setup above.)

---

## 3. Public App (built stack)

(Only when the project actually needs a standalone public app -- see
Section 1 decision criterion.)

### How it's built

- **Agent-direct**: Claude Code authors the repo from `seed + brief`
  (clone the seed scaffold, author from the brief, wire Supabase
  manually). Mechanics in `as-site-build-agent.md` §5 and
  `as-site-seed-instance.md` -- not duplicated here.
- One repo per surface (app + hub = two repos), each its own GitHub
  repo and Netlify project.
- Production serving is **Netlify** (§1A), front end only; all
  server-side logic runs in Supabase Edge Functions.

### Supabase region and auth

- **Region:** West EU (Ireland) for any EU project. Same region across
  all projects in the slice for predictable Edge Function networking.
- **Compute:** Micro tier (~USD 10/mo). Free tier acceptable
  pre-launch.
- **Auth method:**
  - Email + password (default)
  - Magic link (secondary sign-in)
  - Google OAuth UI wired but provider toggled per-project (don't
    surface Google sign-in until OAuth client is configured for the
    project's domain)
  - SSO / SAML only for B2B / enterprise use cases
- **One Supabase project per legal entity.** RLS is per table/role,
  not per project -- but separating projects per legal entity keeps
  data ownership, exports, billing, and GDPR boundaries clean. Never
  share a Supabase project across legally separate entities.

### Subdomain mapping

- Custom domain on **Netlify** (§1A): add the domain to the Netlify
  project, point DNS at Netlify, SSL provisioned automatically.
- Pattern: `app.rootdomain.tld` (English) or `app.` works fine in any
  language as a universal handle.
- DNS records via Cloudflare: CNAME/ALIAS to the Netlify project.

### Visual consistency with the WordPress site

Brand tokens live in **`xx-tokens.md`** in project knowledge (e.g.
`zg-tokens.md` for Zuidgeluid, `kt-tokens.md` for Know Thyself).
Single source of truth, version-controlled with the rest of the
reference docs.

Contents:

- Primary / secondary / accent / neutral palette (hex)
- Serif heading font + sans body font (Google Fonts links)
- Logo URL (canonical copy hosted on WP `wp-content/uploads/` --
  edited in one place, propagates to email templates, hub favicon,
  the app)
- Button rules, radius, shadow conventions

Implementation:

| Surface | Where tokens live |
|---------|-------------------|
| Built stack | `tailwind.config.ts` (theme.extend.colors, fontFamily) |
| WordPress | Appearance -> Editor -> Styles (theme global styles) |
| WPCode | Only for custom CSS that the theme styles can't express |

No Figma file as source of truth. The markdown spec is the contract.

---

## 4. Private Hub (built stack)

### Naming

- **Dutch projects (BE-NL):** `leden.rootdomain.tld` (members),
  `team.` (team-only), `intern.` (internal) -- pick what fits the
  audience.
- **English / mixed projects:** `hub.`, `admin.`, `staff.`
- Pick once and don't change -- the subdomain ends up in printed
  materials, QR codes, bookmarks, password managers.

### Same Supabase or separate?

- **Same Supabase project** as the public app, when the hub operates
  on the same data (SK Hub reads bookings that the public widget
  writes).
- **Separate Supabase project** only when the hub serves a different
  data domain (analytics tool with its own model, completely separate
  legal entity).
- For hub-only projects with no public app: single Supabase project,
  hub only.

### Bring-your-own Supabase (never a bundled/managed backend)

Every hub owns its Supabase project -- never a bundled or managed
backend that ships with a build tool (Lovable Cloud was the canonical
example of that anti-pattern: its own managed Supabase, mutually
exclusive with attaching an external project). Agent-direct builds wire
Supabase manually: store `SUPABASE_URL`, the anon/publishable key, and
`SERVICE_ROLE_KEY` as **server-side secrets (never in the `VITE_*`
client bundle)**; wire `client.ts` (anon) and `client.server.ts`
(service_role -- the `.server.ts` suffix keeps the key out of the client
bundle). Mechanics in `as-site-build-agent.md` §5 /
`as-site-seed-instance.md`; the BYO-Supabase rule is also pinned in the
founding prompt (`as-hub-blueprint.md` §4).

### Auth for the hub

**Default: Supabase Auth + email/password + Force-Password-Change on
first login.** Each staff/member is a real `auth.user`. RLS policies
reference `auth.uid()`. SK Hub Phase 11 (May 2026) proved this pattern.

Drop to PIN gate only for throwaway prototypes you'll rebuild within
weeks. The cost of running PIN at launch is paying it back in Phase
11-style migration later. Don't.

### Default role taxonomy

Extend per project, but every hub starts with at least these roles:

| Role | Default permissions |
|------|---------------------|
| `admin` | Full read/write across all tables, can invite/remove users |
| `coordinator` | Read all, write to operational tables (schedule, members, content) |
| `member` | Read + write their own records only (profile, signups, time-off) |
| `treasurer` | Read all + write to financial tables (rates, payments, invoices) |

Implemented as a `role` column on the `team` table (or equivalent),
checked in RLS policies. Same pattern as SK Hub's `allowedLocations`
field but scoped to a single org.

### Embed routes

Forms exposed publicly via iframe live at `/embed/*`:

- Bypass auth (`window.location.pathname.startsWith('/embed/')`
  check before the router/auth provider mounts)
- No header, no nav, no chrome
- Permissive CORS / no `X-Frame-Options` restriction so they iframe
  cleanly from WordPress
- Tag any data they write with `source: 'website'` for analytics

Same pattern for `/manage/:token` chromeless self-service flows
(self-edit, confirm, cancel via magic-link).

### Search engine blocking (private routes only)

Four layers on authenticated hub routes (NOT `/embed/*` or
`/manage/*`):

1. `robots.txt`: `Disallow: /`
2. Meta robots: `noindex, nofollow, noarchive`
3. HTTP header: `X-Robots-Tag: noindex, nofollow`
4. The auth gate itself

### Gated file storage (sheet music, signed forms, ID scans)

- **Supabase Storage bucket** with RLS, accessed via signed URLs
  generated server-side by an Edge Function.
- SK Hub `volunteer-ids` bucket is the worked example: service-role
  upload via Edge Function, admin download via signed URL Edge
  Function, no client-side direct access to the bucket.
- Same pattern for sheet music libraries, signed parental consent
  forms, member ID scans, anything that's both private and large.
- **Write policies need an explicit `WITH CHECK`, not just `USING`.** A
  file upload is two RLS-gated inserts (the object into `storage.objects`
  *and* the app-table metadata row), both raising the identical
  "violates row-level security policy". A `USING`-only `FOR ALL` policy
  does not authorise the `storage.objects` INSERT, so the file is
  silently rejected while the table insert succeeds. Carry both:
  `USING (...) WITH CHECK (...)`.
- **`allowed_mime_types` rejects an upload before any RLS** -- a
  different error ("mime type X is not supported") with a different fix;
  set it to match what the pipeline actually uploads, and decide the
  filed-artifact format up front (board-facing pipelines render a PDF,
  not raw markdown).

### Audited mutations: the SECURITY DEFINER RPC skeleton

`as-hub-blueprint.md` §6 explains *when* to use this -- a log table is
SELECT-only, so no client can insert it, and audited or compound
mutations route through one definer RPC. The skeleton:

```sql
CREATE OR REPLACE FUNCTION public.<action>(
  p_id uuid, p_new_status text, p_note text)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_role text := auth.jwt() -> 'app_metadata' ->> 'role';
BEGIN
  -- definer bypasses RLS, so authorise explicitly
  IF v_role NOT IN ('admin','director','staff') THEN
    RAISE EXCEPTION 'not authorised' USING errcode = '42501';
  END IF;
  -- (validate target enum here)
  UPDATE <table> SET status = p_new_status WHERE id = p_id;
  INSERT INTO audit_log(actor_id, action, entity, entity_id, note)
  VALUES (auth.uid(), '<action>', '<table>', p_id, p_note);
END $$;

REVOKE EXECUTE ON FUNCTION public.<action>(uuid,text,text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.<action>(uuid,text,text) TO authenticated;
```

The client calls `supabase.rpc('<action>', {...})` -- never a client
UPDATE plus a client audit INSERT. Stamp `actor_id = auth.uid()`; audit
transitions, not creation (a new row has no "from" state).

---

## 5. Cross-Cutting

### Design system source of truth

- A single markdown doc per slice: `xx-tokens.md` (where `xx` is the
  slice prefix). Lives in project knowledge.
- This file is the contract between WordPress, the app, and the hub.
  Anything contradicting it is a bug.

### Analytics

- **Default: Plausible** (EU-hosted, cookieless, no banner needed for
  analytics, GDPR-clean). EUR ~9/mo for one site.
- **GA4 only if** the project specifically needs Google Ads conversion
  tracking or the team is already deep in the Google ecosystem.
  Triggers cookie consent banner requirement.
- **PostHog (eu.posthog.com) for product-event analytics** inside the
  app when the project needs feature-usage data. Add only when
  there's a real question to answer.
- Stripe / Mollie Dashboard is the source of truth for payments.

### Cookie banner

- **Complianz (free, WP-native)** is the default. Works without an
  external service, scans the site for cookies, generates the policy.
- **Cookiebot** only if you need strong multilingual auto-detection
  or your board wants the third-party audit trail. Free tier covers
  up to 100 subpages.
- With Plausible only and no GA4 / Meta Pixel / YouTube embeds, the
  cookie banner becomes technically optional. Most boards still want
  one for reassurance -- install Complianz, configure for "essential
  only" mode.

### GDPR docs

Every project ships with:

| Doc | Where |
|-----|-------|
| Privacy Policy | WP page + app `/legal` route |
| Terms & Conditions | WP page + app `/legal` route |
| Cookie Policy | Generated by Complianz / Cookiebot |
| DPA (Data Processing Agreement) | WP page (B2B-facing) + app `/legal` route (only when handling third-party data) |

- **Data controller:** legal entity name + KBO/BCE + registered address
- **Sub-processors:** Supabase (US/EU), Netlify (US), Stripe and/or
  Mollie (EU), Resend (EU) when used, Brevo (EU) when used, Anthropic
  (US) when used, Google Workspace (US/EU). All with EU-US DPF
  certification or SCCs.
- **Supervisory authority:** GBA Brussels for any Belgian entity.
- **DPA register (Art. 30):** maintain an internal one-page register
  listing all sub-processors and their DPA URLs / contract dates.

### Backup retention

- **30 days minimum** for production data. UpdraftPlus weekly +
  manual on-demand before risky changes.
- Longer (6-12 months) for projects with regulatory record-keeping
  obligations (financial reporting, fiscal attestations).
- **GDPR interaction:** right-to-erasure requests apply to live data
  immediately; backup data is acceptable to retain through normal
  rotation as long as the retention policy is documented.

### Accessibility

- **Target: WCAG 2.1 AA.** Belgian Web Accessibility Act applies to
  publicly-funded organisations; safe default for everyone.
- Audit cadence: at launch, then annually.
- Tools: WAVE browser extension + axe DevTools for spot-checks;
  Accessibility Insights for full audit.

### Performance targets

- **Lighthouse score 85+ across all four categories** (Performance,
  Accessibility, Best Practices, SEO) on the public site.
- **Core Web Vitals "Good"** (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- Re-test at launch and after any major theme/plugin change.

### Monitoring / uptime

- **UptimeRobot free tier**, 5-minute checks on:
  - WordPress root URL
  - Public app URL (if any)
  - Hub URL
  - Each public-facing Supabase Edge Function (HEAD)
- **Supabase project dashboard** for DB health, function logs, auth
  events.
- **Stripe / Mollie Dashboard** for payment failures.
- **Sentry free tier** only for projects with paying users.

**A status surface must not share a failure domain with what it reports on (v1.29, operator
2026-08-05).** The case a fleet status page exists for is a MAJOR INCIDENT, which is the case where
the hub is down, so a page fed only by the hub is silent in the one condition it was built for.

- **PULL is the floor; PUSH is detail.** A pull fails LOUDLY, on GitHub's availability rather than
  the fleet's. A push fails SILENTLY: a dead hub simply stops pushing and a stale `status.json`
  is indistinguishable from no change. **The hub may push and must never be the only route.**
- **Three states, not two: `ok` / `degraded` / `stale`.** Two states cannot express "I do not know",
  which is the honest reading of an unchanged file of unknown age, and it is the state that
  matters most. `stale` is a function of the timestamp, so it is derivable by the READER without
  anything working at the other end -- which is the whole point.
- Same shape as the backup rule in `as-backup-recovery.md`: a job that never ran and a job that ran
  and found nothing look identical unless something records WHEN. Token scoping for the pull route
  is in `docs/credential-register.md` v0.12.

### LLM / external-API billing isolation

A shared agency LLM/API key means a **shared spend cap** -- a per-client
cap on that key would throttle every client. Ring-fence each client's
LLM spend with a **separate key/workspace**, not an org-wide cap (the
Anthropic console supports per-workspace keys). Corollary that doubles
as a demo safety net: because generated output is persisted to the DB, a
live-call failure (cap hit, transient error) still shows the last saved
draft on page load -- the live call is only needed for the
watch-it-generate moment, not for the artefact to exist.

---

## 6. DNS & Domain Pattern

Belgian / EU project default:

```
rootdomain.tld         -> WordPress (A record to host IP)
app.rootdomain.tld     -> public app on Netlify (when present)
leden.rootdomain.tld   -> private hub on Netlify (NL) / hub. (EN)
www.rootdomain.tld     -> CNAME to root, 301 to non-www
send.rootdomain.tld    -> Resend (DKIM TXT, SPF TXT, MX to AWS SES EU) -- when used
@                      -> MX to Google Workspace (root inbox)
_dmarc                 -> DMARC TXT (p=quarantine; rua=mailto:dmarc@root)
```

**Registrar default: Cloudflare Registrar.** At-cost pricing, better
DNS UI, free Cloudflare proxy/CDN.

**Legacy: GoDaddy** for existing simoneskitchen.com / knowthyselfapp.com.
Migrate when convenient; no rush if it's working. New projects start on
Cloudflare unless there's a specific reason (e.g. moving fast with an
existing GoDaddy login for a single deadline).

**Consolidating the legacy domains (GoDaddy -> Cloudflare), DNS-first.**
Cloudflare registrar + DNS is already the canon default (above); consolidating
the existing GoDaddy domains onto it is **execution of that canon, not a new
rule**. Do it **DNS-first, registrar transfer later** -- DNS-first is fast and
reversible: create the zone in Cloudflare, replicate every record, change the
nameservers at GoDaddy, and let the registrar transfer follow on its own
timeline. **Replicate the Google Workspace MX + SPF/DKIM (and the `_dmarc`
TXT) on Cloudflare and verify mail flows BEFORE flipping nameservers** -- if
the mail records are not in place at cutover, mail breaks (the two-month SK
MX-typo incident is the standing lesson). Copy each value from the source
provider directly, never from memory. **Executed first mover: Zuidgeluid
(2026-07-30)** -- the `zuidgeluid.be` zone is live on Cloudflare DNS, the
fleet's first legacy zone moved under this rule; the remaining GoDaddy zones
follow the same DNS-first path, and Cloudflare DNS is the operating default
for every fleet zone once the exodus completes. (Host-coupled DNS exceptions -- e.g.
delegating a throwaway-demo subdomain to a specific host -- are out of scope
here and fold later with the host decision.)

**Critical hygiene:** copy DNS values from the source provider directly,
never type from memory. AWS SES region strings use dots (`smtp.eu-west-1`),
not hyphens. The two-month MX-typo incident on SK Hub started with a
single character typed wrong.

**Before a cutover, confirm where DNS authority actually lives.**
"Connected by DNS at <old platform>" does not mean that platform manages
it -- read the live WHOIS + nameservers first (ZG's authority was
Easyhost, while Wix held only pointing A-records and had nothing to
change at cutover). Edit records where authority lives; a plan aimed at
the wrong panel wastes a maintenance window.

---

## 7. Build & Deploy Workflow

### Tool choice by task

| Task | Tool |
|------|------|
| UI / frontend / components | Claude Code (agent-direct, see `as-site-build-agent.md` §5) |
| Backend logic, Edge Functions | Codespaces + Claude Code |
| Multi-file refactors (10+ files) | Claude Code |
| SQL migrations | Supabase SQL Editor, then commit SQL to repo |
| WP content edits | WordPress admin (Gutenberg) |
| WP code snippets | WPCode |

### Hub deploy pipe (schema + functions) -- repo-as-truth, one production path (+ optional preview branching)

A hub's `supabase/migrations/**` + `supabase/functions/**` deploy **from the repo**, behind a
**required migration check** and the **deploy checkpoint**, by **one production path: the GitHub
Action (a)**. Supabase native branching (b) is an **optional preview-only layer** beneath it, never a
second path to prod. The invariants hold on the production path: repo-as-truth, the required
migration check, the deploy checkpoint, **never** raw SQL on prod, and **no agent or CI session
holds an unattended deploy credential**.

**The deploy checkpoint is a merge by a controller seat or by the operator**, after the required checks
and the review ruling 64 selects; **never the merge of the lane that built the change, and never
unattended** (ruling 81 of `docs/rulings/ruling-two-tracks-2026-09-24.md`, at v1.34 of this file: that
merge is what this section's checkpoint means, ruling 24 having made a `[deploys]` PR the controller's to
merge like any other).

- **(a) GitHub Action -- `hub-deploy.yml` -- the production deploy path.** `migrations-check` (required) + `db push` +
  `functions deploy` on merge, behind the `production` Environment's required reviewer; CI holds the
  Supabase deploy credential as a secret, used only after a human approves the environment. **The fleet
  standard**: it ships as a stamped contract file (drop-in + 3 secrets + a `production` env), costs
  nothing per PR, and the YAML is owned and greppable. Its `migrations-check` job also **applies the
  migrations to a real throwaway Postgres pre-merge** (`supabase db start` / `db reset`) -- a real
  apply, no credential, no preview-DB cost -- so it matches branching's correctness without the cost.
- **(b) Supabase native GitHub branching -- optional preview-only layer.** Supabase builds a preview
  branch from each PR and runs the migrations against a real preview DB (point the app at it to review
  a migration before it lands), and posts PR status. **Keep Supabase "Deploy to production" OFF**: prod
  is written only by the Action (a), so branching never races it and holds the no-unattended-credential
  invariant (Supabase, not CI, holds any branch credential). Enable it where a hub wants preview DBs and
  accepts the **per-PR preview-DB compute cost** (outside the org Spend Cap); bound the cost with
  **"Supabase changes only" ON** + a low **branch limit**. Do NOT wire branching as a second
  prod-deploy pipe -- that is the configuration this standard retired (operator 2026-07-25). Preview
  branching pilot-proven end-to-end on ZG (2026-06-22).

**Migration authoring + prod health (ZG branching-pilot lesson, folded 2026-07-25 -- reconciliation
bucket 4, `deploy-pipe-shadow-vs-prod-validation`).** A migration that passes every pre-merge check
can still fail on prod alone -- ZG hit `DELETE FROM storage.objects` rejected only by prod ("Direct
deletion from storage tables is not allowed; use the Storage API") while the Netlify frontend
deployed anyway: a SILENT split state (repo ahead of the prod DB) that no gate caught. Two rules:

- **Storage bucket/object changes are Storage-API / operator steps, never SQL migrations.** DML or
  DDL against `storage.objects` / `storage.buckets` does not belong in `supabase/migrations/**`;
  bucket creation/deletion and object cleanup go through the Storage API (or the dashboard, as an
  operator step recorded in the PR). Policies ON `storage.objects` remain normal migration content.
- **Post-merge prod health assertion (WIRED into the Action at v1.23).** The deploy job runs
  `supabase migration list --db-url "$HUB_DB_URL" --output-format json` after `db push --db-url
  "$HUB_DB_URL"` (hub-contract 1.7.18: the session pooler and the project's own password in
  `PGPASSWORD`, no `supabase link`), fails loudly when the two histories differ, and fails closed
  when the history cannot be read. A failed or partial prod apply must be LOUD -- a frontend deploy is never evidence the
  DB moved. Read the two failure directions differently: **local-only** versions mean the push
  did not fully land (prod is behind the repo); **remote-only** versions mean prod carries a
  version this Action never applied, which is either a **second writer** (Supabase "Deploy to
  production" left ON, or a manual `db push`) or **a run that recorded a version then failed
  part-way**. Distinguish them before acting: read the row's recorded statements and insert time
  in `supabase_migrations.schema_migrations`, and check the live catalog for the objects the
  migration claims to create. Never resolve a remote-only version by renaming a local file to
  match it -- that makes the Action skip the migration forever, so a fix that "deployed green"
  never actually applies (the trap behind ZG's funder-view security fix, 2026-07-27). If the DDL
  did not run, `supabase migration repair --status reverted <version>` and let it re-apply under
  a version that sorts after prod's head.
- **Adopting the health assertion is a read-prod-first step (v1.24).** Unlike the four PR gates,
  this one lives in the `deploy` job, so it cannot land non-required: it is live the moment a hub
  pulls the workflow, its first failure lands *after* `db push` and *before* `functions deploy`
  (a split deploy), and it repeats on every deploy until prod history is repaired by hand. Before
  a hub adopts it, read prod's history **once** the way the deploy job reads it (`supabase
  migration list --db-url` on the session pooler, the password in `PGPASSWORD`, since hub-contract
  1.7.18) and resolve any `only_remote` version -- typically migrations archived at a baseline squash, which exist in prod history with
  no file in the repo. Repair with `migration repair --status reverted`, never by un-archiving
  files or renaming to match. This is a **Trigger-1 adoption precondition**, not a run-book note:
  a gate whose first run can only fail after it has already written prod has to be aimed before
  it is armed. (SK carries exactly this exposure from its 2026-06-23 baseline squash.)
- **A deployed function outlives its repo directory -- there is no prune (v1.24).** Deleting a
  function's directory and merging removes it from the repo and leaves it RUNNING in prod, on its
  last-deployed code with its last-granted secrets. `functions deploy` pushes what it finds and
  never reconciles what it does not, so the repo, `config.toml` and every gate agree the function
  is gone while it keeps answering. Twice in ten days on the same fleet (`generate-dossier-draft`
  2026-07-18, `generate-fiscal-attestation` 2026-07-28, still ACTIVE at v85), both caught only by
  a live audit inventory -- which is what makes it a standing property of the platform rather than
  an incident. The Action now **fails the deploy** when the live inventory carries a name the repo
  does not (C4.5(b), made mechanical). **Removing a function is therefore two steps:** delete the
  directory in the PR, and run `supabase functions delete <name> --project-ref <ref>` as an
  operator step. The delete stays manual on purpose: it is destructive and live, and the rest of
  this section exists because unattended writes to prod are how split states start.
- **A parser feeding a required gate is run once against real CLI output before it ships (v1.26,
  promoted to this body at v1.33).** The orphan gate's first live run read the `functions list`
  table's separator row as a phantom function named `-----` and failed a healthy prod AFTER `db push`
  and `functions deploy`: it had had no live run between authoring and prod. A gate parsing a CLI's
  output is exercised against output captured from the pinned CLI before it is required.
- **Migration versions are a shared monotonic artifact, not a local one.** The 14-digit version is
  stamped at authoring time, but ordering is judged against `main` at merge time. Concurrent
  branches therefore collide by construction: the second to merge carries a stale stamp, and
  `db push` refuses it *after* the merge, when prod has already moved. Restamp (rename to a
  version after the newest on `main`, content identical) before merging, never after.
  `migration-order-check` enforces this per PR.

**The gate validates form *and* encoding, not just text.** The static `migrations-check` rejects a
UTF-8 **BOM** anywhere under `supabase/` and parses `config.toml` as **TOML** -- a PowerShell
`Set-Content -Encoding utf8` BOM passes a naive grep but breaks the real deploy (Supabase TOML parse
+ Postgres "syntax error at statement 0"). The preview pipe caught this on ZG; the static gate now
catches it earlier so the Actions track isn't exposed.

**Enforcement is plan-dependent.** "Required `migrations-check` blocks merge" hard-binds only where
branch protection is *enforceable* (GitHub Pro + a ruleset on a personal private repo, or a
Team/Enterprise org). On a Free personal private repo the check **runs and reports but does not
block**; the deploy checkpoint and no-unattended-credential invariants hold regardless. The
**deploy-side gate is plan-dependent too**: the `production` Environment's **required-reviewer** rule
enforces on a **private** repo only under **GitHub Enterprise** -- on **Pro/Team** it cannot be set, so
the **merge itself is the deploy checkpoint**, a merge by a controller seat or by the operator (the env
still tracks deployments and activates if the org upgrades to Enterprise). Either way nothing deploys
without that merge and no unattended credential is held. (Hub governance detail: `as-agent-fleet.md` §6; account topology:
`as-fleet-organisation.md` §7A.)

**The four PR gates (v1.23, hub-contract 1.6.4).** `hub-deploy.yml` is the single stamped CI
template and carries all four: **`migrations-check`** (static guards + an ephemeral-Postgres
apply, ~4-5 min), **`frontend-check`** (`tsc -b --noEmit --force`, failing when zero files were
typechecked: bare `tsc` does not follow project references, so on a solution-style `tsconfig.json`
it compiles an empty file list and exits 0, and `--force` keeps an up-to-date project from listing
none; v1.24, promoted to this body at v1.33), **`deno-check`**
(`deno check` over `supabase/functions/*/index.ts`) and **`migration-order-check`** (new
migrations sort after `main`; shipped migrations are immutable). The two typecheck gates close the same hole
on the two lanes the deploy split leaves ungated: this Action owns db + functions, **Netlify owns
the frontend and fails fail-safe-but-silent** -- a broken build leaves the last good bundle
serving, Netlify's PR check-runs report `neutral` regardless of buildability, and Vite does not
typecheck (esbuild strips types). Without them a hub ships an unbuildable frontend to `main` with
no red check anywhere and runs stale UI in prod. (ZG `f0f1340` / hub PR #73; Factory issue #111.)

**Adopt the new gates STAGED, never required on day one.** (Applies to `migration-order-check`
as well: a hub whose history already contains an out-of-order file would otherwise be unable to
merge anything touching migrations.) Land both jobs non-required, let
them report on a couple of real PRs, and flip them to required status checks only once observed
green. A hub that has never type-checked in CI may carry pre-existing type debt, and marking them
required in the same pass that introduces them **bricks that hub's merge path**. Both jobs
self-skip when the surface is absent (no `package.json` / no `supabase/functions`).

**A workflow does NOT commit to a pull-request branch with `GITHUB_TOKEN`. It ASSERTS drift and
FAILS (v1.28, hub-contract 1.6.27; SK contract patch 2026-08-03).** A push authenticated with
`GITHUB_TOKEN` **does not create a new workflow run** -- GitHub's documented recursion guard, whose
only `pull_request` exception is a workflow that *opens or updates a PR*, and even then the run
lands approval-required. So a bot commit onto the branch under review becomes a head that the
repo's required checks **cannot run on and never will**. Two outcomes and the quiet one is the
danger: the PR blocks permanently, **or a maintainer sees four green checks -- green on the
PRE-BOT commit -- and merges a head no gate ever examined.** That is the 1.6.5 and 1.6.7 family one
layer out: **not whether the checker is right, but whether it ran on the artifact that ships.**

Where a workflow generates a **tracked** artifact, the `pull_request` arm regenerates, diffs, and
**fails on drift** naming the fix. Regeneration is a separate, human-opened change: a workflow that
must write pushes to a `chore/` branch a human opens a PR from, **never onto the branch under
review**. A PAT that does re-trigger is rejected on both counts -- it puts a branch-writing
credential in CI against the §7A topology narrowed at 1.6.10, and it fixes one workflow while
leaving the class open.

**This binds every workflow in the repo, not a stamped file.** Trigger 1 greps
`.github/workflows/**` for a `git push` on a `pull_request`-triggered job.

**THE VERIFY-BY IS JOB-LEVEL AND THAT IS STILL WRONG (v1.29, corrected by SK, which corrected the
Factory's own framing a second time).** v1.27 fixed the scope from a FILE to the action; v1.28 wrote
the test at the JOB. **The rule is about REACHABILITY and only a STEP-level read can see it.** SK's
`gen-types.yml` is ONE job carrying BOTH triggers with the push guarded by a step-level `if`, so a
job-level grep flags the very file the rule was written from -- run literally today it reports a
violation on the worked example, which is the fastest way to teach a fleet to discount a check.
**The test is: can this `git push` step be REACHED on a `pull_request` event?** Read the step's own
`if`, and the job's `if` and trigger set above it; a push under a step-level guard that excludes
`pull_request` is CONFORMANT and a push with no such guard is not. A grep for `git push` locates
CANDIDATES; it does not decide any of them. Third scope correction on one rule in three days, and
they trace one shape: **each fix was correct and the next blind spot was one level down.** Live read 2026-08-04
across all org repos: **three workflows self-commit** -- `simone-s-kitchen-hub/gen-types.yml`,
`aismith-hub/contact-export.yml`, `aismith-status/update-status.yml` -- and **only SK's is also
`pull_request`-triggered**, so only SK is affected today. The rule is written anyway because
generated artifacts (types, lockfiles, formatters, API clients) are the class a hub adds next, and
the fleet has grown one more self-committer since the patch was drafted.

**§7B does not reach this and cannot.** §7B binds *required* to *what runs on `pull_request`*, and
SK satisfies it completely: four run, four required. **Nothing relates the required set to the
commit that actually ships.**

**Third-party resolution in a gate's critical path is pinned WHEREVER IT APPEARS -- the rule
binds the ACTION, not the file (v1.27, hub-contract 1.6.9; SK contract patch 2026-08-01).**
Every `supabase/setup-cli` invocation **in any workflow in the repo** pins an explicit CLI
`version:` and passes `github-token: ${{ secrets.GITHUB_TOKEN }}`; `version: latest` resolves
through an *unauthenticated* GitHub API call and goes red on a shared-runner rate limit having
read nothing (ZG hub PR #95). The 1.6.5 fold stated this against `hub-deploy.yml`, reasoning
"it is a contract-owned file, so every hub on the current workflow carries this" -- which
silently put every **hub-authored** workflow outside the rule's reach. SK surfaced the
consequence: after pulling 1.6.8 it held two pinned invocations in the stamped
`hub-deploy.yml` and one unpinned in its own `gen-types.yml`, so it pushes migrations with a
pinned CLI and *describes the resulting schema* with a drifting one -- and `gen-types` commits
`types.ts`, the tracked artifact `frontend-check` typechecks 258 files against. The transferable
failure is **reproducibility**, not availability, and it is invisible to any rule scoped to a
stamped file. Generalise: where the contract pins a third-party resolution because a gate
depends on it, the pin is a property of the invocation and a Trigger-1 pull greps the whole
`.github/workflows/` tree for it, not just the file it stamps.

**Merge run-book.** Wait for **all** runs completed + success before merging -- a fast gate going
green is not the signal. GitHub deletes the merged branch on merge (`delete_branch_on_merge`, set
2026-09-29 on every non-archived repo in `AISmithFactory` and `aIsmith100`); still confirm the merge
API returned `merged: true` before reporting a merge, and if the branch survives a confirmed merge,
retarget every open PR stacked on it (`GET /pulls?base=<branch>`, then PATCH each one's `base`) and
only then delete it. Never delete a branch whose merge is not confirmed: that closes or orphans its
PR. (Seen on the
oli-hub build, 2026-07-14; matches the general Git-backed-projects rule.) **Superseded at 1.6.3:**
the standalone `migrations-check.yml` no longer exists -- it duplicated the in-file job with no
unique guard and 4 of 5 hubs never carried it, so it is dropped from the contract (bucket 4a). A
hub still carrying the file should delete it at its next deploy-touching pass.

### Recovering a drifted hub (one-time, before adopting the deploy pipe)

Canon prevents drift (separate-by-default DB + the repo-as-truth deploy pipe above), but has no
recovery path for a hub *already* drifted before adopting the pipe -- the normal entry state for
any Lovable/Studio-built hub joining the fleet (SK had only 5 of 31 tables ever written as
migrations). `supabase db pull` does **not** solve it: it rebuilds a shadow DB by replaying local
migrations, which fails when those reference Studio-made objects. One-time procedure:

1. **Capture live, not the repo:** `supabase db dump --schema public -f baseline.sql` -- a
   `pg_dump` is dependency-ordered and self-consistent, unlike partial migrations.
2. **Do NOT `db pull`** if existing migrations reference Studio-made objects -- the shadow rebuild
   dies on the first dangling reference.
3. **Adopt the dump as a single squash baseline migration;** archive the old partial migrations
   out of `supabase/migrations/`.
4. **Reconcile remote history:** `supabase migration repair --status reverted <each old version>`
   then `--status applied <baseline version>`.
5. **Verify:** `supabase db diff --linked --schema public` -> empty. (A lone `create extension ...`
   line for an extension the shadow pre-installs elsewhere -- e.g. `pg_net` -- is a known cosmetic
   residual, not drift.)
6. **Then adopt the deploy pipe (above)** so it can't re-drift; regenerate `types.ts`.

Worked example: SK (2026-06-23) -- 31 tables / 94 policies / 33 functions captured,
`db diff --linked` clean bar the `pg_net` line.

### Repo + GitHub

- The repo is source-of-truth; the front end is authored agent-direct
  (Claude Code) and two-way synced with GitHub.
- GitHub web editor / Codespaces / Claude Code can push back; the
  frontend deploys on push to `main` via Netlify.

### Edge Functions

**Edge Functions in `supabase/functions/*` deploy from the repo through
the hub deploy pipe** (`hub-deploy.yml`'s `functions deploy` step, on
merge, behind the `production` reviewer — see §7 "Hub deploy pipe").
There is no manual Studio paste-deploy step in the normal flow: edit the
function in the repo, open the PR, and the merge deploys it. The repo
stays the single source of truth.

### Edge Function error handling (mandatory)

Every Edge Function calling an external service (Resend, Stripe,
Mollie, Anthropic) must:

1. Check response status from the external call
2. Log status + body at every step
3. Throw / return 500 on non-2xx with the external error in the
   response body
4. Return success only after all external calls have confirmed

Silent 200s hid a months-long broken email pipeline on SK.

And wrap the **entire handler body in a top-level `try/catch`** that
returns through the CORS-setting JSON helper as
`json(500, {error, detail})` and `console.error`s the stack. Reason: an
unhandled throw makes Supabase return its default 500, which **doesn't
carry the function's CORS headers**, so the browser reports it as a CORS
error and hides the real cause -- a wasted debugging cycle. Every
function gets this by default.

### Preview vs published testing

Sandboxed-iframe previews silently swallow `window.open` / programmatic
`_blank` anchor clicks, so any action that opens a tab, triggers a
download, or pops a window can look broken in a preview and work first
try on the deployed (Netlify) URL. Test popup / navigation / download
side effects on the **deployed URL**; a preview is fine for layout and
in-page state only. (The same sandbox aborts http(s) image loads, so
verify photo-heavy pages on the deployed host, not in a sandbox
screenshot.)

### Frontend gotchas

- **A stale `routeTree.gen.ts` hides real pages.** TanStack Router's
  generated route tree can still import a file that was renamed, so a
  page that *exists* presents as "not built": the URL advances but the
  parent/list view re-renders, or you get `Failed to load url .../X.tsx`.
  **Regenerate** the route tree (router plugin / clean dev restart); do
  **not** recreate the "missing" file -- that reverts the rename and
  reinstates the bug. "UI not built" and "route not registered" are
  different failures with different fixes.
- **A "required" error on a filled field is an effect-reset race.** A
  create/edit dialog kept mounted across opens, with a `useEffect` that
  re-inits form state from `initial`, re-runs mid-edit and blanks the
  bound state before submit reads it -- the field shows the typed value
  on screen while the state is empty. Fix: re-mount per open (a changing
  `key`) and init directly from `initial`, never via a post-mount effect
  sync.

### Edge Functions + LLM (async generation)

An Edge Function that holds the HTTP connection open while an LLM streams
lives under the **150s gateway limit** (504 past it); a multi-section
subsidy draft runs 100-140s, already on the cliff. Don't stream
synchronously: validate fast and return **202**, run the model call in
`EdgeRuntime.waitUntil()` (the ~400s wall-clock budget on Pro), and have
the client fill from a **realtime subscription on the row**, not the
invoke response. Periodic-flush the accumulated text every ~15s so a
partial survives a cutoff and the screen fills progressively; signal
"done" with a column only the final write sets (e.g. `model_used`).
Practical single-pass ceiling ~22-32k output tokens; beyond that,
generate per-section across calls or use the Batch API. Pause the
editor's autosave during generation so it doesn't race the server
flushes.

### Server-side PDF generation

Generate document PDFs **server-side as real text**, never via browser
DOM-capture. html2canvas + jsPDF screenshots the DOM and can't parse
modern CSS (`oklch()` / `lab()` / `color-mix()` -- the Tailwind v4
defaults), so it rasterises blank-but-paginated pages; off-screen or
zero-size containers and pre-paint timing do the same. Pull rendering
into an Edge Function with a real-text PDF lib (pdf-lib / pdfmake) and
test it by console fetch -- don't relay render logic into the visual
builder, where you can't see which lib loaded. Two pdf-lib gotchas:
import via **`npm:pdf-lib@<pin>`**, not esm.sh (esm.sh loads at module
level but throws at render time in Deno -- now the general rule, see
"Edge-function imports" below); and StandardFonts are WinAnsi,
so **sanitise text** (guillemets, dashes, curly quotes, render the euro
sign as "EUR ") before `drawText`, or embed a Unicode font. Diagnostic
for a blank PDF: select-all -> text highlights = invisible white text (a
one-line colour fix); nothing selectable = still screenshotting the DOM.
Real text is also selectable and searchable -- a better funder artefact
than an image-of-text anyway.

### Edge-function imports: `npm:` / `jsr:`, never esm.sh

**Spine convention (v1.22, hub-contract 1.6.3).** Edge functions import third-party packages via
**`npm:<pkg>@<pinned-major>`** -- or `jsr:` where the package is jsr-native -- and **never**
`https://esm.sh/...`. Existing functions migrate opportunistically on next touch; new functions
comply from the template. Doc-level: no CI change, no re-audit owed.

*Why.* The bundler resolves imports at **every deploy**, so an esm.sh import makes a third-party
CDN a hard dependency of the fleet's sole production deploy path. ZG's `hub-deploy` aborted on
`main` (`ba21094`) with `Import 'https://esm.sh/@supabase/supabase-js@2' failed: 522` -- an esm.sh
outage failing a deploy of an *unrelated* function. A rerun succeeded, but nothing about the fix
was in ZG's control. `npm:`/`jsr:` specifiers resolve against the npm/jsr registries, are
registry-cached by the Supabase toolchain, and are the Supabase-recommended form. The fleet already
learned the runtime half of this once (`generate-fiscal-attestation` rev2 moved pdf-lib off esm.sh
after render-time flakiness); this generalises it to the deploy-time half. It also hardens the new
`deno-check` gate, which resolves remote imports and would otherwise inherit the same outage.

**`deno-check`'s `v1.x` PIN CARRIES ITS REASON AS OF v1.29, and the reason is much larger than the
pin looks** (raised by `zg-dossier-assistant` 2026-08-01, first READ 2026-08-04 because the channel
it sat in was invisible to every reconcile before then). `hub-deploy.yml` runs
`denoland/setup-deno@v1` with `deno-version: v1.x`, which reads as ordinary version hygiene. It is
load-bearing: **reproduced by the client, at Deno 2.9.4 a repo-root `package.json` puts Deno into
`byonm` mode and `deno check` fails on EVERY `npm:` specifier** -- which is to say on every
Edge function the `npm:`/`jsr:` rule directly above requires. So the pin is not preference, it is
the only thing keeping a required gate green on a hub whose repo root has a `package.json`, which
is every hub. **Deno 1.x is EOL**, so this is a dated position and not a resting place: moving it
means resolving byonm first, and the next session to bump the pin blind will red every hub at once.
It was raised as an OBSERVATION rather than a defect, which is exactly why nothing was owed against
it for three days. An undocumented pin is a decision nobody can re-take.

---

## 8. Belgian Context

### VAT rates (reordered by likelihood for our project types)

| Service / product | Rate | Notes |
|-------------------|------|-------|
| Music education by a VZW for under-25s | Often **VAT-exempt** under Art. 44 | Verify with accountant per project |
| Other cultural/educational services by recognised non-profits | Often Art. 44 exempt | Recognition required |
| Books, certain cultural services | 6% | |
| Standard services (SaaS, subscriptions, consulting) | 21% | |
| Restaurant dine-in (food only, excl. drinks) | 12% | |
| Food for off-premises consumption (takeaway, B&B breakfast) | 12% | |
| Gift cards | Rate of underlying redeemable product | |

Stripe Tax / Mollie's tax handling applies rates automatically once
configured. Always configure VAT per product type, not per customer.

### Legal structure

| Structure | When |
|-----------|------|
| BV (besloten vennootschap) | Commercial, for-profit |
| VZW (vereniging zonder winstoogmerk) | Non-profit, mission-driven, grant-eligible, Google for Nonprofits |
| Eenmanszaak / zelfstandige | Solo, personal liability |
| Smart.be umbrella | Project-based without registering self-employed |

### Regulators / registrations to check per project

- **KBO/BCE** -- enterprise number (every entity)
- **VAT registration** at FOD Financien (if turnover > EUR 25k/year)
- **GBA** -- supervisory authority for GDPR
- **FAVV/AFSCA** -- food safety (food-handling projects only)
- **Vlaams Logiesdecreet** -- accommodation (B&B only)
- **SABAM / Unisono** -- music licensing (any music performance/teaching)
- **Vlaams Onderwijsdepartement** -- only if issuing recognised diplomas
  (Deeltijds Kunstonderwijs / DKO). Most community music orgs are NOT
  DKO and don't trigger this.
- **AXA volunteer insurance** -- mandatory for VZWs working with
  volunteers. Annual or per-event registration.
- **Erkenning federale fiscale aftrek** -- VZWs issuing fiscal
  attestations for donations >= EUR 40 need federal recognition first.

Sector-specific operational workflows (SABAM annual reporting, AXA
volunteer registration, fiscal attestations, photo consent for
children, etc.) live in `as-project-playbook.md` under sector
extensions.

---

## 9. Payment Providers

| Provider | When |
|----------|------|
| **Stripe** (default) | International, SaaS, subscriptions, complex billing. Connect/Tax/Billing ecosystem is unmatched |
| **Mollie** (Belgian default for donations/local payments) | Belgian-owned, better Bancontact pricing, simpler for one-off payments + recurring donations. Preferred for donation-heavy VZW projects |

A VZW running a small webshop + donations is usually best on Mollie
alone. A project running subscriptions + multi-currency is usually
best on Stripe alone. Running both is acceptable but adds reconciliation
overhead -- avoid unless there's a real reason.

VAT handling:

- Stripe Tax (paid add-on, ~0.5% per transaction)
- Mollie has built-in EU VAT but less full-featured than Stripe Tax

---

## 10. Per-Project Setup Checklist

A new project starting from this blueprint walks through this list.
Conditional steps marked.

| Step | Task |
|------|------|
| 1 | Register domain at Cloudflare Registrar (or use existing legacy registrar if migrating later) |
| 2 | Set up Google Workspace on root domain. Apply for Google for Nonprofits if VZW |
| 3 | Create Supabase project (West EU Ireland, Micro compute) |
| 4 | Create GitHub repo(s) from the seed scaffold -- one per surface (app + hub, or hub only); clone locally for agent-direct authoring (`as-site-build-agent.md` §5) |
| 5 | Wire the repo to Supabase manually (BYO Supabase): `client.ts` (anon) + `client.server.ts` (service_role), secrets server-side, never in the `VITE_*` bundle |
| 6 | Create Stripe and/or Mollie account, configure Belgian VAT, add Bancontact + card |
| 7 | (Conditional) Create Resend account, verify `send.rootdomain.tld` |
| 8 | (Conditional) Add Anthropic API key to Supabase Edge Function secrets (never client bundle) -- only for AI projects |
| 9 | Create Brevo account, verify root domain, set up signup form |
| 10 | Spin up WordPress on Combell (or chosen managed EU host), install GeneratePress Premium + plugin kit |
| 11 | Configure Complianz + Plausible + WP Mail SMTP |
| 12 | Draft Privacy Policy, T&Cs, DPA, Cookie Policy from templates |
| 13 | Define brand tokens in `xx-tokens.md` |
| 14 | Wire UptimeRobot monitors for all surfaces |
| 15 | First agent-direct build: auth flow + role taxonomy for the hub (Claude Code from `seed + brief`) |
| 16 | First WordPress build: home + about + contact + legal pages |
| 17 | Run Lighthouse + WAVE accessibility checks at launch -- record baseline |

Information architecture, content migration, multilingual decisions,
sector extensions, governance, and budget all live in
`as-project-playbook.md` -- those are how-to-run-a-project concerns,
not stack concerns.

---

## 11. Gotchas (Learned)

- **DNS values: copy from source, never type.** Cost two months of
  failed Resend verification on SK.
- **Verify API key length after pasting into Supabase secrets.**
  Truncated paste produces a key that looks fine but fails silently.
- **Edge Functions deploy from the repo via the hub deploy pipe**
  (`hub-deploy.yml` `functions deploy` on merge) — not by manual
  Studio paste. Edit in the repo, open the PR, the merge deploys. (§7.)
- **Never silently swallow Edge Function errors.** Hid a months-long
  broken email pipeline on SK.
- **Cookiebot / Complianz inject sometimes blocked by theme.** WPCode
  is the reliable fallback for injecting cookie banners into `<head>`.
- **Keep agent edits scoped and verified.** Author the repo
  agent-direct (Claude Code from `seed + brief`, `as-site-build-agent.md`
  §5) and run the build green between changes -- agent-direct removed
  the legacy paste-loop frictions (the ~6-files-per-prompt ceiling, the
  ~15-file refactor burnout, angle-bracket stripping on pasted `.tsx`),
  but large refactors still want sequencing + a green check between
  steps.
- **Resend `send` subdomain avoids Google Workspace MX conflict.**
  Never put Resend SPF on the root.
- **Schema migrations need idempotent resume scripts** (`drop column
  if exists ... cascade` before `add column`).
- **Query CHECK constraints before sending new values.** SK Phase 12's
  admin reservation feature shipped with `source: 'admin'` that wasn't
  in the allow-list.
- **NOT NULL relaxations** for new admin flows must cover every table
  in the new flow, not just the obvious one.
- **Verify critical wiring against the repo, not a tool's claim.**
  Read the committed source in GitHub for critical wiring -- an AI
  builder (Lovable historically; any agent) can report a change as
  applied when it is not.
- **Cloudflare proxy + Wordfence conflict.** Pick one. Cloudflare wins
  for almost every project.
- **GoDaddy Managed WP blocks outbound SMTP** (587/465). Use an
  HTTPS-API transport (Brevo); diagnose by the hang, not an error.
  (§2 Email.)
- **Sandboxed previews swallow popups/downloads.** Test tab / download /
  window-open actions on the deployed URL, not a preview pane. (§7.)
- **A stale TanStack `routeTree.gen.ts` hides real pages.** Regenerate
  the route tree; don't recreate the "missing" file. (§7.)
- **An unhandled Edge Function throw masks as a CORS error.** Top-level
  try/catch returning through the CORS-setting helper. (§7.)
- **A .pptx doesn't carry its fonts.** Present decks from a
  LibreOffice-exported PDF (it embeds fonts) and ship the `.ttf` files
  too. (Detail in `as-project-playbook.md` §6.)

---

## 12. What This Doc Is And Isn't

**This doc owns:** tech defaults (hosting, plugins, frameworks, regions,
auth, DNS, build/deploy), per-project setup checklist, learned gotchas.

**This doc does not own:** how to design information architecture, how
to migrate from a legacy platform, how to handle multilingual rollout,
how to run sector-specific operations (music school, restaurant,
wellness), how to plan handover / bus-factor, how to budget. All of that
lives in `as-project-playbook.md`.

---

## 13. Companion Documents

- `master-atlas.md` -- **start here.** Cross-project navigation, file
  inventory, doc-layer map, legal entity map
- `as-project-playbook.md` -- how to run a project on this stack
- `as-hub-blueprint.md` -- the hub as a productised offering: module
  catalogue, role taxonomy, sector configurations, scoping framework
- `as-agency-model.md` -- the agency model: roles, agreements, the
  platform fee, authorisation (external agencies, not internal
  projects)
- `kt-technical.md` -- KT technical reference (worked example: app-only,
  no WP)
- `sk-hub-reference.md` -- SK Hub technical reference (worked example:
  WP + private hub, no public app)
- `as-site-spine-standard.md` **(v0.8, 18 Jun 2026)** — the **public-site spine**: a sibling to
  the hub spine, not a fork. Same stack (TanStack Start) and deploy doctrine, but an
  **inverted** security posture — the risk is exposure, not unauthorised mutation.
  Contracts to pin: stack; data posture (default = no DB, content in repo; DB or hub
  read-pipe is the declared exception); the one read-pipe doorway spec; **no secrets,
  no writes, no service-role, ever** (audit gate-fail if present); content-editing
  model (static-in-repo / hub edit-flow / headless CMS, declared per project);
  SSR/SEO baseline (meta, sitemap, prerender); server-runtime deploy target;
  ownership/§8 as its own transferable unit. Pairs with a **site template seed** (the
  public-site equivalent of "Hub — TEMPLATE") so a content-light site becomes a
  fleet-manufacturable archetype. Audit gets a public-site mode (no-writes /
  no-secrets / one-read-doorway / RLS on any exposed view).
- **`aismith-site-seed`** — the realised "Public Site — TEMPLATE" (AI Smith instance):
  semantic tokens valued Ink/Paper/Ember, six pages composed, voice-gate-clean. The first
  worked seed and the agent-proxy dry-run target.
- **`as-wordpress-site-kit.md`** *(to write)* — the WordPress delivery path for
  content-heavy / client-self-edited sites (§1B rule 3). Shares the site spine's token
  contract + section/card/CTA/header/footer grammar; **non-fleet** (pattern reuse, not
  code reuse), so it is a kit/playbook with a reduced build checklist, not a conformance
  standard. ZG (zuidgeluid.be) is the worked reference.

---

*Last Updated: 22 June 2026*
*Archived entry, 22 Jun 2026 (was the v1.11 tail): folded proposal item F (host model). Netlify (Pro, flat $20/mo, unlimited*
*[PRESERVED, NOT REWRITTEN (v1.29): "flat $20/mo" is what was believed on 22 Jun 2026 and this*
*entry's job is to record that. The live figure is a RATE and the body above now says so. Note that*
*this tail is the ABANDONED changelog -- `scripts/doc-version-check.sh` refuses to register this*
*file for exactly that reason (header 1.27 against a tail last at 1.11), so it is the one place*
*here a stale figure is correct and the two live body statements were the ones that had to move.]*
*members -- Netlify's Apr 2026 credit-based pricing) is now the canonical host for every front end.*
*§1A/§1B host model rewritten: SK is the one parked legacy exception (stays on Lovable publish --*
*Vite-SPA, different stack, mid-rewiring), ZG is the staged migration / test hub (not yet live ->*
*moves to Netlify first). `host` manifest enum default flipped lovable -> netlify (lovable retained*
*only as SK's declared legacy value). Domains/DNS: Netlify-hosted custom domain points by CNAME/ALIAS;*
*`demos.aismith.io` delegated to Netlify DNS by NS records at the Cloudflare registrar (the one*
*host-coupled DNS exception); demo subdomains become `<slug>.demos.aismith.io`. Supabase Edge*
*Functions runtime UNCHANGED. NOTE: this doc lives in `dist/hub-contract/`, so this bump RE-DISTRIBUTES*
*DOWN to every client hub on the next sync -- a fleet-wide event.*
*Archived entry, 21 Jun 2026 (was the v1.10 tail): folded proposal item E (authoring environment), host-independent parts only*
*(from `as-frontend-rethink-proposal-REVIEW.md`). §1A "Frontend" now records TWO validated authoring*
*paths -- agent-direct (Claude Code from seed + brief; the default; validated by the E spike, removes*
*the three Lovable frictions) and Lovable (the paste loop) -- pointing at `as-site-build-agent.md` §5.*
*This is an AUTHORING change only: the host model, the `host` manifest enum, and rendering-vs-runtime*
*are UNCHANGED. Moving the host off Lovable publish is the coupled-but-separate proposal item F, which*
*remains PENDING and is NOT folded. NOTE: this doc lives in `dist/hub-contract/`, so this bump*
*RE-DISTRIBUTES DOWN to every client hub on the next sync -- a fleet-wide event, not a private edit.*
*Archived entry, 21 Jun 2026 (was the v1.9 tail): folded proposal items G(stance) + H (from `as-frontend-rethink-proposal-REVIEW.md`).*
*§1B decision rule 1 now records TWO offerings — keep WP (hub behind it) OR convert to the built stack*
*(`as-site-build-wp-conversion.md`, reusing playbook §3); offer both, default to neither, client*
*preference to keep WP always honoured; convert preferred only for not-heavy/not-daily-edit sites.*
*§6 gained the GoDaddy → Cloudflare DNS-first consolidation note (DNS-first/registrar-later;*
*replicate Workspace MX + SPF/DKIM/DMARC and verify mail BEFORE flipping nameservers) — execution of*
*the existing Cloudflare-registrar/DNS canon, not a new rule; host-coupled DNS exceptions left for*
*later. The host model, the `host` manifest enum, and rendering-vs-runtime are UNCHANGED. NOTE: this*
*doc lives in `dist/hub-contract/`, so this bump RE-DISTRIBUTES DOWN to every client hub on the next*
*sync — a fleet-wide event, not a private Factory edit.*
*Archived entry, 19 Jun 2026 (was the v1.8 tail): §1B host model gained the rendering-vs-runtime clarification — front-end*
*rendering (SSG or Lovable-hosted SSR) is part of Lovable publish and allowed; new projects*
*default to Lovable's TanStack SSR starter (Café Kamiel publishes this way). "Runtime =*
*Supabase Edge Functions" governs data and business logic, not page rendering; the Lovable*
*Cloud ban targets data lock-in, which a repo-owned SSR