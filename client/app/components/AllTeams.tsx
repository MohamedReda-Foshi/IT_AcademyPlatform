import React from 'react'
import Team from './Team'

function AllTeams() {
  return (
    <div className=' flex items-center justify-center flex-col gap-5 py-10 '>
        
        <span className="flex items-center gap-1">
                  <span className="text-red-600 text-3xl font-bold">Meet Our</span>
                  <span className="text-white text-3xl font-bold">Team</span>
                </span>
                <p className='text-lg capitalize font-bold'>
                    Our Team Can Take Your Ideas To A Real MERN Stack Application Living On The WEB.  
                </p>        
        <div className='flex-col flex md:flex-row md:flex gap-20 px-10'>
            <Team fullname='Reda Mohamed' position='CEO' description='Mr Reda Mohamed Guide In Trip in cyber security and REST Full APIs *Mongo_Express_React_Node-JS- Stack Developer*.'/>
            <Team fullname='Mounaim' position='Frontend' description='Mr Mounaim Specialize in the Frontend *Mongo_Express_React_Node-JS- stack Developer*.'/>
            <Team fullname='Reda Mohamed & Mounaim' position='Backend' description='Collaboration Whit The Two Teams Group For Building Heigh Secure APIs And Scalable And Readable Backend Code.'/>
        </div>
    </div>
  )
}

export default AllTeams