'use client';

import React, { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import SingninWithGoogle from '../../_components/SingninWithGoogle';
import SingninWithGitHub from '../../_components/SingninWithGitHub';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.message?.toLowerCase().includes("already")) {
          setError("Account already exists.");
        } else {
          setError(data?.message || `Error: ${res.status}`);
        }
        return;
      }

      setSuccess("Registered successfully! Logging you in...");

      await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      router.push('/Profile');
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen py-32 items-center justify-start bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto w-full max-w-lg bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Create Account</h1>

        <div className="flex flex-row gap-4 justify-center mb-8">
          <SingninWithGoogle />
          <SingninWithGitHub />
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

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field) => (
              <div key={field} className="relative z-0 group">
                <input
                  type="text"
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                />
                <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
                  {field === 'firstName' ? 'First Name' : 'Last Name'}
                </label>
              </div>
            ))}
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

          <Button button={loading ? 'Registering...' : 'Register'} />
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
