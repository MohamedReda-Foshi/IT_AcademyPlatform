import Image from 'next/image'
import React from 'react'


function page() {
    return (
        <div className='flex  p-9'>
            <div className=" bg-[f4f4f0] py-10  ">
                <div className="items-center justify-center flex border-gray-400 rounded-2xl">

                    <div className=' flex flext-row gap-8 rounded- '>

                       <Image
                            className='rounded-full'
                            src="https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg"
                            width={100}
                            height={100}
                            alt="Front-end Development"
                            objectFit='cover'
                        />
                    <h1 className='text-xl font-semibold'>First Name :</h1>
                    <h1 className='text-xl font-semibold'>Last Name : </h1>
                    
                    </div>

                    <div>
                        <h1 className='text-2xl font-bold'>Email</h1>
                        <p className='text-lg'>example@gmail.com</p>

                    </div>

                </div>
            </div>



        </div>



    )
}

export default page