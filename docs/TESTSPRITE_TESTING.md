# TestSprite MCP – Frontend & Backend Testing Guide

This guide explains how to run **frontend** and **backend** testing for the IT Academy Platform using the **TestSprite MCP server** in Cursor.

---

## 1. Prerequisites

- **TestSprite MCP** installed and configured in Cursor ([Installation](https://docs.testsprite.com/mcp/getting-started/installation)).
- **Node.js >= 22** (required for the TestSprite MCP server).
- **TestSprite API key** from [Dashboard → API Keys](https://www.testsprite.com/dashboard).

### Cursor settings (recommended)

- **Cursor Settings → Chat → Auto-Run → Auto-Run Mode**: set to **"Ask Every time"** or **"Run Everything"** so TestSprite can run fully (avoid sandbox-only execution).

---

## 2. Start the application

TestSprite needs your app running before it can test it.

### Backend (Express API)

```bash
cd server
npm install
# Ensure .env has PORT (e.g. 4000) and DATAURL (MongoDB)
npm run start
```

- Default port: **4000** (or whatever `process.env.PORT` is in `server/.env`).
- Base URL: `http://localhost:4000`.

### Frontend (Next.js)

```bash
cd client
npm install
npm run dev
```

- Default port: **3000**.
- Base URL: `http://localhost:3000`.

Keep both running when you run TestSprite.

---

## 3. Run testing with TestSprite MCP

In **Cursor Chat** (with TestSprite MCP enabled), use one of these prompts.

### Full project test (frontend + backend)

```text
Can you test this project with TestSprite?
```

The AI will use TestSprite tools to:

1. **Bootstrap** – detect project type, check if the app is running, open the TestSprite config portal.
2. **Code summary** – analyze the codebase and create `code_summary.json`.
3. **PRD** – generate or use the standardized PRD.
4. **Test plans** – generate frontend and/or backend test plans.
5. **Execute** – generate test code (e.g. Playwright) and run tests, then produce reports.

### Frontend-only testing

```text
Run frontend testing with TestSprite. Type: frontend, scope: codebase. Frontend runs at http://localhost:3000.
```

When the **TestSprite configuration portal** opens in the browser:

- **Testing type**: **Frontend**.
- **Scope**: **Codebase** (or **Code Diff** if you only want to test recent changes).
- **Application URL**: `http://localhost:3000`.
- **Test account credentials**: If the app has login (e.g. NextAuth), add a test user (e.g. email + password or OAuth test account).
- **PRD**: Upload an existing PRD or use the draft at `docs/testsprite_prd_draft.json` if you created it.

### Backend-only testing

```text
Run backend testing with TestSprite. Type: backend, scope: codebase. Backend API runs at http://localhost:4000.
```

In the config portal:

- **Testing type**: **Backend**.
- **Scope**: **Codebase** (or **Code Diff**).
- **Application URL**: `http://localhost:4000`.
- **Authentication**: If your API uses JWT/Bearer or API key, set the auth type and credentials in the portal.
- **PRD**: Same as above.

### Targeted tests (after first run)

After TestSprite has generated tests, you can run specific cases:

```text
Run TestSprite tests TC001 and TC002 with focus on login and security.
```

---

## 4. Project layout for TestSprite

TestSprite expects an absolute path to the **project root**. Use the repo root where both `client` and `server` live, for example:

- **Windows**: `c:\Users\VIVOBOOK\Desktop\cloned project\IT_AcademyPlatform`
- **macOS/Linux**: `/path/to/IT_AcademyPlatform`

Typical ports:

| App       | Port | URL                     |
|----------|------|-------------------------|
| Frontend | 3000 | http://localhost:3000   |
| Backend  | 4000 | http://localhost:4000   |

---

## 5. After the test run

You’ll get:

- **testsprite_tests/** – test files (e.g. `TC001_*.py`, …), config, and results.
- **testsprite_tests/tmp/test_results.json** – detailed execution results.
- **TestSprite_MCP_Test_Report.md** / **.html** – human-readable report.

To ask the AI to fix issues based on results:

```text
Please fix the codebase based on TestSprite testing results.
```

---

## 6. If TestSprite tools don’t appear

- Confirm **TestSprite MCP** is added in **Cursor Settings → Tools & Integration → MCP** and that your **API key** is set in the server config.
- Restart Cursor and open this project, then try the prompts again.
- Ensure you’re in a chat where MCP tools are enabled (e.g. Composer/Agent with MCP).

For more: [TestSprite MCP – First test](https://docs.testsprite.com/mcp/getting-started/first-test), [Tools reference](https://docs.testsprite.com/mcp/core/tools).
