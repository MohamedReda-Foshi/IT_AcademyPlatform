"use client"

import { useSession } from "next-auth/react"
import SignInWithGoogle from "./SignInWithGoogle"
// import Avatar from "../components/Avatar"



// import Link from "next/link"
// import Button from "../components/Button"
// import SeButton from "../components/SeButton"

export const ClientComponent = () => {
    const { data: session, status } = useSession()
  return (
    <div>
        
                {status === "loading" && <p>Loading</p> }
                {status === "unauthenticated" && <SignInWithGoogle/> }
                {status === "authenticated" &&(
                <>
                  { session.user?.name} 
                        


                  
                </>

                ) }
                
    </div>
  )
}



{/* {session ? (
<Link href="/Profile" className="text-white hover:text-red-500 transition"><Avatar /></Link>
) : (<><Link href="/Login"><Button button="Login" /></Link><Link href="/Register"><SeButton button="sing up" /></Link></>)
} */}
        