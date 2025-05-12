import React from 'react'
import Team from './Team'

function AllTeams() {
  return (
    <div className=' flex items-center justify-center flex-col gap-5 py-10 '>
        
        <span className="flex items-center  ">
                  <span className="text-red-600 text-3xl font-bold">Meet Our </span>
                  <span className="text-white text-3xl font-bold">Team</span>
                </span>
                <p >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry  
                </p>
       
        
        <div className='flex-col flex md:flex-row md:flex gap-20 px-10'>
            <Team fullname='reda' position='ceo' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'/>
            <Team fullname='reda' position='ceo' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'/>
            <Team fullname='reda' position='ceo' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'/>
            
            
        </div>
    </div>
  )
}

export default AllTeams