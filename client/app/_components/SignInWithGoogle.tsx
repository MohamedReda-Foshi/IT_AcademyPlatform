"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";

export default function SignInWithGoogle() {
  return (
    <div>
        <button type='button' onClick={() => { signIn("google",{redirect: true, callbackUrl:'/Profile'});  }} >
            
            <div className='flex items-center justify-center gap-2 bg-red-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors'>
            <FaGoogle className='inline-block mr-2 text-black hover:text-red-500' />
            </div>
            
        </button>
    </div>
  )
}