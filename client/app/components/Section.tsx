import React from 'react'

function Section() {
  return (

<section >
  <div className=" px-4 py-32 lg:py-0 lg:flex lg:h-svh lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Understand User Flow.
        <p className="font-extrabold text-red-700 sm:block"> Increase Conversion. </p>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <p className="block w-full rounded-sm bg-red-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-3 focus:outline-hidden sm:w-auto" >
          Get Started
        </p>
        <p className="block w-full rounded-sm px-12 py-3 text-sm font-medium text-red-600 shadow-sm hover:text-red-700 focus:ring-3 focus:outline-hidden sm:w-auto" >
          Learn More
        </p>
      </div>
    </div>
  </div>
</section>

  )
}

export default Section