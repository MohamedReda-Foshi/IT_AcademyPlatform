import React from 'react'
import Course from '../components/Course'

function page() {
    return (
        <div className=' flex flex-row justify-around gap-4 py-10'>
            <div className=''>filter</div>
            <div className=' flex- '>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>web</h1>
                    <div className='flex flex-row gap-4'>
                        <Course />
                        <Course />
                        <Course />
                    </div>
                </div>                
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>web</h1>
                    <div className='flex flex-row gap-4'>
                        <Course />
                        <Course />
                        <Course />
                    </div>
                </div>               
                 <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold py-4'>web</h1>
                    <div className='flex flex-row gap-4'>
                        <Course />
                        <Course />
                        <Course />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default page