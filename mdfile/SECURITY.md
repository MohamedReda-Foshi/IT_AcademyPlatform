# Security Policy — IT Academy Platform

## Overview

The IT Academy Platform takes security seriously. This document outlines our security practices aligned with the **OWASP Top 10 2021** standards and provides instructions for reporting vulnerabilities.

**Tech Stack:** Next.js 15, Express 4, MongoDB, better-auth, Stripe

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x (current) | Yes |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainers or use GitHub's private vulnerability reporting
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested fix (if any)

**Response Time:** We aim to acknowledge reports within 48 hours and provide a resolution timeline within 7 days.

---

## OWASP Top 10 2021 — Compliance Summary

### A01: Broken Access Control — Partially Mitigated

| Control | Status |
|---------|--------|
| Authentication middleware on protected routes | Implemented |
| Role-based access control (user, admin, instructor) | Implemented |
| Owner verification on course updates/deletes | Implemented |
| CSRF protection | **Needs implementation** |

**Implemented:**
- `auth` middleware validates sessions via better-auth (`server/src/middlewares/auth.ts`)
- `role()` middleware restricts endpoints by role (`server/src/middlewares/roleauth.ts`)
- Course ownership verified before update/delete (`server/src/routes/courseRoute.ts:269-314`)

**Gaps:**
- No CSRF tokens on state-changing endpoints
- No rate limiting per-user on sensitive operations

---

### A02: Cryptographic Failures — Partially Mitigated

| Control | Status |
|---------|--------|
| JWT with ES256 algorithm | Implemented |
| JWT expiration (1 hour) | Implemented |
| HTTPS enforcement | **Needs implementation** |
| Secrets in environment variables | Partially |

**Implemented:**
- JWT configured with ES256 asymmetric encryption (`server/src/lib/auth.ts:14-23`)
- Tokens expire after 1 hour
- Secrets stored in `.env` files (not hardcoded)

**Gaps:**
- No HTTPS redirect in production
- `BETTER_AUTH_SECRET` and `JWT_SECRET_KEY` should use a vault in production
- No token refresh rotation

---

### A03: Injection — Partially Mitigated

| Control | Status |
|---------|--------|
| MongoDB parameterized queries (Mongoose) | Implemented |
| ObjectId validation on routes | Implemented |
| Input sanitization (XSS) | **Needs implementation** |
| NoSQL injection prevention | **Needs implementation** |

**Implemented:**
- Mongoose ODM prevents most injection attacks
- Routes validate `ObjectId.isValid()` before queries (`server/src/routes/courseRoute.ts:83,153`)
- Field allow-list on course update (`server/src/routes/courseRoute.ts:276-281`)

**Gaps:**
- No server-side input sanitization for text fields (XSS vector)
- Query parameter sanitization not enforced globally

---

### A04: Insecure Design — Under Review

| Control | Status |
|---------|--------|
| Role-based architecture | Implemented |
| Separation of concerns (routes/models/middleware) | Implemented |
| Threat modeling | **Needs documentation** |

**Implemented:**
- Clean MVC architecture with separate routes, models, and middleware
- Role hierarchy: user → instructor → admin
- Auth handled by dedicated better-auth library

**Gaps:**
- No formal threat model documented
- No abuse case testing

---

### A05: Security Misconfiguration — Partially Mitigated

| Control | Status |
|---------|--------|
| Helmet.js security headers | Implemented |
| Rate limiting (100 req/15min) | Implemented |
| CORS origin validation | Implemented |
| CSP headers | **Needs configuration** |

**Implemented:**
- `helmet()` enabled globally (`server/src/index.ts:33`)
- Rate limiting on all routes (`server/src/index.ts:35-40`)
- CORS restricted to frontend origin (`server/src/index.ts:42-48`)

**Gaps:**
- CSP (Content Security Policy) not configured
- No X-Frame-Options customization
- Default Express error handler may leak stack traces

