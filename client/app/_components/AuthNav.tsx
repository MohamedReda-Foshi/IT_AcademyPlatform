"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Button from "../components/Button"
import Avatar from "../components/Avatar"

export default function AuthNav() {
  const { data: session } = useSession({
    required: false,

  })

  return session ? (
    <Link href="/Profile" >
      <Avatar/>
    </Link>
    ) : (
    <div className="flex space-x-4">
      <Link href="/Login">
           <Button button="Login"/>
      </Link>
      <Link href="/Register">
          <Button button="Register"/>
      </Link>
    </div>
  )
}
