import React from 'react'
import Button from './Button'
import SeButton from './SeButton'
import Link from 'next/link'

function Navigation() {
  return (
    
    <div className="flex h-16 items-center  justify-between px-4">

    <h1>logo</h1>
      <div className=" items-center " >
        <nav>
          <ul className="flex items-center gap-3 border-red-500 p-3 border-4 rounded-full text-sm">
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
            </li>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Courses </Link>
            </li>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="#">  </Link>
            </li>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/About">About</Link>
            </li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/Contact"> Contact </Link>
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

          <Button button="Sign up" />

          <div className="hidden sm:flex">
          <SeButton button="Register"/>

          </div>
        </div>

      </div>
    </div>



  )
}

export default Navigation