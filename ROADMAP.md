# Identa Roadmap

Branding infrastructure for codebases — generate, apply, and maintain consistent
visual identity across multi-repo systems.

**Approach:** Outside-in. Start from user-perceived value (generate a logo),
then layer in intelligence, persistence, connectors, and automation.

---

## Phase 0 — Infrastructure & Shell ✅

Local dev stack, project skeleton, CI-ready container.

| Deliverable | Status |
|---|---|
| Nuxt 4 + Nuxt UI 4 + Tailwind CSS v4 | ✅ Done |
| Dockerfile (multi-stage, dev + release) | ✅ Done |
| Tilt / Kind local Kubernetes dev loop | ✅ Done |
| Helm chart (deployment, service) | ✅ Done |
| `pnpm dev:setup` / `pnpm dev:up` scripts | ✅ Done |

---

## Phase 1 — Logo Generation (Proof of Value) ✅

Single-page prototype that generates logos for a hardcoded repo. Validates the
core value proposition: *give me a repo, get back logo options.*

| Deliverable | Status |
|---|---|
| `/api/generate-logos` POST endpoint (OpenRouter → Gemini image model) | ✅ Done |
| Server-side resize to 512×512 via Sharp | ✅ Done |
| Style cycling (geometric, organic, abstract, minimal, tech, playful) | ✅ Done |
| UI: generate one at a time, accumulate in a tiled gallery | ✅ Done |
| Loading skeleton, error states, transition animations | ✅ Done |

---

## Phase 2 — Prompt Intelligence 🔜

Replace static style descriptions with LLM-generated prompts. The image model
is only as good as the prompt it receives — an LLM that *reasons about the
project* before writing the image prompt will produce dramatically better logos.

| Deliverable | Status |
|---|---|
| LLM prompt-generation step (repo context → image prompt) | Not started |
| Prompt diversity strategy (ensure each call explores a genuinely different direction) | Not started |
| Optional: LangGraph.js agent graph for Analyze → Generate → Evaluate → Refine | Not started |
| Prompt/result logging for quality iteration | Not started |

**Key question:** Start with a single LLM call for prompt generation, graduate
to a LangGraph agent graph when we need evaluation loops or memory.

---

## Phase 3 — Core Data Models

Define the domain model that persists across sessions and connects repos to
brand families.

| Deliverable | Status |
|---|---|
| `Project` model — top-level organisational unit | Not started |
| `BrandFamily` model — repos that share a visual identity | Not started |
| `Item` model — individual artefact (logo, badge, colour, README header) | Not started |
| Database integration (SQLite/Turso for dev, Postgres for prod) | Not started |
| Shared TypeScript types / Zod schemas | Not started |

---

## Phase 4 — Iteration & Refinement

Let users refine a chosen logo through conversational interaction rather than
generating from scratch each time.

| Deliverable | Status |
|---|---|
| Select a generated logo as "base" for refinement | Not started |
| Chat-style refinement ("make it more angular", "use blue tones") | Not started |
| Side-by-side comparison view | Not started |
| Version history per BrandFamily | Not started |

---

## Phase 5 — GitLab Integration

Connect to real repositories. GitLab first (primary user workflow), other
providers via the connector abstraction.

| Deliverable | Status |
|---|---|
| GitLab OAuth flow | Not started |
| Repository discovery and listing | Not started |
| README + metadata ingestion for context | Not started |
| Repo selector replacing hardcoded mock | Not started |

---

## Phase 6 — Grouping

Let users organise repositories into brand families and generate cohesive
identity systems rather than individual logos.

| Deliverable | Status |
|---|---|
| UI for selecting related repos into a BrandFamily | Not started |
| Shared colour palette / visual language across family | Not started |
| Consistency scoring between family members | Not started |

---

## Phase 7 — Apply

Push generated assets back to repositories via merge requests.

| Deliverable | Status |
|---|---|
| Generate MR/PR with logo files, favicon, README badge | Not started |
| Preview diff before submission | Not started |
| Configurable file placement rules per repo | Not started |

---

## Phase 8 — Drift Detection

Monitor repositories for identity drift and offer corrections.

| Deliverable | Status |
|---|---|
| Periodic scan for missing/outdated branding assets | Not started |
| Notification / dashboard for drift status | Not started |
| One-click remediation MR | Not started |

---

## Phase 9 — Platform Expansion

Add connectors for GitHub, Bitbucket, and other providers.

| Deliverable | Status |
|---|---|
| Connector abstraction layer (provider-agnostic interface) | Not started |
| GitHub connector | Not started |
| Bitbucket connector | Not started |
| Provider-specific MR/PR formatting | Not started |

---

## Principles

- **Outside-in** — build what users see first, stub the plumbing
- **Platform-neutral core** — identity logic decoupled from Git providers
- **Connector-based integrations** — GitLab, GitHub, Bitbucket as connectors
- **PR-first changes** — assets applied via MR/PR, never direct pushes
- **Validate each phase** — observable acceptance criteria before moving on
