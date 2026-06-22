# IT Academy Platform

An e-learning platform for IT courses, built with Next.js 15, Express, MongoDB, and better-auth.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (via Mongoose + native driver)
- **Auth**: better-auth (email/password + JWT)
- **Payments**: Stripe

## Prerequisites

- Node.js v18+
- Docker (for MongoDB)
- Stripe account (for payment features)

## Getting Started

### 1. Start MongoDB

MongoDB runs in Docker. Start it from the project root:

```bash
docker compose up -d mongodb
```

### 2. Configure environment

Create `server/.env`:

```env
PORT=8000
DATAURL=mongodb://localhost:27017/elearn
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-here
JWT_SECRET_KEY=your-jwt-secret
FRONT_END_PORT=http://localhost:3000
BACK_END_PORT=http://localhost:8000
STRIPE_PRIVATE_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_EXPRESS_URL=http://localhost:8000
```

### 3. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Start the backend (port 8000)

```bash
cd server
npm start
```

### 5. Start the frontend (port 3000)

```bash
cd client
npm run dev
```

### 6. Open the app

Visit **http://localhost:3000**

## Seed Data

The DB already has an admin account:

| Email | Password | Role |
|---|---|---|
| test@gmail.com | 123456789 | admin |

## Running everything with Docker

```bash
docker compose up --build
```

- Express API runs on port **5000** (mapped to container port 8000)
- Next.js runs on port **3000**
- MongoDB runs on port **27017**

## API Endpoints

### Auth (via better-auth)
- `POST /api/auth/sign-up/email` — Register
- `POST /api/auth/sign-in/email` — Login
- `GET /api/auth/get-session` — Get current session
- `POST /api/auth/sign-out` — Logout

### Courses
- `GET /course/CourseCard` — All courses
- `GET /course/CourseCardHomepage` — Homepage courses (max 6)
- `GET /course/:id` — Single course
- `POST /course/AddCourse` — Create course (admin/instrator)
- `PUT /course/UpdateCourse/:id` — Update course (owner/admin)
- `DELETE /course/DeleteCourse/:id` — Delete course (owner/admin)

### Chapters
- `GET /chapter/getChapter/:courseId` — Chapters for a course
- `POST /chapter/addChapter` — Create chapter (admin)

### Admin
- `GET /dashboard/AdminUser` — List admins
- `DELETE /dashboard/deleuser` — Delete user

### Instructor
- `GET /instructor/my-courses` — My courses (instrator)
- `GET /instructor/all` — All instructors + courses (admin)

## Project Structure

```
├── client/              # Next.js frontend
│   ├── app/
│   │   ├── components/  # Reusable components
│   │   ├── lib/         # API helpers, auth client
│   │   ├── types/       # TypeScript types
│   │   ├── Courses/     # Course pages
│   │   └── auth/        # Sign-in / Sign-up pages
│   ├── next.config.ts
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── config/      # DB connection
│   │   ├── lib/         # better-auth config
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # Route handlers
│   │   ├── middlewares/  # Auth & role middleware
│   │   └── index.ts     # Entry point
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Roles

| Role | Permissions |
|---|---|
| user | View courses, chapters |
| instrator | Create/edit own courses |
| admin | Full access — manage courses, chapters, users |
