# Throttl - Backlog

> Lightweight API key management with built-in usage quotas and real-time tracking.

**Website:** https://throttl.xyz

---

## In Production

<!-- Features/items that are live and working -->

**Domain:** https://throttl.xyz
**API Server:** https://server-production-ea3b.up.railway.app (→ api.throttl.xyz)
**Dashboard:** https://dashboard-production-0c49.up.railway.app (→ app.throttl.xyz)

- [x] **Core API** | Plans, Keys, Validation endpoints
- [x] **Redis storage** | Railway-managed Redis instance
- [x] **Tiered plans** | free (1k), pro (50k), enterprise (500k)
- [x] **Dashboard** | Auth, key management, usage overview

---

## In Progress

<!-- Currently being worked on -->

- [ ] **SSL certificates for custom domains** | Railway provisioning Let's Encrypt certs (not blocking launch)

---

## Ready to Launch

All pre-launch items complete. Using Railway URLs until custom domains have SSL:
- **API:** https://server-production-ea3b.up.railway.app
- **Dashboard:** https://dashboard-production-0c49.up.railway.app

Custom domains (api.throttl.xyz, app.throttl.xyz) will work once Railway provisions SSL certs.

---

## Distribution & Marketing Plan

<!--
Target: Solo developers, early-stage startups
Timeline: ASAP
Budget: $0 (organic only)
Audience: Starting from zero
Pricing: Freemium
-->

### Pre-Launch Checklist
- [~] **Configure custom domains** | DNS working, SSL certificates pending on Railway
- [x] **Landing page polish** | Added pricing section (Free/Pro/Enterprise), nav links, bottom CTA, improved footer
- [x] **Documentation** | Created /docs page with quickstart, API reference, SDK usage, webhooks
- [x] **Open source the SDK** | Published as `throttl-express` on npm
- [~] **Demo video** | Skipped for launch; added to post-launch backlog

### Launch Channels

#### Twitter/X (Build in Public)
- [ ] **Create launch thread** | Problem → Solution → Demo GIF → Link
- [ ] **Daily build updates** | Share progress, metrics, learnings
- [ ] **Engage in API/dev communities** | Reply to devs asking about rate limiting
- [ ] **Follow/engage with** | Indie hackers, API-focused devs, SaaS builders

##### Launch Thread Draft

**Tweet 1 (Hook):**
> I just mass-launched Throttl - the simplest way to add API rate limiting to your app.
>
> No complex setup. No config files. Just one API call.
>
> Here's how it works (and why I built it):

**Tweet 2 (Problem):**
> The problem: You're building an API and need rate limiting.
>
> Your options?
> - Roll your own (Redis, counters, middleware...)
> - Pay $50+/mo for enterprise tools
> - Skip it and hope for the best
>
> None of these are great for indie devs.

**Tweet 3 (Solution):**
> Throttl is different:
>
> 1. Create an API key (pick a plan: 1k, 50k, or 500k requests/mo)
> 2. Call our validate endpoint before each request
> 3. We handle the counting, limits, and 429s
>
> That's it. 3 lines of code.

**Tweet 4 (Code example):**
> ```
> curl -X POST https://server-production-ea3b.up.railway.app/api/validate \
>   -H "Content-Type: application/json" \
>   -d '{"key": "tk_your_key"}'
>
> → {"valid": true, "remaining": 9847}
> ```
>
> Or use our Express middleware: `npm install throttl-express`

**Tweet 5 (Features):**
> What you get:
>
> - Real-time usage dashboard
> - Webhook alerts at 90% quota
> - Multi-tenant support (scope keys per user)
> - Usage export (CSV/JSON)
>
> All free up to 1,000 requests/month.

**Tweet 6 (CTA):**
> Try it now: https://throttl.xyz
>
> - Docs: https://throttl.xyz/docs
> - npm: https://npmjs.com/package/throttl-express
>
> Built in public. Feedback welcome.
>
> What features would you want to see next?

#### Product Hunt
- [ ] **Prep assets** | Logo, tagline, screenshots, maker comment
- [ ] **Schedule launch** | Tuesday-Thursday for best visibility
- [ ] **Line up supporters** | Friends/network to upvote and comment early
- [ ] **Write compelling description** | Focus on pain point (API abuse) → solution

##### Product Hunt Launch Draft

**Tagline (60 chars max):**
> API rate limiting in 3 lines of code

