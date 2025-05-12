import React from 'react'


{
    /* <div className='px-5'>
            <img/>
            <h2>{props.fullname}</h2>
        </div> */
}
function Team(props: { fullname: string ,position:string,description:string }) {
  return (
    <div className='px-5 flex-col flex border-2 rounded-2xl  bg-gray-950 py-4 itmes-center justify-center'>
        <h2 className='text-2xl text-white'>{props.fullname}</h2>
        <p className='text-red-500 '>
            {props.position}
        </p>
        <p className='text-gray-500'>
            {props.description}
        </p>
    </div>
  )
}

export default Team