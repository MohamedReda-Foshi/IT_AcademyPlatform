"use client"

import React from 'react';
import { signOut } from 'next-auth/react';

function SingnOut() {
  return (
    <div>
        <button 
          type='button' 
          onClick={() => { signOut({redirect: true, callbackUrl:'/'})}}
          className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition" >
            Singn Out
        </button>
    </div>
  )
}

export default SingnOut