import React from 'react'

interface ReviewProps {
    name: string;
    review: string;
}

function Review(props: ReviewProps) {
return (
    <div className='border rounded-xl bg-black p-5 m-5'>
            <div className='flex flex-col py-4'>
                <div className='flex flex-row gap-4'>
                    <img src="" alt="image Studant" />
                    <h1 className='text-xl'>{props.name}</h1>
                </div>
                <p className='px-3'>{props.review}</p>
            </div>     
        </div>
    )
}

export default Review