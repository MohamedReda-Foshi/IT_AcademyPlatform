import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Users, TrendingUp, Play, BookOpen, Award } from 'lucide-react'
import { type CourseData } from "../types/course"

interface CoursesListProps {
  courses: CourseData[];          
}

export default function CoursesList({ courses }: CoursesListProps) {
  const defaultImage =
    'https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg'
  
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
      case 'intermediate':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
      case 'advanced':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/25'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4">
            Featured Courses
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our premium collection of courses designed to accelerate your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course._id} 
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl hover:shadow-red-500/20 transition-all duration-700 overflow-hidden border border-gray-800 hover:border-red-500/50 hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
              
              {/* Image Container with Enhanced Overlay */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  className="group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={course.imageUrl ?? defaultImage}
                  fill
                  priority
                  alt={course.Namecourse}
                  style={{ objectFit: 'cover' }}
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Popular Badge with Animation */}
                {course.rating >= 4.5 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl animate-pulse">
                    <TrendingUp size={14} />
                    HOT
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                {/* Title with Gradient */}
                <h3 className="text-2xl font-bold text-white leading-tight group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {course.Namecourse}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                  {course.shortDescription}
                </p>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold ${getLevelColor(course.level)} transform hover:scale-105 transition-transform duration-200`}>
                    <Award size={12} className="inline mr-1" />
                    {course.level.toUpperCase()}
                  </span>
                  <span className="bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-700 transition-colors duration-200">
                    <Clock size={12} />
                    {course.duration}h
                  </span>
                  <span className="bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:from-gray-600 hover:to-gray-700 transition-all duration-200">
                    <BookOpen size={12} />
                    {course.category}
                  </span>
                </div>

                {/* Enhanced Rating Section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.round(course.rating)
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                              : 'text-gray-600'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {course.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      (150+ reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users size={14} />
                    <span className="text-xs">2.5k+ enrolled</span>
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <div className="pt-6">
                  <Link
                    href={`/Courses/${course._id}`}
                    className="block group/btn"
                  >
                    <div className="relative w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-center transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-red-500/30 overflow-hidden">
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 rounded-2xl" />
                      <div className="relative flex items-center justify-center gap-2">
                        <Play size={16} fill="white" />
                        Start Learning Now
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Subtle inner border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Users className="text-red-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No courses available</h3>
              <p className="text-gray-400 text-lg">Check back later for new courses or try adjusting your filters.</p>
              <div className="mt-8">
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Browse All Categories
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}