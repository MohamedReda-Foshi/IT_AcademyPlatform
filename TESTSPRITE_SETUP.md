# TestSprite Setup Guide for IT Academy Platform

## Quick Setup Steps

### 1. Install TestSprite MCP Server in Cursor

1. **Open Cursor Settings**
   - Press `Ctrl+,` (or `Cmd+,` on Mac)
   - Or go to **File → Preferences → Settings**

2. **Navigate to MCP Settings**
   - Search for "MCP" in settings
   - Or go to **Tools & Integration → MCP**

3. **Add TestSprite MCP Server**
   - Click "Add custom MCP" or edit your MCP configuration
   - Add this configuration:

```json
{
  "mcpServers": {
    "TestSprite": {
      "command": "npx",
      "args": ["@testsprite/testsprite-mcp@latest"],
      "env": {
        "API_KEY": "your-testsprite-api-key-here"
      }
    }
  }
}
```

4. **Get Your TestSprite API Key**
   - Sign up at https://www.testsprite.com/
   - Get your API key from the dashboard
   - Replace `your-testsprite-api-key-here` in the config above

5. **Restart Cursor**
   - Close and reopen Cursor for the MCP server to load

### 2. Configure Cursor for TestSprite

**Important:** Disable Sandbox Mode for TestSprite to work properly:

1. Go to **Chat → Auto-Run → Auto-Run Mode**
2. Change from "Sandbox" to either:
   - **"Ask Everytime"** (recommended)
   - **"Run Everything"**

### 3. Start Your Application

Before running tests, make sure your application is running:

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
# Should run on http://localhost:3000
```

**Terminal 2 - Backend (if testing backend):**
```bash
cd server
npm run dev:backend
# Should run on http://localhost:4000
```

### 4. Run Tests with TestSprite

Once TestSprite MCP is configured and your app is running:

1. In Cursor chat, simply say:
   ```
   Help me test this project with TestSprite
   ```

2. TestSprite will:
   - Analyze your codebase
   - Generate test plans for frontend and/or backend
   - Execute tests automatically
   - Provide test results and reports

## Project Configuration

### Frontend Configuration
- **Type:** Frontend (Next.js)
- **Port:** 3000
- **Path:** `/home/reda/Desktop/coding/project/IT_AcademyPlatform/client`

### Backend Configuration
- **Type:** Backend (Express/Node.js)
- **Port:** 4000
- **Path:** `/home/reda/Desktop/coding/project/IT_AcademyPlatform/server`

## What TestSprite Will Test

Based on your project structure, TestSprite will likely test:

### Frontend Tests:
- ✅ Authentication flows (Google/GitHub OAuth, Email/Password)
- ✅ Course browsing and display
- ✅ Subscription plan selection
- ✅ Payment integration (Stripe)
- ✅ Course access control (free vs paid)
- ✅ Navigation and routing
- ✅ Component rendering
- ✅ Form submissions

### Backend Tests:
- ✅ API endpoints (user, course, admin routes)
- ✅ Authentication middleware
- ✅ Authorization (role-based access)
- ✅ Database operations (MongoDB)
- ✅ JWT token generation/verification
- ✅ Password hashing
- ✅ Error handling

## Troubleshooting

### TestSprite MCP Not Found
- Ensure Node.js >= 22 is installed: `node --version`
- Restart Cursor after adding MCP configuration
- Check Cursor logs for MCP connection errors

### Tests Not Running
- Verify your app is running on the correct ports
- Check that Auto-Run Mode is not set to "Sandbox"
- Ensure TestSprite API key is valid

### Port Conflicts
- Make sure ports 3000 and 4000 are available
- Check `.env` files for custom port configurations

## Next Steps

After TestSprite is set up:
1. TestSprite will generate comprehensive test plans
2. Review the generated test plans
3. Execute tests and review results
4. Fix any issues found
5. Re-run tests to verify fixes

## Resources

- [TestSprite Documentation](https://docs.testsprite.com/)
- [TestSprite MCP Installation](https://docs.testsprite.com/mcp/getting-started/installation)
- [TestSprite Dashboard](https://www.testsprite.com/)
