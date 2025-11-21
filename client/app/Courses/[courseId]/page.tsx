import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/Button'
import  {fetchCourseById}  from '@/app/lib/api/coures'
import { Types } from 'mongoose';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/nextAuth"; // adjust your path
import { redirect } from 'next/navigation';
import type { NextAuthOptions } from "next-auth";

export interface CourseData {
  id:               Types.ObjectId
  Namecourse:       string
  DescriptionCourse:string
  shortDescription: string
  category:         string
  level:            string
  duration:         number
  XpNumber:         number
  AchievementsIcon: string
  Icon:             string
  modules:          string[]
  prerequisites:    string[]
  learningOutcomes: string[]
  rating:           number
  totalLessons:     number
  totalQuizzes:      number
  enrollments:      number
  imageUrl?:        string

  o:number
  i:number
}





export default async function CoursePage(
  { params }: 
  { params: Promise<{ courseId: string }>
 }) {
  const  {courseId}  = await params

    const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session) {
    // auto-redirect to /api/auth/signin with callback back here
    const returnTo = encodeURIComponent(`/Courses/${courseId}`);
    redirect(`/auth/Login?returnTo=${returnTo}`);
  }


  let datacourse: CourseData | null = null 
  console.log('Course Page - courseId:', courseId); 

  try {
    datacourse = await fetchCourseById(courseId)
  } catch (error) {
    console.log('Failed to fetch course:', error)
  }

  if (!datacourse) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Course not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">{datacourse.Namecourse}</h1>
            <p className="text-lg text-white mb-6">{datacourse.DescriptionCourse}</p>
            <Link href={`/Courses/${datacourse.id}/Lesson/${datacourse.id}`}>
              <Button button="Get Started"  />
            </Link>
          </div>

          <div className="mb-8 bg-black p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Overview</h2>
            <p className="text-white">{datacourse.shortDescription ?? 'No overview available.'}</p>
          </div>

          <div className="bg-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">What you will learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {datacourse.learningOutcomes.map((o, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:w-80 lg:w-96 flex-shrink-0">
          <aside className="bg-black rounded-xl shadow-md overflow-hidden sticky top-6 border border-gray-200">
            <div className="relative h-48 w-full border-b border-gray-200">
              <Image
                src={datacourse.imageUrl ?? '/default.png'}
                alt={datacourse.Namecourse}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-600 border-b border-gray-200 pb-2">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-white">Duration</span>
                  <span className="text-red-600 font-medium">{datacourse.duration} hours</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-white">Level</span>
                  <span className="text-red-600 font-medium">{datacourse.level}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-white">Category</span>
                  <span className="text-red-600 font-medium">{datacourse.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-white">Lessons</span>
                  <span className="text-red-600 font-medium">{datacourse.totalLessons}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-white">Quizzes</span>
                  <span className="text-red-600 font-medium">{datacourse.totalQuizzes}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white">Enrolled</span>
                  <span className="text-red-600 font-medium">{datacourse.enrollments}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
