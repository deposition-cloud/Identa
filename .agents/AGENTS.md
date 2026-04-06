# Identa — Local Operations

**Parent:** `AGENTS.md` (repository constitution)
**Purpose:** Day-to-day operational details for agents and contributors.

## Dev Environment

**Stack:** Node 22, pnpm 10.33.0, Nuxt 4, Nuxt UI, TypeScript

```bash
# Install dependencies
pnpm install

# Local dev (plain Nuxt, no cluster)
pnpm dev

# Local dev with Tilt + Kind (full k8s inner loop)
pnpm dev:setup      # first time only — creates Kind cluster + registry
pnpm dev:up         # start Tilt (app at localhost:3000, Tilt UI at localhost:11350)
pnpm dev:down       # stop Tilt
pnpm dev:delete     # tear down cluster
```

## Cluster Setup

- **Kind cluster:** `kind-kind` (created by `ctlptl`)
- **Registry:** `localhost:5000`
- **App port:** `localhost:3000` (Tilt port-forward)
- **Tilt UI:** `localhost:11350`
- Config: `kind/ctlptl-cluster.yaml`

## Key Files

```
AGENTS.md                    ← repository constitution (read first)
.agents/AGENTS.md            ← this file (operational details)
ROADMAP.md                   ← phase index
docs/roadmap/                ← per-phase detail
Tiltfile                     ← Tilt orchestration
Dockerfile                   ← multi-stage: base / deps / dev / build / release
charts/identa/               ← Helm chart
kind/ctlptl-cluster.yaml     ← Kind cluster + registry
scripts/dev-setup.ts         ← prerequisite checks + cluster bootstrap
```

## Commit Workflow

Commits must use conventional commit format. No bare `git commit` — always
propose as a diff for human review first.

```
<type>(<scope>): <subject>

[body]

audit_log: <Invariant> — <one-line rationale>
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`

## Coding Conventions

- Framework: Nuxt 4 (`app/` directory layout)
- UI: `@nuxt/ui` components only — no raw Tailwind classes where a component exists
- No comments that narrate what the code does — only explain non-obvious intent
- `pnpm-lock.yaml` must always be committed with dependency changes

## Phase Sequencing Rule

Work proceeds strictly phase-by-phase (Roadmap phases 00–08). Do not start a
new phase until the current phase has met its acceptance criteria and the human
has confirmed readiness to proceed.

Current phase: **00 — Foundations** (not started)
