# Phase 9 — Platform Expansion

## Goal

Add connectors for GitHub, Bitbucket, and other Git providers. Validate the
platform-neutral architecture established in Phase 5.

## Deliverables

- **GitHub connector** — OAuth, repo discovery, PR creation via the existing
  `RepoConnector` interface
- **Bitbucket connector** — same interface, Bitbucket-specific API calls
- **Provider-specific formatting** — adapt MR descriptions, commit messages,
  and file paths to each platform's conventions
- **Multi-provider projects** — a single Project can contain repos from
  different providers within the same BrandFamily

## Acceptance Criteria

- [ ] User can authenticate with GitHub and generate logos for GitHub repos
- [ ] A BrandFamily can contain repos from both GitLab and GitHub
- [ ] Adding a new provider requires only implementing `RepoConnector`, no UI
      changes
