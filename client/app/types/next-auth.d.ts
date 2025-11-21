// somewhere early in your codebase, e.g. in next-env.d.ts or a new types/next-auth.d.ts

import "next-auth"
import { AdapterUser as _AdapterUser } from "next-auth/adapters"

declare module "next-auth/adapters" {
  interface AdapterUser {
    /** you store this in MongoDB */
    role?: string
  }
}
