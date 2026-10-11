"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 mb-8">
          Your subscription is now active. Thank you for your purchase!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/Courses"
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition"
          >
            Browse Courses
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-md transition"
          >
            Back to Home
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
}
