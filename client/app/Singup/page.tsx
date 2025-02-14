import React from 'react'
import Button from '../components/Button';
function page() {
    return (
        <div>
            <div className="flex py-32 items-center justify-start ">
                <div className="mx-auto w-full max-w-lg bg-black p-6 rounded-2xl">
                    <h1 className="text-4xl font-bold">Sing up here</h1>
                    <p className="mt-3 text">Create you accont </p>
                    <form className="mt-10 py-4">
                        <div className="flex flex-col">
                            <div className='flex flex-row gap-4'>
                                <div className="relative z-0">
                                    <input type="text" name="first_name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 " />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">First Name</label>
                                </div>
                                <div className="relative z-0">
                                    <input type="text" name="last_name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 " />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Last Name</label>
                                </div>
                            </div>

                            <div className="relative z-0 py-3">
                                <input type="email" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                <label className="absolute top-1    scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Your email</label>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className="relative z-0">
                                    <input type="password" name="password" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Your password</label>
                                </div>
                                <div className="relative z-0">
                                    <input type="password" name="password" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" />
                                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">Cheack your password</label>
                                </div>
                            </div>
                        </div>
                        <Button button="send" className="py-28" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page