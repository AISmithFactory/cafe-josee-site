# AI Smith — client config-conformance standard

**Version 1.3 -- 11 October 2026.**

The single home for the per-class **config-conformance checklist** — the question
"does this project's *plumbing* match the fleet model, not just its contract version?"
This is the **config sibling of the spine audit**: the spine audit (`as-hub-spine-standard.md`
/ `as-site-spine-standard.md`) conforms a project's *code*; this conforms its *plumbing*.

Canon origin: **§9 of `as-fleet-organisation.md`** (the narrative). This doc is the citable,
itemized extract so the checklist lives in **one** place. It is consumed by:

- **Trigger 1 step 5** (`prompts/fleet-sync-triggers.md`) — runs it as part of the down-sync.
- **`prompts/client-config-check.md`** — runs it standalone, on demand, with no contract pull.

Nothing here restates a rule that belongs elsewhere; enforcing copies of the underlying locks
live in global settings + each folder-instruction box. This standard only itemizes what a client
session checks and reports.

## How to score

The client session **self-assesses** and reports each item as **pass / fail / declared-exception**,
**assessed against the project's class** — a dedicated client and the multi-tenant Workshop are
different shapes, so run the right list. A genuine **fail** (not a declared exception) routes to the
operator like a §-bucket-2 item; declared exceptions are **recorded, never counted as fails**.

## Dedicated client (ZG, SK, any graduated tenant)

- **Own canon repo** — not shared with another project?
- **Two surfaces** — a client-shared claude.ai Project + a builder-only Cowork project?
- **Sync scope — by surface.** The **client-shared claude.ai Project** syncs ONLY its own canon +
  the file-selected `dist/` subset — never the whole Factory, never another client's repo (the
  confidentiality boundary). A **builder-only Cowork project** (no client present) MAY hold broader
  Factory canon for context when the work needs it — read-context, not a breach, and it does not
  widen write/credential scope (see Credential scope).
- **Account** — where the model says (new builds = org; the only declared personal exceptions are
  the Factory canon repo and SK-until-migration)?
- **Branch protection** — enforced on `main` (require up-to-date + required check + no force-push, `enforce_admins` on)?
- **CI gates present** (hub track, hub-contract 1.6.3) — does `.github/workflows/hub-deploy.yml` carry all three PR
  gates (`migrations-check`, `frontend-check`, `deno-check`) at the stamped sha? `migrations-check` must be a
  **required** status check. The two typecheck gates are **staged**: present and reporting counts as pass; required
  is the target state once observed green, and marking them required before that bricks the hub's merge path. A
  hub still carrying a standalone `migrations-check.yml` should delete it (dropped from the contract at 1.6.3).
- **Credential scope** — the project's token reaches only its own repos + read-only the contract?
- **Production credentials live in an ENVIRONMENT, never at repo level** (hub-contract 1.6.10; see
  "Credential scope tiers" below). Every secret that reaches a tenant's production sits on the
  `production` environment, that environment carries a **deployment branch policy naming `main`**,
  and **every workflow that consumes one declares `environment: production`**. A repo-level
  production secret is a FAIL, not an exception: repo secrets are readable by any workflow on any
  branch of the repo, including a workflow added in a pull request, so **write access to the repo
  is equivalent to holding the credential**. Only fork PRs are denied. Verified across the fleet
  2026-08-01 and remediated on `oli-hub`, `simone-s-kitchen-hub` and `zuidgeluid-hub`.
- **Folder instructions** — a thin pointer (binding + canon/global pointers, no restated rules)?

## Workshop (the one multi-tenant pool — many demos + simple sites/hubs in a single shared workspace)

