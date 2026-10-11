# OWASP Top 10 2021 — Security Audit Report

## IT Academy Platform

| Field | Value |
|-------|-------|
| **Project** | IT Academy Platform |
| **Version** | 1.0 |
| **Date** | June 24, 2026 |
| **Auditor** | Security Review |
| **Methodology** | OWASP Top 10 2021 |
| **Tech Stack** | Next.js 15, Express 4, MongoDB, better-auth, Stripe |

---

## Executive Summary

This report presents a security assessment of the IT Academy Platform against the **OWASP Top 10 2021** categories. The platform demonstrates a solid security foundation with authentication, authorization, and basic hardening measures in place. Key gaps remain in CSRF protection, input sanitization, logging, and dependency management.

### Overall Risk Rating

| Rating | Count |
|--------|-------|
| 🔴 Critical | 1 |
| 🟠 High | 5 |
| 🟡 Medium | 3 |
| 🟢 Low | 2 |

### Score by OWASP Category

| Category | Score | Status |
|----------|-------|--------|
| A01: Broken Access Control | 6/10 | Partial |
| A02: Cryptographic Failures | 7/10 | Partial |
| A03: Injection | 7/10 | Partial |
| A04: Insecure Design | 6/10 | Partial |
| A05: Security Misconfiguration | 7/10 | Partial |
| A06: Vulnerable Components | 4/10 | Needs Work |
| A07: Auth Failures | 6/10 | Partial |
| A08: Integrity Failures | 4/10 | Needs Work |
| A09: Logging/Monitoring | 2/10 | Missing |
| A10: SSRF | 8/10 | Low Risk |

---

## A01: Broken Access Control

**Risk Level:** 🟠 High

Broken access control is the most common vulnerability in web applications. It allows users to act outside their intended permissions.

### Current Implementation

**File:** `server/src/middlewares/auth.ts`
- Sessions validated via better-auth before protected routes
- User ID and role extracted from session and attached to request

**File:** `server/src/middlewares/roleauth.ts`
- Role middleware restricts endpoints to specific roles (user, admin, instructor)
- Returns 403 for unauthorized roles

**File:** `server/src/routes/courseRoute.ts`
- Owner verification on course update (line 269-274)
- Owner verification on course delete (line 309-314)
- Field allow-list prevents mass assignment (line 276-281)

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A01-1 | Unauthenticated delete endpoint (FIXED) | 🔴 Critical | `adminRoute.ts:19` |
| A01-2 | No CSRF protection on state-changing endpoints | 🟠 High | All POST/PUT/DELETE |
| A01-3 | No rate limiting per-user on sensitive ops | 🟡 Medium | Auth routes |

### Recommendations

1. **Implement CSRF protection** using double-submit cookie pattern or `csrf-csrf` package
2. **Add per-user rate limiting** on authentication endpoints (5 req/min)
3. **Verify all mutation routes** have `auth` and appropriate `role()` middleware

---

## A02: Cryptographic Failures

**Risk Level:** 🟡 Medium

Weaknesses in cryptographic practices can lead to exposure of sensitive data.

### Current Implementation

**File:** `server/src/lib/auth.ts`
- JWT configured with ES256 asymmetric algorithm (line 21)
- Token expiration set to 1 hour (line 17)
- Secrets loaded from environment variables

**File:** `server/src/index.ts`
- CORS restricted to frontend origin (line 42-48)

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A02-1 | No HTTPS enforcement in production | 🟡 Medium | `index.ts` |
| A02-2 | Secrets in `.env` files on disk | 🟡 Medium | `server/.env` |
| A02-3 | No JWT refresh token rotation | 🟢 Low | `auth.ts` |

### Recommendations

1. **Enforce HTTPS** in production via middleware redirect
2. **Use secrets vault** (Docker secrets, AWS Secrets Manager) instead of `.env` files
3. **Implement refresh token rotation** with shorter access token window
4. **Rotate potentially exposed keys** (JWT_SECRET_KEY, BETTER_AUTH_SECRET, Stripe keys)

---

## A03: Injection

**Risk Level:** 🟠 High

Injection flaws allow attackers to send hostile data to an interpreter.

### Current Implementation

**File:** `server/src/routes/courseRoute.ts`
- ObjectId validation before MongoDB queries (lines 83, 153, 258, 298)
- Mongoose ODM parameterizes queries automatically
- Field allow-list on course update (lines 276-281)

**File:** `server/src/models/`
- Mongoose schema validation with type constraints

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A03-1 | No server-side input sanitization (XSS) | 🟠 High | All text fields |
| A03-2 | NoSQL injection possible via query params | 🟡 Medium | Routes accepting body |
| A03-3 | Mongoose schemas lack maxlength constraints | 🟡 Medium | `models/*.ts` |

### Recommendations

