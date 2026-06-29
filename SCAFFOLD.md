# SCAFFOLD — known-good build target

This seed is an **overlay**, not a whole project. The build agent (Lovable) scaffolds a
fresh **TanStack Start + SSR** project; these files drop in over it. Pin the scaffold here
so the next build diffs against a known-good baseline instead of "whatever today's Lovable
gives."

## API surface the seed targets (TanStack Start / Router v1)
- `createRootRoute`, `createFileRoute`
- route `head()` returning `{ meta: [...], links: [...] }`
- `HeadContent` + `Scripts` in the root document shell (`__root.tsx` owns `<html lang>`)
- file-based routing under `src/routes` with a generated `routeTree.gen.ts`

## Versions — fill from the first successful build, do NOT guess
Record the exact versions from `package.json` after the first green build, commit this
file, and treat it as the baseline the next agent diffs against.
