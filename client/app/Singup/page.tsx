"use client";
import React from 'react'
//import { useState } from 'react';
import Button from '../components/Button';



function page() {
/*
{fname, lname,password,email}
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
*/
    return (
        
            <div className="flex py-32 items-center justify-start ">
                <div className="mx-auto w-full max-w-lg bg-black p-6 rounded-2xl">
                    <h1 className="text-4xl font-bold">Sing up here</h1>
                    <p className="mt-3 text">Create you accont </p>
                    <form className="mt-10 py-4">
                        <div className="flex flex-col">
                            <div className='flex flex-row gap-4'>
                                <div className="relative z-0">
                                    <input 
                                    type="text" 
                                    name="first_name" 
                                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 " 
                                
                                    id="first_name"
                                   // value={fname}
                                    //onChange={(e) => setfname(e.target.value)}
                                    />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">First Name</label>
                                </div>
                                <div className="relative z-0">
                                    <input type="text" 
                                    name="last_name" 
                                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 " 
                                
                                    id="last_name"
                                    //value={lname}
                                    //onChange={(e) => setlname(e.target.value)}
                                    />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Last Name</label>
                                </div>
                            </div>

                            <div className="relative z-0 py-3">
                                <input 
                                
                                type="email" 
                                name="email"
                                id="email"
                                //value={email}
                                //onChange={(e) => setEmail(e.target.value)}

                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                <label className="absolute top-1    scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Your email</label>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className="relative z-0">
                                    <input
                                     type="password" 
                                     name="password" 
                                     id="password"

                                    //value={password}
                                    //onChange={(e) => setPassword(e.target.value)}

                                     className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Your password</label>
                                </div>
                                <div className="relative z-0">
                                    <input type="password" name="password" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Cheack your password</label>
                                </div>
                            </div>
                        </div>
                        <button type='submit'>
                            
                            <Button button="send"/>
                        </button>
                    </form>
                </div>
            </div>
        
    )
}

export default page