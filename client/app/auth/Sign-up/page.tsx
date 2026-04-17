"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { signUp } from "../../lib/auth-client";

export default function SignUpPage() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const firstName = (form.get("firstName") as string)?.trim();
    const lastName = (form.get("lastName") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    const password = form.get("password") as string;
    const about = ((form.get("about") as string) || "").trim();

    const fullName = `${firstName} ${lastName}`.trim();

    const { error } = await signUp.email({
      name: fullName,
      lastName,
      email,
      password,
      about,
      callbackURL: "/Profile",
    });

    if (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-black/50 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder=" "
              />
              <label
                htmlFor="firstName"
                className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
              >
                First Name
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder=" "
              />
              <label
                htmlFor="lastName"
                className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              required
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              required
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
            >
              Password
            </label>
          </div>

          <div className="relative">
            <textarea
              name="about"
              id="about"
              rows={3}
              className="peer block w-full resize-none border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder=" "
            />
            <label
              htmlFor="about"
              className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
            >
              About
            </label>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/Sign-In"
            className="text-red-600 transition hover:text-red-500 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link
            href="/ForgotPassword"
            className="text-sm text-gray-400 transition hover:text-gray-300 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}