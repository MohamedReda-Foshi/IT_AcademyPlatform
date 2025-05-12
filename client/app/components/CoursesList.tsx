import React from 'react'
import Button from './Button'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { type CourseData } from "../types/course"


interface CoursesListProps {
  courses: CourseData[];          
}

export default function CoursesList({ courses }: CoursesListProps) {
  const defaultImage =
    'https://tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg'

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Link 
              key={course._id} 
              href={`/Courses/${course._id}`}    
            >
              <div className="flex flex-col h-full bg-black rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    className="rounded-t-xl group-hover:scale-105 transition duration-300"
                    src={course.imageUrl ?? defaultImage}
                    fill
                    priority
                    alt={course.Namecourse}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex flex-col gap-4 p-6 flex-grow">
                  <h3 className="text-xl text-red-500 font-bold mb-2">
                    {course.Namecourse}
                  </h3>
                  <p className="text-white line-clamp-2">
                    {course.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {course.level}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {course.duration} hours
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.round(course.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {course.rating}/5
                    </span>
                  </div>
                  <Button button="Enroll" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

