"use client"

import React from 'react';
import { signOut } from 'next-auth/react';

function SignOut() {
  return (
    <div>
        <button 
          type='button' 
          onClick={() => { signOut({redirect: true, callbackUrl:'/'})}}
          className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition" >
            Sign Out
        </button>
    </div>
  )
}

export default SignOut