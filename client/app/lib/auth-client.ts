import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_URL || "http://localhost:8000",
})

export const { signIn, signUp, signOut, useSession } = authClient;