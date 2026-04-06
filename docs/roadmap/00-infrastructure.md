# Phase 0 — Infrastructure & Shell ✅

## Goal

Runnable local dev environment with a deployable container and project skeleton.

## What Was Built

- **Nuxt 4 + Nuxt UI 4 + Tailwind CSS v4** — full frontend framework stack
- **Dockerfile** — multi-stage build (base → deps → dev → build → release) on
  `node:22-bookworm-slim`
- **Tilt / Kind** — local Kubernetes dev loop with live-reload. Image pushed to
  `localhost:5000/identa`, live-update syncs `app/` and `public/`
- **Helm chart** — deployment + service templates under `charts/identa/`
- **Dev scripts** — `pnpm dev:setup` (Kind + registry), `pnpm dev:up` (Tilt)

## Acceptance Criteria (Met)

- [x] `pnpm dev` starts a working Nuxt dev server
- [x] `pnpm dev:up` deploys to local Kind cluster via Tilt
- [x] App is reachable at `http://localhost:3000`
- [x] Live-reload works for both host dev and Tilt
