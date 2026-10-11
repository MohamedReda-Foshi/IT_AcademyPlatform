import React from 'react'
import Link from 'next/link'
import { Users, BookOpen, GraduationCap } from 'lucide-react'

function page() {
  const links = [
    { href: '/Adminpage/student', label: 'Students', icon: Users, color: 'from-blue-600 to-blue-800' },
    { href: '/Adminpage/Course', label: 'Courses', icon: BookOpen, color: 'from-red-600 to-red-800' },
    { href: '/Adminpage/Instructors', label: 'Instructors', icon: GraduationCap, color: 'from-purple-600 to-purple-800' },
  ]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-12">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className={`group relative bg-gradient-to-br ${color} rounded-2xl p-8 text-white text-center shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <Icon size={48} className="mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-2xl font-bold relative z-10">{label}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
