import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/nextAuth';
import SingnOut from '../_components/SingnOut';
import Image from 'next/image'
import Button from '../components/Button';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    const defaultAvatar = "/avatar.png";
    console.log(session)

    return (
        <div className='flex p-9'>
            <div className=" py-10 rounded-lg">
                <div className="items-center justify-center flex border-gray-400 rounded-2xl">
                    <div className='flex flex-col gap-8 rounded-lg p-6'>
                        <div className="flex justify-center">
                            <Image
                                className="rounded-full"
                                src={session?.user.image ?? defaultAvatar}
                                width={120}
                                height={120}
                                alt="Avatar"
                                priority
                            />
                        </div>

                        <div className='flex flex-row gap-2 items-center'>
                            <h1 className='text-xl font-semibold'>Full Name:</h1>
                            <h1 className='text-xl'>{session?.user?.name || 'Not provided'}</h1>
                                                  </div>

                        <div className='flex flex-row gap-2 items-center'>
                            <h1 className='text-xl font-semibold'>Email:</h1>
                            <p className='text-xl'>{session?.user?.email || 'Not provided'}</p>
                        </div>

                        <div className='flex flex-row gap-2 items-center'>
                            <h1 className='text-xl font-semibold'>Role:</h1>
                            <p className='text-xl capitalize'>{session?.user?.role || 'user'}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                className='text-xl border-2 border-gray-400 rounded-md px-3 py-2 w-full text-black focus:outline-none focus:border-blue-500'
                                placeholder='Write a message...'
                            />
                            <Button button='button' />
                        </div>
                        <div>
                            {session?.user?.role === 'admin' && (
                                <a href="Adminpage">
                                <Button button='Admin Panel' /></a>)
                            }
                        </div>



                        <SingnOut />
                    </div>
                </div>

                <div className="mt-6 p-4  rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Progress</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">XP Number:</p>
                            <p className="text-xl font-bold">50</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Level:</p>
                            <p className="text-xl font-bold">1</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Rank:</p>
                            <p className="text-xl font-bold">Beginner</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Certificates:</p>
                            <p className="text-xl font-bold">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}