import React from 'react'


function page() {
    return (
        <div className='flex  p-9'>
            <div className=" bg-[f4f4f0] py-10 flex ">
                <div className="w-full">

                    <div className=' flex flext-row gap-8'>

                        <img src="/client/app/favicon.ico" alt="user image" />
                        <h1 className='text-xl font-semibold'>Full Name</h1>
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