"use client"
import React, { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/lib/simpleAth/Auth';
import SingninWithGoogle from '../../_components/SingninWithGoogle';
import SingninWithGitHub from '../../_components/SingninWithGitHub';

export default function RegisterForm() {
  
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setAccountExists(false);

    try {
      const { ok, data, status } = await registerUser(form);
      
      if (ok) {
        setSuccess('Registered successfully! Redirecting to login…');
        setTimeout(() => router.push('/Login'), 1500);
      } else {
        // Check if the error is because the account already exists
        if (data?.message?.toLowerCase().includes('already exists') || 
            data?.message?.toLowerCase().includes('already registered') ||
            status === 409) { // Assuming 409 Conflict is returned for existing accounts
          setAccountExists(true);
        } else {
          setError((data as any)?.message || `Error: ${status}`);
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="flex py-32 items-center justify-start">
      <div className="mx-auto w-full max-w-lg bg-black p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-white mb-6">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {accountExists && (
          <div className="bg-blue-900/30 border border-blue-500 text-blue-200 p-4 rounded-lg mb-4">
            <p className="mb-2">You already have an account with this email.</p>
            <p>Please use the login link below to access your account.</p>
          </div>
        )}

        

                
        <form onSubmit={handleSubmit} className="grid gap-6 pb-9">
          <div className="relative z-0">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer block w-full border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              First Name
            </label>
          </div>

          <div className="relative z-0">
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer block w-full border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Last Name
            </label>
          </div>

          <div className="relative z-0">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer block w-full border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Email
            </label>
          </div>

          <div className="relative z-0">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer block w-full border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Password
            </label>
          </div>

          <Button button="Register" />
          
        </form>
        <hr/>
        <div className='flex-col   p-5'>
        <p className="text-gray-400 text-center mb-6">Or register with:</p>
              <div className='flex-row gap-9 flex items-center justify-center'>
                <SingninWithGoogle/>
                <SingninWithGitHub/>
              </div>
        </div>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/Login" className="text-red-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}