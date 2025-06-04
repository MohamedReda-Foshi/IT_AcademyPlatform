"use client"
import React, { useState } from 'react';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/simpleAth/Auth';
import SingninWithGoogle from '../_components/SingninWithGoogle';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { ok, status, data } = await loginUser(form.email, form.password);
      
      if (ok) {
        // Redirect to dashboard or home page after successful login
        router.push('/Courses'); // Change this to your desired redirect page
      } else {
        setError((data as any)?.message || `Login failed: ${status}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex py-32 items-center justify-start">
      <div className="mx-auto w-full max-w-lg bg-black p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-white mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      <SingninWithGoogle/>
        <form onSubmit={handleSubmit} className="grid gap-6">
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

          <Button button={loading ? "Logging in..." : "Login"}  />
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/Register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>
        
        <div className="mt-2 text-center">
          <Link href="/ForgotPassword" className="text-sm text-gray-400 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}