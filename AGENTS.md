# AGENTS.md

Guidance for coding agents working in this repository.

## Overview

`@sourcegraph/smoke-tests` is a Yarn workspaces monorepo of smoke tests run against
Sourcegraph instances. It contains two packages under `packages/`:

- `web-functionality` (`@sourcegraph/web-smoke-tests`) — Puppeteer/Jest checks that a
  deployed instance functions correctly. Source lives in `packages/web-functionality/src`,
  with the entrypoint at `src/index.js`. Published to npm via semantic-release.
- `web-performance` (`@sourcegraph/web-smoke-performance`) — periodic Lighthouse audits
  against Sourcegraph.com, driven by `packages/web-performance/report.sh`. Results are
  committed to `packages/web-performance/reports/`.

The repo is TypeScript (compiled with `tsc`), targeting Node `16.7.0` (see `.nvmrc`).

## Setup

```bash
nvm use            # Node 16.7.0, per .nvmrc
yarn               # install all workspace dependencies
```

## Common commands

Run package scripts from within the relevant package directory.

`packages/web-functionality`:

```bash
yarn build           # tsc
yarn test            # build, then run checks against https://sourcegraph.com/search
yarn eslint          # lint '**/*.[tj]s'
yarn prettier-check  # prettier --check .
```

Run the published functionality tests against an instance:

```bash
SOURCEGRAPH_URL="https://sourcegraph.com" npx @sourcegraph/web-smoke-tests@latest start
```

`packages/web-performance` (requires `jq` and the LHCI CLI from deps):

```bash
./report.sh "<name>" "<url>" ./reports/<file>.json
```

## Conventions

- Commit messages follow [Conventional Commits](https://conventionalcommits.org/) and are
  linted by commitlint via a Husky `commit-msg` hook. Use `git commit --no-verify` or
  `fixup!` autosquash for fixup commits.
- Releases are automated in CI (`semantic-release`) on merges to `main`.
- ESLint config extends `@sourcegraph/eslint-config`; Prettier extends `@sourcegraph/prettierrc`.

## CI

- `.github/workflows/build.yml` — on push/PR: installs deps, runs `prettier-check`,
  `eslint`, `build` for `web-functionality`, and releases on `main`.
- `.github/workflows/lighthouse.yml` — scheduled (every 4 hours) and manual; runs the
  Lighthouse audits and commits the generated reports.
