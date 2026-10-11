# Security Improvement Plan — OWASP Top 10 Aligned

Full audit results and prioritized implementation plan for the IT Academy Platform (Next.js 15 + Express 4 + MongoDB).

---

## 🔴 Phase 1 — Immediate (Critical) — Covers A01 Broken Access Control

| # | Task | Files | Details |
|---|------|-------|---------|
| 1.1 | Fix unauthenticated delete endpoint | `server/src/routes/adminRoute.ts:19` | Add `auth, role("admin")` middleware to `DELETE /deleuser` |
| 1.2 | Verify all mutation routes have auth | `courseRoute.ts`, `Chapter.ts`, `userRoute.ts` | Most already do; verify consistency |
| 1.3 | Ownership verification on resources | `courseRoute.ts:309`, `Chapter.ts:48-53` | Already implemented — good pattern. Keep it. |

---

## 🟠 Phase 2 — High Priority — Covers A02, A05, A07

| # | Task | Files | Details |
|---|------|-------|---------|
| 2.1 | Security headers (Helmet + CSP) | `server/src/index.ts` | `npm install helmet` → `app.use(helmet())` with CSP config |
| 2.2 | Rate limiting | `server/src/index.ts` | `npm install express-rate-limit` → rate limiters on `/api/auth/*` (login/signup: 5 req/min) and general API (100 req/min) |
| 2.3 | CORS hardening | `server/src/index.ts:33` | Validate origin against allow-list rather than raw string interpolation |
| 2.4 | HTTPS enforcement | `server/src/index.ts` | Middleware to redirect `http → https` when `NODE_ENV=production` |
| 2.5 | CSRF protection | `server/src/index.ts`, client forms | Use `csrf-csrf` (double-submit cookie pattern) or better-auth's built-in CSRF |

---

## 🟡 Phase 3 — Medium Priority — Covers A03, A04

| # | Task | Files | Details |
|---|------|-------|---------|
| 3.1 | Field allow-list on course Create | `server/src/routes/courseRoute.ts:206-246` | Apply same `allowedFields` pattern used in Update to `POST /AddCourse` |
| 3.2 | Server-side input sanitization | `server/src/middlewares/sanitize.ts` | Create sanitize middleware using `sanitize-html` for text fields (DescriptionCourse, text, InstructorInformation) |
| 3.3 | Mongoose schema hardening | `server/src/models/` | Add `match` regex validators, `maxlength`, `enum` constraints where missing |
| 3.4 | NoSQL injection prevention | `server/src/routes/` | Validate all `req.body.id` and `req.params.id` as ObjectId before querying; sanitize query params |

---

## 🔵 Phase 4 — OWASP Expansion — Covers A06, A08, A09

| # | OWASP | Task | Files | Details |
|---|-------|------|-------|---------|
| 4.1 | A06 | Dependency scanning | CI config | Add `npm audit` to CI pipeline. Run `npx better-npm-audit` or `snyk test` regularly |
| 4.2 | A06 | Lock dependency versions | `server/package.json`, `client/package.json` | Pin exact versions for critical deps (express, mongoose, better-auth) instead of `^` ranges |
| 4.3 | A06 | Remove unused deps | `client/package.json` | `bcrypt` + `bcryptjs` both present (redundant). `next-auth` + `@auth/mongodb-adapter` unused (uses better-auth). Remove them. |
| 4.4 | A06 | Remove stale `dist/` from git | `.gitignore`, git history | Add `server/dist/` to `.gitignore`, delete from git, rebuild from source only |
| 4.5 | A08 | Integrity verification | CI/CD, Docker | Add `package-lock.json` integrity checks. Pin Docker image digests in `docker-compose.yml` instead of `:latest` |
| 4.6 | A08 | Update integrity / concurrency | `server/src/routes/` | Add `if-modified-since` / `if-unmodified-since` or version field for optimistic concurrency |
| 4.7 | A09 | HTTP request logging | `server/src/index.ts` | `npm install morgan` → `app.use(morgan('combined'))` for Apache-style access logs |
| 4.8 | A09 | Structured error logging | `server/src/index.ts`, all routes | Replace `console.error()` with structured logger (e.g., `pino` or `winston`). Include request ID, user ID, timestamp, stack trace |
| 4.9 | A09 | Security event logging | `server/src/middlewares/` | Log auth failures, 403s, 404s, and suspicious patterns to a dedicated collection or file |
| 4.10 | A09 | Audit trail for admin actions | `server/src/models/auditLog.ts` (new) | Create `AuditLog` model to record admin actions (user deletion, role changes, course deletion) with `who`, `what`, `when`, `target` |

---

## 🟢 Phase 5 — Hardening & Operational — Covers A02, A05

| # | Task | Files | Details |
|---|------|-------|---------|
| 5.1 | Secrets management | `server/.env` | Move secrets to environment variables via Docker Compose or a vault. Don't rely on `.env` files on disk |
| 5.2 | Rotate potentially exposed keys | All credentials | Rotate `JWT_SECRET_KEY`, `BETTER_AUTH_SECRET`, Stripe keys if they may have been exposed |
| 5.3 | JWT hardening | `server/src/lib/auth.ts:14-23` | Add refresh token rotation. Consider shorter access token window + longer refresh token |
| 5.4 | Password policy | `server/src/lib/auth.ts` | Configure better-auth password requirements: `minPasswordLength: 8`, complexity rules |
| 5.5 | Role typo cleanup: `instrator` → `instructor` | `auth.ts`, `roleauth.ts`, `courseRoute.ts`, `Chapter.ts`, `instructorRoute.ts`, `userModel.ts` | Rename consistently across all files |
| 5.6 | Remove hardcoded test creds from README | `README.md:83` | Remove or redact the test admin account credentials (`test@gmail.com` / `123456789`) |

---

## Recommended Implementation Order

```
Phase 1 (1.1)
  ↓
Phase 2 (2.1, 2.2, 2.3, 2.5)
  ↓
Phase 3 (3.1, 3.2, 3.3)
  ↓
Phase 4 (4.1, 4.4, 4.7, 4.8, 4.10)
  ↓
Phase 5 (5.1, 5.3, 5.5, 5.6)
```

**New dependencies to install:** `helmet`, `express-rate-limit`, `csrf-csrf`, `morgan`, `sanitize-html` (plus dev deps for audit tools)

**Files to modify:** ~15 files across `server/`, `client/`, and config

---

## Key Security Issues Found During Audit

| Issue | Severity | Location |
|-------|----------|----------|
| Unauthenticated `DELETE /deleuser` endpoint | 🔴 Critical | `server/src/routes/adminRoute.ts:19` |
| No HTTP security headers (CSP, X-Frame-Options, etc.) | 🟠 High | `server/src/index.ts` |
| No rate limiting on auth or API endpoints | 🟠 High | Server-wide |
| No CSRF protection on state-changing endpoints | 🟠 High | Server-wide |
| No server-side input sanitization (XSS vector) | 🟠 High | All routes accepting text input |
| No request/error logging or audit trail | 🟠 High | Server-wide |
| Real Stripe test keys + JWT secret on disk | 🟡 Medium | `server/.env` |
| Role typo `instrator` instead of `instructor` | 🟢 Low | 6 files |
| Stale `server/dist/` committed to git | 🟢 Low | `.gitignore` |
| Test credentials documented in `README.md` | 🟢 Low | `README.md:83` |
| Co-existing `bcrypt` + `bcryptjs`, unused `next-auth` | 🟢 Low | `client/package.json` |