- **One shared workspace, one repo per tenant artifact** (`<tenant>/site`, `<tenant>/hub`)?
- **Each tenant repo** carries code + the file-selected `dist/` contract + a charter + a manifest,
  with **in-repo `docs/`** (not a separate canon repo — it's below the threshold for one)?
- **No cross-tenant memory bleed** — every tenant's context lives in its own folder/repo, never in
  the shared workspace's memory?
- **Graduation by trigger** — a tenant that has outgrown "simple" moves to its own Cowork project
  (+ a cloud Project); graduation *adds a surface*, it never restructures the repos underneath.

## Credential scope tiers (hub-contract 1.6.10)

The governing rule is an inverse: **the more repos a credential is visible to, the less capability
it may carry.** Scope and capability move in opposite directions, and a credential that violates
this is mis-tiered even when nothing has gone wrong yet.

| Tier | Where it lives | May carry | Example |
|---|---|---|---|
| **Org-wide** | org-level Actions secret | read-only, on a **fleet-common** asset | `SEED_READ_TOKEN` (contents:read on `aismith-site-seed`) |
| **Environment** | `production` env on one repo, branch-policied to `main` | writes to exactly **one tenant's** production | secrets `SM_ACCESS_TOKEN` (the hub's Secrets Manager machine account, which fetches `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD` and the rest of the hub's map at run time) and `SUPABASE_ACCESS_TOKEN` (read by the Edge Functions steps alone); variables, not secrets, `SM_SECRET_MAP` and `SUPABASE_POOLER_HOST` (hub-contract 1.7.18; the full set is `docs/credential-register.md`'s) |
| **Repo** | repo-level Actions secret | nothing that reaches production | non-production, non-tenant values only |

A credential qualifies for **org-wide** only if all three hold: it is **read-only**, it is
**identical for every consumer**, and its target is **fleet-common rather than tenant-owned**. A
tenant credential fails the last two definitionally, so it is never org-wide -- its whole purpose
is to reach exactly one tenant.

**Per-repo provisioning of a fleet-common credential is itself the defect.** `SEED_READ_TOKEN` was
issued once, by hand, as a repo secret on one site on 2026-07-27; the next site to wire the gate
hit the wall five days later, and the credential register had already recorded the same failure on
the first site. A shared credential provisioned per repo is forgotten on the repo that matters.

**Naming is not scoping.** The fleet held seven Supabase tokens named per repo
(`gh-actions-skhub`, `gh-action-ZG-Hub`, ...) which reads as tenant isolation and is not: Supabase
management tokens are **account-scoped**, so each one reaches every project in the account, and no
project-scoped token type exists (checked 2026-08-01 -- the only alternative offered is an
experimental-API token). Distinct tokens buy **revocability and attribution**, not isolation. Where
a credential model cannot express the boundary the naming implies, the boundary is enforced by
**reachability** (the environment rule above), and the naming must not be read as a control. Real
isolation would require one Supabase org per client, which is a per-org paid plan; recorded as a
deliberate cost decision, revisit if a non-owner gains merge rights to `main` or a client requires
it contractually.

**Two traps, both observed:**

1. **The environment branch policy fails OPEN until a rule exists.** Setting the mode to "Selected
   branches and tags" saves successfully and still permits every branch -- the UI states plainly
   that "all branches and tags are still allowed to deploy" -- until a named rule is added. Setting
   the mode is half the control; assert the **rule list**, not the mode.
2. **An environment secret SHADOWS a repo secret of the same name**, and an org secret is shadowed
   by both. So a stale repo-level copy silently wins over the org value it was meant to be replaced
   by, and the divergence surfaces only when the shadowed value is rotated. After promoting a
   credential up a tier, **delete the lower-tier copy** -- leaving it is not a fallback, it is a
   silent override.

**A credential-dependent gate owes a row in two places.** The contract row that requires the gate
and the `docs/credential-register.md` row that tracks the credential are one fact; neither is
complete alone. The register knew on 2026-07-27 that ZG's spine gate had never run for want of
`SEED_READ_TOKEN`, and the site track raised the identical finding as a contract patch five days
later, because nothing joins them.

## Declared exceptions (recorded, never counted as fails)

