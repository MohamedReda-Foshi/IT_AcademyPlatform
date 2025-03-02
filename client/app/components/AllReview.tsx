import React from 'react'
import Review from './Review'

function AllReview() {
return (
    <div>
        
        <h1 className='text-3xl font-bold text-center mt-8 pb-10'>Reviews</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 '>
            <Review name="reda"  review="This is a great product" job='full stack dev'/>
            <Review name="rayane"  review="This is a great product" job='full stack dev'/>
            <Review name="foshi"  review="This is a great product" job='full stack dev'/>

        </div>
    </div>
  )
}

export default AllReview