---

### A06: Vulnerable and Outdated Components — Needs Audit

| Control | Status |
|---------|--------|
| npm audit in CI | **Needs implementation** |
| Dependency lock files | Present |
| Unused dependencies | Detected |

**Actions Required:**
- Run `npm audit` and resolve vulnerabilities
- Remove unused deps: `bcrypt`, `bcryptjs`, `next-auth`, `@auth/mongodb-adapter`
- Pin critical dependency versions
- Remove stale `server/dist/` from git

---

### A07: Identification and Authentication Failures — Partially Mitigated

| Control | Status |
|---------|--------|
| better-auth library | Implemented |
| Email/password authentication | Implemented |
| Password policy | **Needs configuration** |
| Account lockout | **Needs implementation** |

**Implemented:**
- better-auth handles authentication flows (`server/src/lib/auth.ts`)
- Session-based auth with JWT tokens
- Secure HTTP-only cookies

**Gaps:**
- No minimum password length/complexity configured
- No account lockout after failed attempts
- No multi-factor authentication
- Test credentials in README (`test@gmail.com / 123456789`)

---

### A08: Software and Data Integrity Failures — Needs Improvement

| Control | Status |
|---------|--------|
| package-lock.json | Present |
| Docker image pinning | **Needs implementation** |
| Integrity checks in CI | **Needs implementation** |

**Actions Required:**
- Add `npm ci` instead of `npm install` in Dockerfile
- Pin Docker image digests instead of `:latest`
- Add `if-modified-since` headers for optimistic concurrency

---

### A09: Security Logging and Monitoring Failures — Not Implemented

| Control | Status |
|---------|--------|
| Access logging | **Needs implementation** |
| Error logging | Partial (console.error) |
| Security event logging | **Needs implementation** |
| Audit trail | **Needs implementation** |

**Actions Required:**
- Add `morgan` for HTTP request logging
- Replace `console.error` with structured logger (pino/winston)
- Create `AuditLog` model for admin actions
- Log auth failures and suspicious patterns

---

### A10: Server-Side Request Forgery (SSRF) — Low Risk

| Control | Status |
|---------|--------|
| No user-controlled URLs | Low risk |
| External API calls (Stripe) | Trusted |

**Notes:**
- Platform does not fetch user-supplied URLs server-side
- Stripe webhook uses signature verification
- Low exposure to SSRF attacks

---

## Security Controls Summary

| Category | Control | Status |
|----------|---------|--------|
| Authentication | better-auth + JWT | ✅ |
| Authorization | Role-based middleware | ✅ |
| Headers | Helmet.js | ✅ |
| Rate Limiting | express-rate-limit | ✅ |
| CORS | Origin whitelist | ✅ |
| Input Validation | ObjectId validation | ✅ |
| CSRF | — | ❌ |
| XSS Prevention | — | ❌ |
| HTTPS Enforcement | — | ❌ |
| Logging | — | ❌ |
| Audit Trail | — | ❌ |
| Password Policy | — | ❌ |

---

## Security Hardening Checklist

- [ ] Configure CSP headers in Helmet
- [ ] Add CSRF protection (double-submit cookie)
- [ ] Implement input sanitization middleware
- [ ] Enforce HTTPS in production
- [ ] Add structured logging (pino/winston)
- [ ] Create AuditLog model for admin actions
- [ ] Configure password complexity requirements
- [ ] Remove test credentials from README
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Remove unused dependencies
- [ ] Add account lockout after failed login attempts

---

## Security-Related Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `helmet` | Security headers | ^8.2.0 |
| `express-rate-limit` | Rate limiting | ^8.5.2 |
| `better-auth` | Authentication | ^1.5.5 |
| `cors` | CORS configuration | ^2.8.5 |
| `bcrypt` | Password hashing | (via better-auth) |

---

**Last Updated:** June 2026
**Next Review:** Quarterly
