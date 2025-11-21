import { redirect } from 'next/navigation';
import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/nextAuth"; // adjust your path
import { NextAuthOptions } from 'next-auth';
//import Button from '../components/Button';
//import Link from 'next/link';
import QuickStats from '../components/QuickStats'
import AdminCard from '../components/AdminCard'


export default async function page() {

  const session = await getServerSession(authOptions as NextAuthOptions)

  // 2) define where to go back to
  const returnTo = encodeURIComponent('/Adminpage')

  // 3) if not logged in OR not admin, redirect to login
  if (!session) {
    redirect(`/auth/Login?returnTo=${returnTo}`)
  }
  if (session.user.role !== 'admin') {
    redirect(`/auth/Login?returnTo=${returnTo}`)
  }

  // 4) actual page render
  return (
    <div className="min-h-screen bg-black py-20">
      {/* Header */}
      <div className=" bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm  text-gray-400">
                Welcome back, {session.user.name || 'Admin'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last login: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <QuickStats />

        {/* Management Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold  dark:text-white mb-6">
            Management Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminCard
              title="User"
              description="Manage user accounts, view enrollment data, and track progress"
              href="/Adminpage/Student"
              stats="1,234"
              icon={
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <AdminCard
              title="See All Course"
              description="Create, edit, and manage courses, modules, and learning materials"
              href="/Adminpage/Course"
              stats="89"
              icon={
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />

            <AdminCard
              title="Add Books"
              description="View detailed reports on user engagement, course performance, and revenue"
              href="/Adminpage/AddBooks"
              icon={
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <AdminCard
              title="Analytics"
              description="View detailed reports on user engagement, course performance, and revenue"
              href="/Adminpage/analytics"
              icon={
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

