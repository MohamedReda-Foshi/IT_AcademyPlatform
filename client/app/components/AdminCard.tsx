import React from 'react'
import Link from 'next/link';

interface AdminCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  stats?: string;
}
function AdminCard({ title, description, href, icon, stats }: AdminCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
            {icon}
          </div>
          {stats && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
        <div className="mt-4 flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
          Manage {title.toLowerCase()}
          <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default AdminCard