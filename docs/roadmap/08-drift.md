# Phase 8 — Drift Detection

## Goal

Monitor repositories for identity drift — missing, outdated, or inconsistent
branding assets — and offer automated corrections.

## Deliverables

- **Periodic scan** — scheduled job that checks repos for missing/outdated
  branding assets against the BrandFamily definition
- **Drift dashboard** — visual summary of which repos are compliant and which
  have drifted
- **One-click remediation** — generate a fix MR directly from the drift report
- **Notifications** — alert users when drift is detected (in-app, optional
  webhook/email)

## Acceptance Criteria

- [ ] Scan detects a manually deleted logo as drift within one scan cycle
- [ ] Dashboard shows compliant vs. drifted status for all family repos
- [ ] Remediation MR restores the correct assets
