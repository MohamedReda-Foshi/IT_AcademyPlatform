import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <div className='px-5'>

      <h1 className='text-3xl'>Ho we are</h1>

      <div className='flex flex-col md:flex-row md:flex gap-4 items-center justify-center'>

        <div>
          <Image
            className='rounded-lg hover:scale-110 transition'
            src="https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg"
            width={300}
            height={400}
            alt="Front-end Development"
            objectFit='cover'
          />
        </div>
        <div>
          <h2>Our Mission</h2>
          <p>Our mission is to provide the best possible experience for our customers.</p>
        </div>
      </div>


    </div>
  )
}

export default About