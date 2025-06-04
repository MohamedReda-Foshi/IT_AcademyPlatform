import React from 'react'
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';


function SingninWithGitHub() {
  return (
    <div>
       <button type='button' onClick={() => { signIn("github",{redirect: true, callbackUrl:'/Profile' }); console.log("github")}} >
                   
                   <div className='flex items-center justify-center gap-2 bg-red-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors'>
                   <FaGithub  className='inline-block mr-2 text-black hover:text-red-500' />
                   </div>
                   
               </button>     
    </div>
  )
}

export default SingninWithGitHub