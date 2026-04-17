import React from 'react'
import Counter from './Counter'
import AnimationCounter from './AnimationCounter'

function CounterSection() {
  return (
    <div>
        <div className="flex justify-around items-center py-3 flex-col md:flex-row bg-red-600 w-screen">
          
          <div className='text-5xl text-white font-bold flex flex-col items-center'>
              <AnimationCounter  start={500} end={1200} />
              <Counter name='Course' />
          </div>
            <div className='text-5xl text-white font-bold flex flex-col items-center'>
              <AnimationCounter  start={200} end={300} />
              <Counter name='Student' />
            </div>
            <div className='text-5xl text-white font-bold flex flex-col items-center'>
              <AnimationCounter  start={5} end={25} />
              <Counter name='Years of experience' />
            </div>
            <div className='text-5xl text-white font-bold flex flex-col items-center'>
              <AnimationCounter  start={5000}  end={10000} />
              <Counter name='Learning Hours' />
            </div>
        </div>
    </div>
  )
}

export default CounterSection;