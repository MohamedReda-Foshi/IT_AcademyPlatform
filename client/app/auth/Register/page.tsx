'use client';

import React, { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { inputUserSanitizer } from '@/app/utils/inputSanitizer';
import SignInWithGoogle from '../../_components/SignInWithGoogle';
import SignInWithGitHub from '../../_components/SignInWithGitHub';

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleanInput = inputUserSanitizer(e.target.value);
      setForm(prev => ({ ...prev, [e.target.name]: cleanInput }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setAccountExists(false);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Registered successfully! Logging you in...');
        await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
        });
        router.push('/Profile');
      } else {
        const msg = data?.message?.toLowerCase() || '';
        if (msg.includes('already exists') || msg.includes('already registered') || res.status === 409) {
          setAccountExists(true);
        } else {
          setError(data?.message || `Error: ${res.status}`);
        }
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen py-32 items-center justify-start bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto w-full max-w-lg bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Create Account</h1>
        
        <div className="flex flex-row gap-4 justify-center mb-8">
          <SignInWithGoogle />
          <SignInWithGitHub />
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm animate-fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm animate-fade-in">
            {success}
          </div>
        )}
        {accountExists && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500 rounded-lg text-blue-500 text-sm animate-fade-in">
            <p className="mb-2">You already have an account with this email.</p>
            <p>Please use the login link below to access your account.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative z-0 group">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
                First Name
              </label>
            </div>

            <div className="relative z-0 group">
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
                Last Name
              </label>
            </div>
          </div>

          <div className="relative z-0 group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Email
            </label>
          </div>

          <div className="relative z-0 group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Password
            </label>
          </div>

          <Button button={loading ? 'Registering...' : 'Register'} type={"button"} />
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/Login" className="text-red-600 hover:text-red-500 transition-colors duration-200 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
