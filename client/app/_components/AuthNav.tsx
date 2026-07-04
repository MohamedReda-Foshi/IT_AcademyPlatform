"use client"

import { useSession } from "../lib/auth-client";
import Link from "next/link"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import { useSession } from "../lib/auth-client";

export default function AuthNav() {
  const { data: session, isPending } = useSession()

<<<<<<< HEAD
  if (isPending) return <p>Loading...</p>; 
=======
  if (isPending) return <p>Loading...</p>;  
>>>>>>> fadeac95cddd5dafc8550b362a042a357e7515b7
  return session ? (
    <Link href="/Profile" >
      <Avatar/>
    </Link>
    ) : (
    <div className="flex space-x-4">
<<<<<<< HEAD
      <Link href="/auth/Login">
          <Button button="Login" type={"button"} w={""}/>
      </Link>
      <Link href="/auth/Register">
          <Button button="Register" type={"button"} w={""}/>
=======
      <Link href="/auth/Sign-up">
          <Button button="Sign Up" type={"button"}/>
      </Link>
      <Link href="/auth/Sign-In">
          <Button button="Sign In" type={"button"}/>
>>>>>>> fadeac95cddd5dafc8550b362a042a357e7515b7
      </Link>
    </div>
  )
}

