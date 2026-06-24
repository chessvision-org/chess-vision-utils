## Summary

<!-- What does this PR change and why? Link any related issues: Fixes #123 -->

## Type of change

<!-- Delete lines that don't apply -->

- [ ] `feat` — new export or option (backward-compatible)
- [ ] `fix` — bug fix
- [ ] `perf` — performance improvement
- [ ] `refactor` — internal restructure, no behavior change
- [ ] `docs` — README, CHANGELOG, code comments only
- [ ] `test` — new or updated tests only
- [ ] `chore` — build, deps, CI

## Checklist

- [ ] PR title follows Conventional Commits: `type(scope): subject`
- [ ] `npm test` passes locally (72 tests green)
- [ ] `npm run typecheck` passes (no TypeScript errors)
- [ ] `npm run build` produces a clean `dist/`
- [ ] New public exports are documented in README.md
- [ ] New behavior has at least one test in `src/index.test.ts`
- [ ] No `any`, `@ts-ignore`, or non-null `!` assertions added
- [ ] Breaking changes are marked with `!` in the PR title and described below

## Breaking changes

<!-- If none, delete this section -->

<!-- Describe what breaks and the migration path:
**Before:**
```ts
generateDiagram({ ... })
```
**After:**
```ts
renderDiagram({ ... })
```
-->

## Testing

<!-- How did you verify this works? Paste relevant test output or describe manual steps -->

```
npm test

ℹ tests 72
ℹ pass 72
ℹ fail 0
```
