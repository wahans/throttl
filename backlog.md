# Throttl - Backlog

> Lightweight API key management with built-in usage quotas and real-time tracking.

---

## In Production

<!-- Features/items that are live and working -->

**API Server:** https://server-production-ea3b.up.railway.app
**Dashboard:** https://dashboard-production-0c49.up.railway.app

- [x] **Core API** | Plans, Keys, Validation endpoints
- [x] **Redis storage** | Railway-managed Redis instance
- [x] **Tiered plans** | free (1k), pro (50k), enterprise (500k)
- [x] **Dashboard** | Auth, key management, usage overview

---

## In Progress

<!-- Currently being worked on -->

---

## Ideas / Future Features

<!--
Entry format:
- [ ] **Item description** | Priority: high/med/low | Added: YYYY-MM-DD | Notes: optional context
-->

### Dashboard
- [x] **Real-time usage dashboard** | Priority: med | Added: 2026-01-13 | Notes: deployed to Railway
- [x] **Usage graphs/charts** | Priority: med | Added: 2026-01-13 | Notes: recharts integration
- [x] **Key management UI** | Priority: med | Added: 2026-01-13 | Notes: create/revoke with plan selector

### Alerts & Notifications
- [x] **90% quota threshold alert** | Priority: med | Added: 2026-01-13 | Notes: returned in validation response
- [x] **Webhook notifications** | Priority: low | Added: 2026-01-13 | Notes: POST to user-configured URLs on 90%/100%
- [ ] **Email notifications** | Priority: low | Added: 2026-01-13 | Notes: optional email alerts
- [ ] **Anomaly detection** | Priority: low | Added: 2026-01-13 | Notes: flag unusual spikes in usage

### Advanced Features
- [ ] **Per-endpoint rate limits** | Priority: low | Added: 2026-01-13 | Notes: different limits for different routes
- [x] **Usage export** | Priority: low | Added: 2026-01-13 | Notes: CSV/JSON export at /api/keys/export/usage
- [x] **Multi-tenant support** | Priority: med | Added: 2026-01-13 | Notes: per-user key scoping via ownerId

---

## Questions to Discuss

<!-- Open questions that need decisions -->

---

## Bugs / Issues

<!--
Entry format:
- [ ] **Bug description** | Severity: critical/high/med/low | Added: YYYY-MM-DD | Notes: steps to reproduce
-->

---

## Low Priority / Nice to Have

<!-- Ideas that aren't urgent but would be good eventually -->

---

## Archived / Completed

<!-- Done items moved here for reference -->

### Core MVP (2026-01-13)
- [x] **API key generation** | create, revoke, regenerate keys
- [x] **Monthly quota system** | set request limits per key, auto-reset monthly
- [x] **Request validation endpoint** | fast lookup to check if key is valid + has quota remaining
- [x] **Auto-reject at limit** | return 429 when quota exhausted
- [x] **Usage tracking** | increment counter on each validated request
- [x] **Tiered plans support** | free/pro/enterprise quota presets (seeded on startup)
- [x] **SDK middleware** | Express middleware for easy integration

### Deployment (2026-01-13)
- [x] **Local development** | Redis via Homebrew, tsx watch for hot reload
- [x] **Railway deployment** | Dockerfile build, managed Redis
- [x] **Public URL** | https://server-production-ea3b.up.railway.app
