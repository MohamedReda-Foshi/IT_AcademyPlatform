import React from 'react'
import Button from './Button'
import Image from 'next/image'

function Course() {
    return (
        <div className=' flex-col flex p-5 rounded-2xl border-solid border-2 border-gray-200 gap-4'>
    
            <Image
                className='rounded-lg hover:scale-110 transition'
                src="https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg"
                width={300}
                height={400}
                alt="Front-end Development"
                objectFit='cover'
            />

            <h1 className='text-3xl font-bold'>Course title </h1>

            <p>Course information</p>
            <Button button="start" />
            <p>levelcourse</p>

        </div>
    )
}

export default Course