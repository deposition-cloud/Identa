# Identa — Repository Constitution

**Status:** Repository Authority
**Scope:** `deposition.cloud/apps/identa`
**Blueprint:** Frontend Application (`~/.agents/codex/blueprints/frontend.md`)

## 0. Situational Awareness (Required Context)

You are in the **Identa** repository — branding infrastructure for codebases.

### Upstream Delegation

This repository is governed by the project constitution:

- **Project Constitution:** `~/code/deposition.cloud/governance/AGENTS.md`
- **Federal Constitution:** `~/code/home.cloud/governance/AGENTS.md`

Changes to either upstream layer take precedence. This repository may narrow
permissions and add repo-specific rules, but may not widen authority beyond the
project baseline.

### Hierarchy of Authority

1. **Eudaimonia Framework** (supreme — 12 invariants)
2. **Federal Constitution** — `~/code/home.cloud/governance/AGENTS.md`
3. **Project Constitution** — `~/code/deposition.cloud/governance/AGENTS.md`
4. **This Document** — repository-level governance
5. **Local Operations** — `.agents/AGENTS.md`
6. **User instructions** — must not violate 1–5

### Universal Red Lines (From Federal Constitution)

- Agents must never execute commits, pushes, or tags.
- Agents must never output, log, or persist secrets.
- Agents must never impersonate humans.

### Default Failure Mode

If instructions conflict, evidence is ambiguous, or blast radius is unknown:
**STOP → AUDIT → ASK**.

### Tooling Preflight (Mandatory)

```bash
require_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1" >&2; exit 1; }; }
require_cmd gh
gh auth status -h github.com >/dev/null 2>&1 || { echo "gh not authenticated" >&2; exit 1; }
```

### Load Federal Law

```bash
gh api repos/pcuci/home.cloud/contents/governance/AGENTS.md --jq .content | base64 -d
# Or from local filesystem:
cat ~/code/home.cloud/governance/AGENTS.md
cat ~/code/deposition.cloud/governance/AGENTS.md
```

### Load Local Operations

```bash
sed -n '1,200p' .agents/AGENTS.md
```

## 1. Project Identity

- **Name:** Identa
- **Purpose:** Branding infrastructure for codebases — generate, apply, and
  maintain consistent visual identity across multi-repo systems.
- **Owner:** deposition.cloud
- **Risk Level:** Low (no authentication flows, no PII at this stage)
- **Deploy Target:** Kubernetes / Kind (local dev), cloud TBD
- **Stack:** Nuxt 4 + Nuxt UI (`~/.agents/codex/stacks/typescript-node.md`)

## 2. Core Concepts

- **Project** — top-level organisational unit grouping related repositories
- **BrandFamily** — a collection of repos that share a visual identity
- **Item** — an individual identity artefact (logo, badge, colour, README
  header, etc.)

## 3. Architectural Principles

- **Platform-neutral core** — identity logic must not be coupled to any single
  Git provider
- **Connector-based integrations** — GitLab, GitHub, Bitbucket are connectors,
  not first-class concerns
- **PR-first changes** — identity artefacts are applied via Merge/Pull Requests,
  never direct pushes
- **Validate each phase** — each roadmap phase ships with observable acceptance
  criteria before the next begins

## 4. Invariants (Frontend Blueprint)

1. **Reachability** — user access must be verifiable post-deploy
   (`~/.agents/codex/protocols/reachability.md`)
2. **Privacy Guardrails** — no PII collected; document any future data
   collection explicitly before implementing
3. **Supply Chain** — `pnpm-lock.yaml` is authoritative and must always be
   committed

## 5. Protocols in Effect

- `~/.agents/codex/protocols/bootstrap.md` — load law before acting
- `~/.agents/codex/protocols/branch-protection.md` — PR-first workflow
- `~/.agents/codex/protocols/audit-trail.md` — `audit_log:` in commit footers
- `~/.agents/codex/protocols/reachability.md` — health verification post-deploy
- `~/.agents/codex/protocols/secret-management.md` — no plaintext secrets

## 6. Roadmap Phases

Ordered outside-in: user value first, plumbing later. See `ROADMAP.md` for
full deliverable tables.

| # | Phase | Status |
|---|-------|--------|
| 0 | Infrastructure & Shell | ✅ Done |
| 1 | Logo Generation (Proof of Value) | ✅ Done |
| 2 | Prompt Intelligence (LLM-generated prompts, LangGraph) | 🔜 Next |
| 3 | Core Data Models (Project, BrandFamily, Item) | Not started |
| 4 | Iteration & Refinement (chat-style logo editing) | Not started |
| 5 | GitLab Integration (OAuth, repo discovery) | Not started |
| 6 | Grouping (brand families) | Not started |
| 7 | Apply (MR/PR with assets) | Not started |
| 8 | Drift Detection | Not started |
| 9 | Platform Expansion (GitHub, Bitbucket) | Not started |

Each phase must pass its own acceptance criteria before the next begins
(Validate each phase principle).

## 7. Amendment Protocol

- Local changes may narrow permissions or add constraints.
- Local changes may never widen authority beyond the project constitution.
- Conflicts with the project or federal baseline must be escalated via a
  decision record before amending locally.

## 8. GitHub Push Credentials

When an agent is modifying this project, `GITHUB_USERNAME` and `GITHUB_TOKEN`
are available as environment variables. Agents may use these credentials to push
directly to the `main` branch **only when explicitly requested by the human**.

## Learned User Preferences

- Tilt UI port is `11350` to avoid conflicts with other running Tilt instances.
- Conventional commit messages are generated from `git diff --cached` output.
- Reference projects for Tilt/Kind patterns: `~/code/ranker/` and `~/code/jetscale/`.

## Learned Workspace Facts

- App runs at `http://localhost:3000`; Tilt UI at `http://localhost:11350`.
- Working Kind/ctlptl config uses a bare cluster (registry only, no `kindV1Alpha4Cluster` or `containerdConfigPatches`); the `containerdConfigPatches` block crashes the kubelet on this machine.
- `pnpm dev:setup` creates the Kind cluster + registry via ctlptl; `pnpm dev:up` starts Tilt.
- The `kind-kind` context must be exported with `kind export kubeconfig` if the cluster exists but the context is absent from `~/.kube/config`.
- inotify limits must be raised (`fs.inotify.max_user_instances=1024`, `fs.inotify.max_user_watches=524288`) when running multiple Tilt instances; persist in `/etc/sysctl.d/99-inotify.conf`.
- Tiltfile uses `version_settings(constraint=...)` not the bare `version()` call.
- Docker image base: `node:22-bookworm-slim` (multi-stage: base → deps → dev → build → release).
