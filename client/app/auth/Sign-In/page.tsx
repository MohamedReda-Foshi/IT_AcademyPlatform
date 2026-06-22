"use client";
import Link from 'next/link';
import { signIn } from "../../lib/auth-client";

export default function SignInPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    
    const result = await signIn.email(
      {
        email,
        password,
        callbackURL: "/Profile",
        
      },
      {
        onSuccess() {
          console.log("Signed in successfully");
        },
        onError(ctx: { error: unknown }) {
          console.log("Sign-in failed:", ctx.error);
        },
      }
    );
    console.log(result);
    
  }
  
  
  
  return (
    <div className="flex min-h-screen py-32 items-center justify-start bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto w-full max-w-lg bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome Back</h1>
        {/*
        <div className="flex flex-row gap-4 justify-center mb-8">
          
          <SignInWithGoogle />
          <SignInWithGitHub />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm animate-fade-in">
            {error}
          </div>
        )}
        */}

        {/*
                    <form
              action={async (formData) => {
                "use server"
                await signIn("resend", formData)
              }}
            >
              <input type="text" name="email" placeholder="Email" />
              <button type="submit">Signin with Resend</button>
            </form>
    */}

        
        
        
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="relative z-0 group">
            <input
              type="email"
              name="email"
              required
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
              required
              className="peer block w-full border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm text-white focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
            <label className="absolute left-0 top-3 -z-10 origin-[0] -translate-y-6 transform scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600">
              Password
            </label>
          </div>
          {/* <Button button={isLoading ? 'Logging in...' : 'Login'} type={'button'} /> */}
          <button
            className="rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
            type="submit">Sign In
          </button>
        </form>
        
        
        
        
        
        
        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/Sign-up"
            className="text-red-600 hover:text-red-500 transition-colors duration-200 hover:underline">
            Sign-up
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link href="/ForgotPassword" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}