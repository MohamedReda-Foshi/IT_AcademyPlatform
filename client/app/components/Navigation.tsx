import React from 'react'
import Button from './Button'
import SeButton from './SeButton'
import Link from 'next/link'

function Navigation() {
  return (

    <>

      <nav className="bg-black border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="flex items-center">
                  <span className="text-red-600 text-2xl font-bold">Tech</span>
                  <span className="text-white text-2xl font-bold">Learn</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="hover:text-red-500 transition">Home</Link>
              <Link href="/Courses" className="hover:text-red-500 transition">Courses</Link>
              <Link href="/About" className="hover:text-red-600 transition">About</Link>
              <Link href="/Contact" className="hover:text-red-500 transition">Contact</Link>

              <Link href="/Login"><Button button="Login" /></Link>
              <Link href="/Singup"><SeButton button="sing up" /></Link>


            </div>
          </div>
        </div>
      </nav>



    </>

  );
}

export default Navigation;