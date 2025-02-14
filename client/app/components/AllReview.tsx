import React from 'react'
import Review from './Review'

function AllReview() {
return (
    <div>

        <div className='flex flex-row'>
            <Review name="John"  review="This is a great product"/>
            <Review name="user1" review="This is a great product"/>
            <Review name="user2" review="This is a great product"/>
            <Review name="user2" review="This is a great product"/>
        </div>
    </div>
  )
}

export default AllReview