# Phase 3 — Core Data Models

## Goal

Define the domain model that persists across sessions and connects repos to
brand families. Without this, every session starts from zero.

## Deliverables

### Models

- **Project** — top-level organisational unit (e.g. "deposition.cloud"). Groups
  multiple repos under a single owner context.
- **BrandFamily** — a subset of repos within a project that share a visual
  identity (e.g. all microservices in a platform get the same colour palette
  with individual icon variations).
- **Item** — an individual identity artefact: logo, favicon, badge, colour
  token, README header image, social preview, etc.

### Schema & Storage

- Shared TypeScript types and Zod validation schemas under `shared/types/`
- Database: SQLite via Drizzle ORM for local dev (file-based, zero config).
  Migration path to Turso (hosted SQLite) or Postgres for production.
- Server API routes for CRUD operations on each model

### Relationships

```
Project 1──* BrandFamily 1──* Item
                  │
                  └──* Repo (linked via connector)
```

## Acceptance Criteria

- [ ] Models are defined with Zod schemas and Drizzle ORM table definitions
- [ ] CRUD API routes exist for Project, BrandFamily, and Item
- [ ] Generated logos from Phase 1–2 can be saved as Items within a BrandFamily
- [ ] Data persists across server restarts (SQLite file)
