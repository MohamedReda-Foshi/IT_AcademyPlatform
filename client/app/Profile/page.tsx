import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/nextAuth';
import SingnOut from '../_components/SingnOut';
import Image from 'next/image'
import Button from '../components/Button';


export default async function page(){
    const session = await getServerSession(authOptions);
    console.log(session);
    const defaultAvatar="../asset/image/avatar.png";

    return (
        <div className='flex  p-9'>
            <div className=" bg-[f4f4f0] py-10  ">
                <div className="items-center justify-center flex border-gray-400 rounded-2xl">

                    <div className=' flex flex-col gap-8 rounded- '>

                        <Image
                            className='rounded-full'
                            src={session?.user?.image || defaultAvatar}
                            width={100}
                            height={100}
                            alt="user profile image"
                            objectFit='cover'
                        />
                        
                        <div className='flex flex-row gap-2'>
                            <h1 className='text-xl '>Full Name:</h1>
                            <h1 className='text-xl '>{session?.user?.name} </h1>
                        </div>
                        
                        <div className='flex flex-row gap-2'>
                            <h1 className='text-xl '>Email:</h1>
                            <p className='text-xl '>{session?.user?.email}</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <h1 className='text-xl '>Role:</h1>
                            <p className='text-xl '>user</p>
                        </div>
                        <div>
                            <input type="message" 
                                className='text-xl border-2 border-gray-400 rounded-md px-2 py-1 w-full text-black'
                                placeholder='Write a message...' 
                            />
                            
                            <Button button='button'/>
                        </div>



                        <SingnOut/>
                    </div>

                   


                </div>

                 <div>
                        <p>Xpnumber:50</p>
                        <p>Level:1</p>
                        <p>Rank:Beginner</p>
                        <p>Certificate</p>
                </div>
                
            </div>



        </div>



    )
}