1. **Add input sanitization middleware** using `sanitize-html` for text fields
2. **Validate all `req.body` and `req.params`** against expected schemas
3. **Add `maxlength` and `match` validators** to Mongoose schemas
4. **Implement Content Security Policy** headers via Helmet

---

## A04: Insecure Design

**Risk Level:** 🟡 Medium

Design flaws cannot be fixed by a perfect implementation. They require architectural changes.

### Current Implementation

**File:** `server/src/index.ts`
- Clean MVC architecture with separated concerns
- Route handlers, models, and middleware are modular

**File:** `server/src/middlewares/`
- Authentication and authorization separated into distinct middleware

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A04-1 | No formal threat model documented | 🟡 Medium | Project-wide |
| A04-2 | Role typo `instrator` instead of `instructor` | 🟢 Low | 6 files |
| A04-3 | Test credentials in README | 🟢 Low | `README.md:83` |

### Recommendations

1. **Document threat model** for critical user flows (payment, admin actions)
2. **Fix role typo** `instrator` → `instructor` across all files
3. **Remove test credentials** from README or use separate test environment
4. **Add abuse case testing** for common attack scenarios

---

## A05: Security Misconfiguration

**Risk Level:** 🟠 High

Missing security hardening across the application stack.

### Current Implementation

**File:** `server/src/index.ts`
- Helmet.js enabled globally (line 33)
- Rate limiting: 100 requests per 15 minutes (lines 35-40)
- CORS restricted to specific origin (lines 42-48)

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A05-1 | No CSP (Content Security Policy) configured | 🟠 High | `index.ts` |
| A05-2 | Default Express error handler may leak traces | 🟡 Medium | `index.ts` |
| A05-3 | No X-Frame-Options customization | 🟢 Low | `index.ts` |

### Recommendations

1. **Configure CSP headers** in Helmet to prevent XSS and injection
2. **Customize error handler** to return generic messages in production
3. **Add X-Frame-Options: DENY** to prevent clickjacking
4. **Verify Helmet defaults** are sufficient for your use case

---

## A06: Vulnerable and Outdated Components

**Risk Level:** 🔴 Critical

Using components with known vulnerabilities is a critical risk.

### Current Status

**File:** `server/package.json`
- Dependencies use `^` (caret) version ranges
- `bcrypt` and `bcryptjs` both present (redundant)
- `next-auth` and `@auth/mongodb-adapter` unused (uses better-auth)

**File:** `server/dist/`
- Compiled JavaScript committed to git (should be built from source)

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A06-1 | No `npm audit` in CI pipeline | 🟠 High | CI config |
| A06-2 | Unused dependencies present | 🟡 Medium | `client/package.json` |
| A06-3 | `server/dist/` committed to git | 🟡 Medium | `.gitignore` |
| A06-4 | Dependencies use `^` ranges | 🟢 Low | `package.json` |

### Recommendations

1. **Add `npm audit` to CI pipeline** — fail on high/critical vulnerabilities
2. **Remove unused dependencies:** `bcrypt`, `bcryptjs`, `next-auth`, `@auth/mongodb-adapter`
3. **Add `server/dist/` to `.gitignore`** and remove from git history
4. **Pin critical dependency versions** for express, mongoose, better-auth

---

## A07: Identification and Authentication Failures

**Risk Level:** 🟠 High

Weaknesses in authentication mechanisms can lead to account compromise.

### Current Implementation

**File:** `server/src/lib/auth.ts`
- better-auth library handles authentication flows
- Email/password authentication enabled
- JWT tokens with 1-hour expiration

**File:** `server/src/middlewares/auth.ts`
- Session validation on protected routes

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A07-1 | No password complexity requirements | 🟠 High | `auth.ts` |
| A07-2 | No account lockout after failed attempts | 🟠 High | Auth system |
| A07-3 | No multi-factor authentication | 🟡 Medium | Auth system |
| A07-4 | Test credentials documented in README | 🟢 Low | `README.md:83` |

### Recommendations

1. **Configure password policy** in better-auth: `minPasswordLength: 8`, complexity rules
2. **Add account lockout** after 5 failed login attempts
3. **Consider MFA** for admin accounts
4. **Remove test credentials** from documentation

---

## A08: Software and Data Integrity Failures

**Risk Level:** 🟡 Medium

Failures related to code and infrastructure that do not protect against integrity violations.

### Current Status

**File:** `server/package-lock.json`
- Lock file present for dependency resolution

**File:** `docker-compose.yml`
- Docker configuration present

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A08-1 | Docker images use `:latest` tag | 🟡 Medium | `docker-compose.yml` |
| A08-2 | No `npm ci` in Dockerfile | 🟡 Medium | Dockerfile |
| A08-3 | No integrity checks for lock file | 🟢 Low | CI config |

### Recommendations

1. **Use `npm ci`** instead of `npm install` in Docker builds
2. **Pin Docker image digests** instead of `:latest` tags
3. **Add `package-lock.json` integrity checks** in CI
4. **Implement optimistic concurrency** with version fields on models

