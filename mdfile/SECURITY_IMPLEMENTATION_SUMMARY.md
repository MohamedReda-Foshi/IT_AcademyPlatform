# Security implementation summary

Updated October 11, 2026 for the IT Academy Platform.

## Implemented

- Protected course, chapter, quiz, and admin mutations require an authenticated role; course and chapter writes also verify ownership where applicable.
- Browser mutations outside Better Auth require an `Origin` header matching `CORS_ORIGIN`. Better Auth has its own origin and CSRF checks. The former in-memory CSRF token code never validated a request and was replaced.
- Course, chapter, and quiz text fields are sanitized on their write routes. Authentication payloads are left intact. React also escapes rendered text.
- Express uses Helmet headers, a global request rate limit, CORS allowlisting, and HTTP access logs.
- Instructor role spelling is consistent in the API and UI. Quiz read endpoints do not return correct answers before submission.
- The API can run as an exported Express app on Vercel, connecting to MongoDB before handling requests. The frontend uses same-origin API rewrites for browser session cookies.
- The frontend build dependency mismatch was corrected by using Tailwind 3 with the existing PostCSS setup.

## Verification

- `server`: `npm run build` passes.
- `client`: `npm run build` and `npx tsc --noEmit` pass locally.
- Focused origin protection tests pass.
- The API production dependency audit reports zero advisories after compatible updates.
- Existing payment tests need a running MongoDB instance and reachable Stripe API; they did not pass in the isolated environment.

## Production requirements and limits

- A hosted MongoDB database, Vercel API and frontend projects, production environment variables, Stripe prices and webhook, and live smoke checks are required before calling the deployment production ready. See [README](../README.md#vercel-deployment).
- The Express rate limiter uses process memory and is not a distributed limit across Vercel instances. Configure a Vercel Firewall rule or a shared rate limit store for meaningful production abuse protection.
- No account lockout, admin audit trail, or centralized error monitoring is implemented.
- `npm audit --omit=dev` reports 9 advisories in the frontend dependency tree, mostly involving build tooling and the current Next.js/PostCSS tree. Review and upgrade them before a release that needs a clean advisory report.
- A change from the old `instrator` role value to `instructor` may need a database migration for existing instructor records. Inspect production data before migrating; do not rewrite user roles blindly.
