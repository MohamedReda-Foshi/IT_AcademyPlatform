import AdminCard from '@/app/components/AdminCard'
import Button from '@/app/components/Button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='py-20'>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AdminCard
        title="Add Course"
        description="Manage user accounts, view enrollment data, and track progress"
        href="/Adminpage/Course/CreateCourse"
        stats=""
        icon={
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AdminCard
        title="Management Course"
        description="Manage user accounts, view enrollment data, and track progress"
        href="/Adminpage/Course/ShowCourse"
        stats=""
        icon={
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      </div>

      <Link href='/Adminpage' >
        <Button button="Adminpage" />
      </Link>




    </div>
  )
}

export default page