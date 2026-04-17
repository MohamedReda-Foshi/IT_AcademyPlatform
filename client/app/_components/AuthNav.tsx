"use client"

import { useSession } from "../lib/auth-client";
import Link from "next/link"
import Button from "../components/Button"
import Avatar from "../components/Avatar"

export default function AuthNav() {
  const { data: session, isPending } = useSession()

  if (isPending) return <p>Loading...</p>; 
  return session ? (
    <Link href="/Profile" >
      <Avatar/>
    </Link>
    ) : (
    <div className="flex space-x-4">
      <Link href="/auth/Login">
          <Button button="Login" type={"button"} w={""}/>
      </Link>
      <Link href="/auth/Register">
          <Button button="Register" type={"button"} w={""}/>
      </Link>
    </div>
  )
}

