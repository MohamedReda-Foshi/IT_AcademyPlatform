import React from 'react'

function StatsSec() {
    return (
        <div className='bg-red-600 p-8'>
            <div className=' flex-col md:flex-row md:flex justify-around'>
                <div className='flex-col'>
                    <div className='text-white font-bold text-xl'> Course</div>
                    <div className='text-5xl font-extrabold leading-tight text-center text-dark-grey-900'>123+</div>
                </div>
                <div className='flex-col'>
                    <div className='text-white font-bold text-xl'> Student</div>
                    <div className='text-5xl font-extrabold leading-tight text-center text-dark-grey-900'>123+</div>
                </div>

                <div className='flex-col'>
                    <div className='text-white font-bold text-xl'>Years of experience</div>
                    <div className='text-5xl font-extrabold leading-tight text-center text-dark-grey-900'>123+</div>
                </div>
                <div className='flex-col'>
                    <div className='text-white font-bold text-xl'>Learning Hours</div>
                    <div className='text-5xl font-extrabold leading-tight text-center text-dark-grey-900'>123</div>
                </div>
            </div>
        </div>
    )
}
export default StatsSec