# Phase 5 — GitLab Integration

## Goal

Connect to real repositories. Replace the hardcoded demo repo with
user-authenticated access to their GitLab account.

## Deliverables

- **GitLab OAuth** — authenticate users and store tokens securely
- **Repository discovery** — list user's repos, groups, and subgroups
- **Metadata ingestion** — pull README content, description, topics, languages,
  and avatar for each repo to feed into prompt generation (Phase 2)
- **Repo selector UI** — searchable dropdown/list replacing the hardcoded mock

## Connector Abstraction

GitLab is the first connector, but the interface should be provider-agnostic:

```typescript
interface RepoConnector {
  listRepos(auth: AuthToken): Promise<Repo[]>
  getRepoMeta(auth: AuthToken, repoId: string): Promise<RepoMeta>
  createMR(auth: AuthToken, repoId: string, changes: FileChange[]): Promise<MRUrl>
}
```

## Acceptance Criteria

- [ ] User can sign in with GitLab OAuth
- [ ] Repo list displays within 3 seconds of authentication
- [ ] Selecting a repo populates the generation UI with real metadata
- [ ] Connector interface is defined such that adding GitHub later requires only
      a new implementation, no UI changes
