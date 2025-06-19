'use client';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import SingninWithGoogle from '../../_components/SingninWithGoogle';
import SingninWithGitHub from '../../_components/SingninWithGitHub';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.ok) {
        setError("Invalid email or password");
        return;
      }
      
      // Successful login - you can add navigation here if needed
      window.location.href = "/Profile"; // Redirect to home page after successful login
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen py-32 items-center justify-start bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto w-full max-w-lg bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back</h1>
        
        <div className="flex flex-row gap-4 justify-center mb-8">
          <SingninWithGoogle />
          <SingninWithGitHub />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-6">
          <div className="relative z-0 group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isLoading}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Password
            </label>
          </div>
          <Button button={isLoading ? 'Logging in...' : 'Login'} />
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/Register" className="text-red-600 hover:text-red-500 transition-colors duration-200 hover:underline">
            Register
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link href="/ForgotPassword" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}