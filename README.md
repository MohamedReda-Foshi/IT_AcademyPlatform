# IT\_ElearnPlatform

A no-nonsense e-learning platform for IT courses, built with the MERN stack and Next.js. Supports server-side and client-side rendering, role-based access, and flexible pricing plans.

## Features

* **Authentication**: Google OAuth for beginners, GitHub OAuth for intermediate/advanced users (via NextAuth).
* **Course Access**: Free users see only course introductions; paid subscribers unlock full lessons.
* **Pricing Plans**:

  * **Entry**: Basic access to introduction course.
  * **Most Used**: Access to top 5 courses.
  * **Pro**:Access All courses, Full library, 24/7 support, and access to IT-related e-book collection.
* **Payment Processing**: Powered by Stripe for seamless billing and plan upgrades.
* **Tech Stack**: Next.js, React, Node.js, Express, MongoDB, LearnStack integration, Tailwind CSS.
* **Rendering**: Hybrid SSR/CSR for performance and SEO.
* **Modular Architecture**: `Lesson` and `Chapter` models to structure course content.

## Tech Stack

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (via Mongoose)
* **Auth**: NextAuth.js (Google & GitHub providers)
* **Payments**: Stripe
* **E-learning**: LearnStack integration

## Getting Started

### Prerequisites

* Node.js v16+ and npm or Yarn
* MongoDB Atlas account or local MongoDB
* Stripe account with API keys

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/MohamedReda-Foshi/IT_AcademyPlatform.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or yarn install
   ```

3. Create a `.env.local` in the project root and define required environment variables (see prerequisites).

## Running the App

Depending on your setup, you can run both front-end and back-end together or separately:

* **Full-stack (monorepo)**:

  ```bash
  npm run dev
  # or yarn dev
  ```

  This starts Next.js (front-end + API routes) on [http://localhost:3000](http://localhost:3000).

* **Separate Front-end & Back-end**:

  1. **Back-end (Express API)**:

     ```bash
     npm run dev:backend
     # or yarn dev:backend
     ```

     * Starts the Express server on port 4000 by default.

  2. **Front-end (Next.js)**:

     ```bash
     npm run dev:frontend
     # or yarn dev:frontend
     ```

     * Starts Next.js on port 3000. Make sure `NEXTAUTH_URL` and API base URLs point to `http://localhost:4000` if split.

Visit the respective ports in your browser to verify the services are running.

## Project Structure

```
├── /components      # Reusable UI components
├── /lib             # Helpers (db connection, stripe, auth)
├── /models          # Mongoose models (Lesson, Chapter, User)
├── /pages           # Next.js pages
│   ├── /api         # API routes (auth, payments, courses)
│   └── /courses     # Course pages
├── /public          # Static assets
├── /styles          # Global and Tailwind configs
└── next.config.js   # Next.js config (remotePatterns, SSR)
```

## Authentication Flow

* Users sign in via Google or GitHub.
* Session data stored in a secure HTTP-only cookie.
* Middleware protects paid routes; checks user subscription status.

##

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

> No fluff. Just the essentials. Get it running, keep it simple. Cheers.