**Description:**
> Throttl is the simplest way to add rate limiting to your API.
>
> If you're building an API, you need to protect it from abuse. But setting up rate limiting is painful - Redis configs, middleware logic, tracking quotas, handling edge cases. Or you pay $50+/month for enterprise tools.
>
> Throttl fixes this. Create an API key, pick a quota (1k, 50k, or 500k requests/month), and validate requests with a single API call. We handle the counting.
>
> **How it works:**
> 1. Sign up and create an API key
> 2. Call our /validate endpoint before processing requests
> 3. We return {valid: true/false, remaining: N}
>
> **Features:**
> - Real-time usage dashboard
> - Webhook alerts when quotas hit 90%
> - Multi-tenant support (scope keys per user)
> - Express middleware: `npm install throttl-express`
> - Usage export (CSV/JSON)
>
> **Pricing:**
> - Free: 1,000 requests/month
> - Pro: 50,000 requests/month ($29)
> - Enterprise: 500,000 requests/month ($99)
>
> Built for indie developers and startups who need rate limiting without the complexity.

**Maker Comment:**
> Hey Product Hunt! I'm the maker of Throttl.
>
> I built this because every time I started a new API project, I'd spend hours setting up rate limiting. Redis, counters, middleware, edge cases... it's always more complex than it should be.
>
> Throttl is my answer: one API call to validate a request and decrement a quota. That's it.
>
> The free tier (1k requests/month) is perfect for side projects. I'd love your feedback on what features to add next.
>
> Happy to answer any questions!

**Screenshots needed:**
1. Landing page hero section
2. Dashboard with usage chart
3. API key creation flow
4. Code example (curl or middleware)

#### Hacker News
- [ ] **Show HN post** | Technical angle: "Show HN: I built a lightweight API rate limiter"
- [ ] **Timing** | Weekday morning US time for visibility
- [ ] **Be ready to engage** | Answer questions quickly and authentically

### Ongoing Growth (Post-Launch)
- [ ] **Demo video (AI-assisted)** | Screen record UI + ElevenLabs voiceover; 60-sec showing key creation → validation
- [ ] **Collect user feedback** | Simple feedback form or email follow-up
- [ ] **Case studies** | Document early users' success stories
- [ ] **SEO content** | "How to add rate limiting to your API" blog post
- [ ] **Integrations/partnerships** | Reach out to API frameworks, hosting platforms
- [ ] **Freemium → Paid conversion** | Track free users hitting limits, offer upgrade path

### Metrics to Track
- [ ] Signups per day/week
- [ ] Keys created (activation)
- [ ] API validation calls (usage)
- [ ] Free → Paid conversion rate

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
- [ ] **Email notifications** | Priority: low | Added: 2026-01-13 | Notes: optional email alerts when thresholds hit; consider Resend or SendGrid integration
- [ ] **Anomaly detection** | Priority: low | Added: 2026-01-13 | Notes: flag unusual spikes in usage; could use simple moving average or statistical detection

### Advanced Features
- [ ] **Per-endpoint rate limits** | Priority: low | Added: 2026-01-13 | Notes: different limits for different routes; would require endpoint tagging in validation requests
- [x] **Usage export** | Priority: low | Added: 2026-01-13 | Notes: CSV/JSON export at /api/keys/export/usage
- [x] **Multi-tenant support** | Priority: med | Added: 2026-01-13 | Notes: per-user key scoping via ownerId

---

## Questions to Discuss

<!-- Open questions that need decisions -->

- Email provider choice: Resend vs SendGrid vs AWS SES for email notifications?
- Anomaly detection algorithm: Simple threshold-based or ML-based?
- Per-endpoint limits: Should limits be set per-key or per-plan?

---

## Bugs / Issues

<!--
Entry format:
- [ ] **Bug description** | Severity: critical/high/med/low | Added: YYYY-MM-DD | Notes: steps to reproduce
-->

---

## Low Priority / Nice to Have

<!-- Ideas that aren't urgent but would be good eventually -->

- [ ] **Custom plan creation** | Allow users to create custom quota tiers
- [ ] **API key rotation scheduling** | Auto-rotate keys on a schedule
- [ ] **Team/organization support** | Shared keys across team members
- [ ] **Billing integration** | Stripe integration for paid tiers
- [ ] **Rate limit headers** | Return X-RateLimit-* headers in validation response
- [ ] **Usage analytics** | Daily/weekly/monthly usage breakdown charts
- [ ] **Slack integration** | Send alerts to Slack channels
- [ ] **IP allowlisting** | Restrict key usage to specific IPs
- [ ] **SDK for more languages** | Python, Go, Ruby SDKs

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

### Alerts & Webhooks (2026-01-14)
- [x] **90% quota alert** | Alert field in validation response
- [x] **Webhook notifications** | POST to configured URLs on threshold events
- [x] **Webhook management UI** | Dashboard page to add/remove webhooks
