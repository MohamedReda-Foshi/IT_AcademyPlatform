import React from 'react'


{
    /* <div className='px-5'>
            <img/>
            <h2>{props.fullname}</h2>
        </div> */
}
function Team(props: { fullname: string , position:string, description:string }) {
    return (
        <div className='p-5 flex-col flex rounded-2xl bg-gray-950 gap-2 shadow-xl flex-1 transition-all hover:scale-105 [&:hover>*]:scale-95  [&:hover>p.description]:opacity-100'>
            <h2 className='text-2xl font-bold uppercase transition-all text-white'>{props.fullname}</h2>
            <p className='text-red-500 font-bold transition-all position'>
                {props.position}
            </p>
            <p className='text-gray-400 description transition-all opacity-60'>
                {props.description}
            </p>
        </div>
    )
}

export default Team;