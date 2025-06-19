"use client"
import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react';
import { Menu } from 'lucide-react';
import AuthNav from '../_components/AuthNav'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode} from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

  };


  return (
    <>
      <nav className="bg-black border-b border-red-700 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="flex justify-between h-16">
              <Link href="/">
            <div className="flex items-center flex-row py-4">
              <FontAwesomeIcon
                icon={faLaptopCode} className='text-red-600 size-8'/> 
                <span className="flex items-center px-2">
                  <span className="text-red-600 text-2xl font-bold">Tech</span>
                  <span className="text-white text-2xl font-bold">Learn</span>
                </span>
            </div>
              </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8 py-5">
                <Link href="/" className="text-white hover:text-red-500 transition">Home</Link>
                <Link href="/Courses" className="text-white hover:text-red-500 transition">Courses</Link>
                <Link href="/About" className="text-white hover:text-red-600 transition">About</Link>
                <Link href="/Contact" className="text-white hover:text-red-500 transition">Contact</Link>
                
             
              </div>
            </div>
              <div>

                <AuthNav/>
              </div>

            {/* Hamburger Menu Button - Visible only on mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-white p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X />
                ) : (
                  // Hamburger icon when menu is closed
                  <Menu />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Expanded when hamburger is clicked */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col sm:px-3 border-t border-red-700">
              <Link href="/" className="text-white block px-3 py-2 hover:bg-red-700 rounded transition">Home</Link>
              <Link href="/Courses" className="text-white block px-3 py-2 hover:bg-red-700 rounded transition">Courses</Link>
              <Link href="/About" className="text-white block px-3 py-2 hover:bg-red-700 rounded transition">About</Link>
              <Link href="/Contact" className="text-white block px-3 py-2 hover:bg-red-700 rounded transition">Contact</Link>
              <AuthNav/>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;