- **SK** shares `SK-KT-Canon` with KT and stays on the personal account until its migration; SK's
  client-facing surface stays scoped to `dist/hub-contract`.
- **SK's builder-only Cowork project** holds the FULL Factory canon for context while SK and KT stay
  entangled (separating the shared `SK-KT-Canon` is non-trivial — revisit at the SK split).
- The **Factory canon repo** stays personal by design (§7A).
- The **Workshop** legitimately holds many tenant repos under one bounded-multi-repo credential — the
  sanctioned exception to "own repos only."

---

*v1.3 -- 11 October 2026: **the file carries its FIRST version header, agreeing with this entry, and is registered in `scripts/doc-version-check.sh`** (hub-contract 1.7.21 / site-contract 1.8.31, the coupled cut; R182; `prompts/dispatch/plan-cut-1721-1831-2026-10-11.md` v0.2 E9). `grep -c '^\*\*Version'` read 0 and the newest entry was v1.2, so the checker that joins a header to its newest entry could not see this file; a header added alone would have moved stamped bytes in BOTH contracts under unchanged versions, which is why it rides this cut. **Its changelog is classified for the T3 register (R167)**: three entries, v1.2, v1.1 and v1.0, ALL RECORDS, no promotion owed (v1.1's tier table, inverse rule, environment rule and two traps, and v1.2's Environment row, already live in the Dedicated-client checklist and the Credential scope tiers sections). No body text moves. The title's em dashes are not this entry's to move (the plan's SS6); this entry and the header add none.*

*v1.2 -- 25 September 2026: **the Environment row names what a hub's `production` environment holds at hub-contract 1.7.18** (hub-contract 1.7.18 / site-contract 1.8.30). It listed `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD` and `SUPABASE_SERVICE_ROLE_KEY` as production's values; since 1.7.16 the database password and the project ref come from Bitwarden Secrets Manager through the environment secret `SM_ACCESS_TOKEN`, since 1.7.18 `SUPABASE_ACCESS_TOKEN` is read by the Edge Functions steps alone, and the environment carries two variables, `SM_SECRET_MAP` and `SUPABASE_POOLER_HOST`. attacker-2's code review of Factory #1158 (F10, the controller's ruling). The tier rule itself does not move. No em-dashes.*

*v1.1 -- 1 August 2026: **credential scope tiers + the environment rule** (hub-contract 1.6.10 / site-contract 1.8.5). Written after a fleet-wide read on 2026-08-01 found every hub holding its Supabase production credentials as REPO-level secrets, which any workflow on any branch can read -- so write access to a hub repo was equivalent to that hub's production database password, and two hubs held `SUPABASE_SERVICE_ROLE_KEY`, a full RLS bypass, on that footing. Not theoretical: `aismith-hub` already runs a `pull_request`-triggered workflow touching Supabase. The trigger for writing it down was the decision to give trainees org access; the defect predates that and applies to a one-person org too, since `allowed_actions` was unrestricted and a third-party Action reaches whatever a workflow can see. New: the three-tier table (org-wide requires read-only + uniform + fleet-common; tenant credentials live in an environment branch-policied to `main`; repo level carries nothing that reaches production), the inverse-capability rule, the naming-is-not-scoping finding from the account-scoped Supabase tokens, the two shadowing/fail-open traps, and the register-and-contract-are-one-fact rule. Remediated in the same pass on `oli-hub`, `simone-s-kitchen-hub` and `zuidgeluid-hub`; `aismith-hub` and `zg-dossier-assistant` need workflow changes first and are sequenced behind their in-flight PRs. No em-dashes.*

*v1.0 — 26 June 2026: created. Extracted the §9 config-conformance self-check into its own
canonical, class-aware checklist (dedicated-client + workshop) so Trigger 1 and the standalone
`client-config-check` prompt point at one source instead of restating it. Pointers only; narrative
home = §9 of `as-fleet-organisation.md`.*
