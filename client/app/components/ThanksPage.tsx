import Link from 'next/link'
import React from 'react'
import Button from './Button'

function ThanksPage() {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Thank You!</h1>
        <p className="text-lg mb-6">
          Your email has been sent successfully. We will get back to you shortly.
        </p>
        <Link href="/">
          <Button button="go to home page" type="button" />
        </Link>
      </div>
    </div>
    </div>
  )
}

export default ThanksPage