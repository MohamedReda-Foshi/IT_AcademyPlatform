// "use client"
// import React from 'react'
// import ThanksPage from "../components/ThanksPage";
// import Button from '../components/Button';

// import { useForm, ValidationError } from '@formspree/react';

// function page() {
//   const [state, handleSubmit] = useForm("xkgoqwko");
//   if (state.succeeded) {
//       return <>
//       <ThanksPage/>
//       </>;
//   }

//   return (
//     <div>



// <div className="flex py-32 items-center justify-start ">
//   <div className="mx-auto w-full max-w-lg bg-black p-6 rounded-2xl">
//     <h1 className="text-4xl font-bold">Contact us</h1>
//     <p className="mt-3 text ">Email us here:</p>

//     <form className="mt-10 py-4" onSubmit={handleSubmit}>
    
   
//       <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
//       <div className="grid gap-6 sm:grid-cols-2">
//         <div className="relative z-0">
//           <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 "  />
//           <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 peer-focus:dark:text-red-500">Your name</label>
//         </div>
//         <div className="relative z-0">
//           <input type="email" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0"  />
//           <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 peer-focus:dark:text-red-500">Your email</label>
//         </div>
//         <ValidationError 
//         prefix="Email" 
//         field="email"
//         errors={state.errors}
//       />
//         <div className="relative z-0 col-span-2">
//           <textarea name="message"  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0" ></textarea>
//           <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 peer-focus:dark:text-red-500">Your message</label>
//         </div>
//         <ValidationError 
//         prefix="Message" 
//         field="message"
//         errors={state.errors}
//       />
//       </div>
      
//       <Button button="Send Message" disabled={state.submitting} type="submit" className="mt-5 rounded-md bg-black px-10  text-white py-9"/>
//     </form>
//   </div>
// </div>
//     </div>
//   )
// }

// export default page;