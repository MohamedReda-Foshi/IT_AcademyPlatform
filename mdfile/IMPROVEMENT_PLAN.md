# IT Academy Platform — Diploma Improvement Plan

## Overview

| Area | Scope | Est. Files |
|------|-------|-----------|
| OWASP Security | CSRF, XSS, logging, password policy, validation, CSP | ~16 files |
| Quiz System | Model, API, builder, student UI, scoring, timer | ~12 files |
| Instructor Features | Enrollment, analytics, typo fix, navigation | ~10 files |
| Docker Hardening | Pinned versions, non-root, health checks, auth | ~5 files |

---

## Phase 1: OWASP Security (Critical + High)

### 1.1 — Fix Role Typo
- `server/src/lib/auth.ts` — `"instrator"` → `"instructor"`
- `server/src/models/userModel.ts` — interface + enum
- `server/src/routes/instructorRoute.ts` — role checks + queries
- `server/src/routes/courseRoute.ts` — role checks
- `server/src/routes/Chapter.ts` — all role checks
- `client/app/Adminpage/student/page.tsx` — badge key
- `client/app/Adminpage/Instructors/page.tsx` — text label
- DB migration: `db.user.updateMany({ role: "instrator" }, { $set: { role: "instructor" } })`

### 1.2 — Input Validation (Zod)
- Install `zod` on server
- Create `server/src/middlewares/validate.ts`
- Create schemas: `courseSchema`, `chapterSchema`, `quizSchema`
- Apply to all POST/PUT routes

### 1.3 — Server-Side Sanitization (XSS)
- Install `sanitize-html` on server
- Create `server/src/middlewares/sanitize.ts`
- Apply globally: `app.use(sanitize)`

### 1.4 — CSRF Protection
- Install `csrf-csrf` or double-submit cookie pattern
- Generate token on session, validate on state-changing requests
- Skip for `/api/auth/*`

### 1.5 — Content Security Policy
- Update Helmet config with CSP directives
- Add `frameguard: { action: "deny" }`

### 1.6 — Structured Logging
- Install `winston` + enable `morgan`
- Create `server/src/config/logger.ts`
- Replace all `console.error` with structured logger
- Log security events

### 1.7 — Password Policy
- Add `minLength: 8`, require uppercase, lowercase, numbers

### 1.8 — Account Lockout
- Create `server/src/middlewares/rateLimit.ts`
- 5 failed attempts → lock 15 minutes

### 1.9 — Remove Test Credentials
- Delete `test@gmail.com / 123456789` from README.md

---

## Phase 2: Quiz System

### 2.1 — Quiz Model (`server/src/models/quiz.ts`)
- questions: MC + TF, options, correctAnswer, points
- timeLimit, passingScore, maxAttempts
- Linked to chapter + course

### 2.2 — Quiz Result Model (`server/src/models/quizResult.ts`)
- quizId, userId, answers, score, passed, timeTaken, attempt

### 2.3 — Quiz API (`server/src/routes/quizRoute.ts`)
- GET /quiz/course/:courseId — list quizzes
- GET /quiz/:id — get quiz
- POST /quiz — create (instructor/admin)
- PUT /quiz/:id — update (owner)
- DELETE /quiz/:id — delete (owner)
- POST /quiz/:id/submit — submit answers
- GET /quiz/:id/results — user results
- GET /quiz/results/:courseId — all results

### 2.4 — Instructor Quiz Builder (`client/app/Instructor/CreateQuiz/page.tsx`)
- Select course → chapter
- Add questions (type, text, options, correct answer, points)
- Set time limit, passing score, max attempts
- Preview before saving

### 2.5 — Student Quiz Taking (`client/app/Courses/[courseId]/Quiz/[quizId]/page.tsx`)
- Quiz info → Start → Timer → Questions → Submit → Results
- Retry if allowed

### 2.6 — Chapter Integration
- Add "quiz" content type to Chapter.tsx + ViewChapter.tsx

---

## Phase 3: Instructor Features

### 3.1 — Enrollment Model (`server/src/models/enrollment.ts`)
- userId, courseId, enrolledAt, progress, completedAt

### 3.2 — Enrollment API (`server/src/routes/enrollmentRoute.ts`)
- POST /enrollment/:courseId — enroll student
- GET /enrollment/my-students — instructor's students
- GET /enrollment/course/:courseId — course students

### 3.3 — Analytics API (`server/src/routes/analyticsRoute.ts`)
- GET /analytics/my-courses — instructor stats
- GET /analytics/course/:courseId — course details

### 3.4 — Instructor UI Pages
- `client/app/Instructor/Students/page.tsx` — student list
- `client/app/Instructor/Analytics/page.tsx` — analytics dashboard

### 3.5 — Navigation Updates
- Role-based links in Navigation.tsx

---

## Phase 4: Docker Hardening

### 4.1 — Pin MongoDB: `mongo:7.0`
### 4.2 — Non-root user in Dockerfiles
### 4.3 — Health checks for api, frontend, mongodb
### 4.4 — MongoDB authentication (MONGO_INITDB_ROOT_USERNAME/PASSWORD)
### 4.5 — Resource limits (cpus, memory)
### 4.6 — `npm ci` instead of `npm install`
### 4.7 — Read-only filesystem + tmpfs

---

## New Files (~11)

| File | Phase |
|------|-------|
| `server/src/middlewares/validate.ts` | 1 |
| `server/src/middlewares/sanitize.ts` | 1 |
| `server/src/config/logger.ts` | 1 |
| `server/src/middlewares/rateLimit.ts` | 1 |
| `server/src/models/quiz.ts` | 2 |
| `server/src/models/quizResult.ts` | 2 |
| `server/src/routes/quizRoute.ts` | 2 |
| `server/src/models/enrollment.ts` | 3 |
| `server/src/routes/enrollmentRoute.ts` | 3 |
| `server/src/routes/analyticsRoute.ts` | 3 |
| `client/app/Instructor/Analytics/page.tsx` | 3 |

## Modified Files (~26)

See phase details above for specific files.