---

## A09: Security Logging and Monitoring Failures

**Risk Level:** 🔴 Critical

Without proper logging, breaches go undetected and forensics is impossible.

### Current Status

**File:** `server/src/index.ts`
- No HTTP request logging configured
- No security event logging

**File:** `server/src/routes/`
- Uses `console.error` for error logging (not structured)

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A09-1 | No HTTP request/access logging | 🔴 Critical | `index.ts` |
| A09-2 | No structured error logging | 🟠 High | All routes |
| A09-3 | No security event logging | 🟠 High | Auth middleware |
| A09-4 | No audit trail for admin actions | 🟠 High | Admin routes |

### Recommendations

1. **Add `morgan`** for HTTP request logging (Apache-style access logs)
2. **Replace `console.error`** with structured logger (pino or winston)
3. **Create security event logger** for auth failures, 403s, suspicious patterns
4. **Create AuditLog model** to record admin actions (who, what, when, target)

---

## A10: Server-Side Request Forgery (SSRF)

**Risk Level:** 🟢 Low

SSRF flaws occur when a web app fetches a remote resource without validating the user-supplied URL.

### Current Status

- Platform does not fetch user-supplied URLs server-side
- External API calls limited to Stripe (trusted)
- No user-controlled URL parameters in server requests

### Findings

| # | Finding | Severity | Location |
|---|---------|----------|----------|
| A10-1 | Low SSRF exposure | 🟢 Low | Project-wide |

### Recommendations

1. **Validate any future user-supplied URLs** against an allowlist
2. **Use network segmentation** for internal services
3. **Disable unnecessary URL schemes** (file://, gopher://)

---

## Prioritized Remediation Plan

### Phase 1: Critical (Immediate)

| # | OWASP | Task | Impact |
|---|-------|------|--------|
| 1.1 | A01 | Add auth middleware to unauthenticated delete endpoint | Prevent privilege escalation |
| 1.2 | A09 | Add HTTP request logging (morgan) | Enable breach detection |
| 1.3 | A06 | Run `npm audit` and fix critical vulnerabilities | Reduce attack surface |

### Phase 2: High Priority (1-2 Weeks)

| # | OWASP | Task | Impact |
|---|-------|------|--------|
| 2.1 | A01 | Implement CSRF protection | Prevent cross-site request forgery |
| 2.2 | A03 | Add input sanitization middleware | Prevent XSS attacks |
| 2.3 | A05 | Configure CSP headers | Defense in depth |
| 2.4 | A07 | Configure password policy | Stronger authentication |
| 2.5 | A09 | Create AuditLog model for admin actions | Forensic capability |

### Phase 3: Medium Priority (2-4 Weeks)

| # | OWASP | Task | Impact |
|---|-------|------|--------|
| 3.1 | A02 | Enforce HTTPS in production | Transport security |
| 3.2 | A06 | Remove unused dependencies | Reduce attack surface |
| 3.3 | A08 | Pin Docker image digests | Supply chain security |
| 3.4 | A09 | Add structured error logging (pino/winston) | Operational visibility |

### Phase 4: Hardening (1-2 Months)

| # | OWASP | Task | Impact |
|---|-------|------|--------|
| 4.1 | A02 | Implement JWT refresh token rotation | Token security |
| 4.2 | A04 | Document threat model | Security by design |
| 4.3 | A07 | Add account lockout after failed attempts | Brute-force prevention |
| 4.4 | A04 | Fix role typo `instrator` → `instructor` | Code quality |

---

## Dependencies to Install

```bash
npm install helmet express-rate-limit morgan sanitize-html csrf-csrf
```

## Files to Modify

| File | Changes |
|------|---------|
| `server/src/index.ts` | Add morgan, CSP config, HTTPS redirect, CSRF |
| `server/src/middlewares/` | Add sanitize middleware |
| `server/src/models/auditLog.ts` | New: AuditLog model |
| `server/src/lib/auth.ts` | Password policy, refresh tokens |
| `server/src/routes/*.ts` | Input validation, owner checks |
| `server/package.json` | Remove unused deps, pin versions |
| `.gitignore` | Add `server/dist/` |
| `README.md` | Remove test credentials |

---

## Conclusion

The IT Academy Platform has a reasonable security foundation with authentication, authorization, and basic hardening. The most critical gaps are:

1. **No CSRF protection** — leaves state-changing endpoints vulnerable
2. **No input sanitization** — XSS attack vector on text fields
3. **No logging/monitoring** — breaches would go undetected
4. **No dependency auditing** — vulnerable components may be in use

Implementing the Phase 1 and Phase 2 recommendations will significantly improve the platform's security posture and bring it closer to OWASP Top 10 compliance.

---

**Report Version:** 1.0
**Last Updated:** June 24, 2026
**Next Review:** September 2026
