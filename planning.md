# Throttl - Planning

> API usage tracking made simple for Pocket Co.

---

## Project Setup Checklist

> Complete these items before starting any development work. Based on best practices from [Anthropic](https://www.anthropic.com/engineering/claude-code-best-practices), [Addy Osmani](https://addyosmani.com/blog/ai-coding-workflow/), [Claude Code Tips](https://github.com/ykdojo/claude-code-tips), and community research.

### Phase 0: Pre-Planning

- [ ] **Begin in plan mode** - Create comprehensive to-do list and plan
- [ ] **Create spec.md** - Write project specification
- [x] **Tech stack established** - Next.js + SQLite + NextAuth

### Phase 1: Project Structure Setup

- [x] **Directory structure** - Next.js app structure:
  ```
  throttl/
  ├── app/                     # Next.js App Router
  ├── components/              # React components
  ├── lib/                     # Utilities and helpers
  ├── data.db                  # SQLite database
  ├── package.json             # Dependencies
  ├── tailwind.config.js       # Tailwind configuration
  └── tsconfig.json            # TypeScript config
  ```

- [ ] **Create CLAUDE.md** - Project conventions and gotchas
- [ ] **Create backlog.md** - Feature tracking document

### Phase 2: Workflow Setup

- [ ] **Set up handoff system** - Session continuity
- [ ] **Context compaction agent** - Auto-trigger at 75% context usage
- [ ] **Save finalized plan** - Document before starting work

### Phase 3: Development Standards

- [ ] **Testing strategy** - Define test approach
- [x] **Git workflow** - Repository initialized
- [ ] **Dual review pattern** - Set up second AI reviewer

### Phase 4: Post-Planning Setup

- [ ] **Create /init file** - Context optimization file for new sessions

---

## Default Tech Stack

| Category | Current Choice | Notes |
|----------|----------------|-------|
| **Framework** | Next.js 14.2.35 | App Router |
| **Language** | TypeScript | Type safety |
| **Database** | SQLite (better-sqlite3) | Local-first, simple |
| **Auth** | NextAuth 4.24.13 | Session management |
| **Styling** | Tailwind CSS 3.4.19 | Utility-first |
| **Charts** | Recharts 3.6.0 | Data visualization |
| **Password** | bcryptjs | Secure hashing |
| **Deployment** | Vercel | Serverless hosting |

---

## Vision

A simple, self-hosted solution for tracking API usage across projects. Monitor costs, set alerts, and visualize usage patterns without complex enterprise solutions.

---

## Architecture

```
throttl/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Dashboard
│   ├── api/                   # API routes
│   │   ├── auth/              # NextAuth endpoints
│   │   └── usage/             # Usage tracking endpoints
│   └── (routes)/              # App pages
│
├── components/                # React components
│   ├── Dashboard.tsx          # Main dashboard view
│   ├── UsageChart.tsx         # Recharts visualization
│   └── ...
│
├── lib/                       # Utilities
│   ├── db.ts                  # SQLite connection
│   ├── auth.ts                # Auth utilities
│   └── ...
│
└── data.db                    # SQLite database
```

---

## Core Capabilities

### Planned Features
- API usage logging and tracking
- Cost calculation and monitoring
- Usage visualization (charts/graphs)
- Alert thresholds
- Multi-project support
- User authentication
- Dashboard views

### Technical Requirements
- Local-first SQLite storage
- Simple deployment (Vercel)
- Clean, minimal UI
- Real-time updates

---

## Open Questions

- What APIs/services should be tracked first?
- How should usage data be ingested (SDK, webhook, manual)?
- What alert mechanisms (email, Slack, in-app)?
- Multi-tenant vs single-user design?
- Pricing model if productized?

---

## Research & References

### Key Technical Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Milestones

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Project scaffolding | Complete |
| 1 | Auth and database setup | In Progress |
| 2 | Usage logging API | Not Started |
| 3 | Dashboard and charts | Not Started |
| 4 | Alerts and notifications | Not Started |
| 5 | Multi-project support | Not Started |

---

## Notes

*Last Updated: January 2026*

