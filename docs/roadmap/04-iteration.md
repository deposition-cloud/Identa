# Phase 4 — Iteration & Refinement

## Goal

Let users refine a chosen logo through conversational interaction rather than
generating from scratch each time. Move from "slot machine" to "creative
collaboration."

## Deliverables

- **Select as base** — click a generated logo to enter refinement mode
- **Chat-style refinement** — natural language instructions ("make it more
  angular", "use blue tones", "remove the circle") applied as prompt
  modifications to the same conceptual direction
- **Side-by-side comparison** — view original and refined versions together
- **Version history** — each refinement creates a new Item version within the
  BrandFamily, with the prompt and parent version linked
- **Undo / branch** — go back to any previous version and try a different
  refinement direction

## Acceptance Criteria

- [ ] User can select a logo and refine it with text instructions
- [ ] Refinements produce visually related (not random) variations
- [ ] At least 3 refinement steps can be chained without quality degradation
- [ ] Version history is visible and navigable in the UI
