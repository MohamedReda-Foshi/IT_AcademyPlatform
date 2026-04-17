import { createAuthClient } from "better-auth/react"
import { auth } from "../../../server/src/lib/auth"

import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_URL || `"http://localhost:"${process.env.PORT}`,
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient;