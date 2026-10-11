"use client";

import React from "react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-300 mb-8">
          No worries! You can try again whenever you&apos;re ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/Payment"
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-md transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
