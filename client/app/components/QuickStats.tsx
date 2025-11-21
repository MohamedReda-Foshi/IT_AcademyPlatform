import React from 'react'

function QuickStats() {
  return (
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-red-700 to-black rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Total Students</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Active Courses</p>
            <p className="text-2xl font-bold">89</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-red-800 to-black rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Instructors</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-red-900 to-black rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm">Revenue</p>
            <p className="text-2xl font-bold">$12.5K</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickStats