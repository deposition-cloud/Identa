# Phase 7 — Apply

## Goal

Push generated assets back to repositories via merge requests. Close the loop
from generation to actual usage.

## Deliverables

- **Asset bundle** — generate the full set of files for a repo: logo (SVG +
  PNG at multiple sizes), favicon (ICO + webmanifest), README badge, social
  preview image
- **MR/PR creation** — use the connector to create a merge request with the
  asset files placed in the correct locations
- **Preview diff** — show the user exactly what files will be added/changed
  before submitting
- **Placement rules** — configurable per-repo rules for where assets go (e.g.
  `public/logo.png`, `assets/brand/`, `.github/`)

## Acceptance Criteria

- [ ] User can click "Apply" on a finalised logo and get a merge request
- [ ] MR contains correctly sized and named asset files
- [ ] User sees a preview of file changes before the MR is created
