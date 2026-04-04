"use client"
import Link from "next/link"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import { useSession } from "../lib/auth-client";

export default function AuthNav() {
  const { data: session, isPending } = useSession()

  if (isPending) return <p>Loading...</p>;  
  return session ? (
    <Link href="/Profile" >
      <Avatar/>
    </Link>
    ) : (
    <div className="flex space-x-4">
      <Link href="/auth/Sign-up">
          <Button button="Sign Up" type={"button"}/>
      </Link>
      <Link href="/auth/Sign-In">
          <Button button="Sign In" type={"button"}/>
      </Link>
    </div>
  )
}
