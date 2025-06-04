import React from 'react'

interface CounterProps {
  name: string;

}

function Connter(props: CounterProps) {
  return (
  
        <div className='flex flex-row items-center py-3'>
            <p className='text-xl text-[#ffffff] font-bold'>{props.name}</p>
    </div>
  )
}

export default Connter