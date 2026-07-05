import { createAuthClient } from "better-auth/react"
import { stripeClient } from "@better-auth/stripe/client"

export const authClient = createAuthClient({
  baseURL: "",
  plugins: [
      stripeClient({
        subscription: true, //if you want to enable subscription management
      })
  ]
})

export const { signIn, signUp, signOut, useSession, subscription } = authClient;
