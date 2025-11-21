import React from 'react'
import { fetchLessonById } from '@/app/lib/api/lesson'
import {  BookOpen, Clock, Users, FileText, Award, Brain, CheckCircle } from 'lucide-react'
import type { LessonData } from '@/app/types/lesson'
import Chapter from '@/app/components/Chapter'
import { redirect } from 'next/navigation';
import { authOptions } from "../../../../lib/nextAuth"; // adjust your path
import { getServerSession, type NextAuthOptions } from "next-auth";



export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const { lessonId } = await params
    const session = await getServerSession(authOptions as NextAuthOptions);

    if (!session) {
    // auto-redirect to /api/auth/signin with callback back here
    const returnTo = encodeURIComponent(`/Courses/Lesson${params}`);
    redirect(`/auth/Login?returnTo=${returnTo}`);
  }





  let lesson: LessonData | null = null
  
 try {
  lesson = await fetchLessonById(lessonId) 
  
  
 } catch (error) {
   console.log('Failed to fetch lesson:', error)

 }

 if (!lesson) {
   return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
       <div className="text-red-500 text-xl">Lesson not </div>
     </div>
   )
 }

 //Since this is SSR, we render progress and completed state as 0 and 0-of-total.
  const progress = 0
  const completedCount = 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black py py-9">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 mb-8 border border-red-500/30">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Course Lesson</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {lesson.Namecourse}
                <br/>
              </h1>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{lesson.enrollments} students</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Award className="w-4 h-4" />
                  <span>{lesson.XpNumber} XP</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{lesson.students} students enrolled</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Brain className="w-4 h-4" />
                  <span>{lesson.totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FileText className="w-4 h-4" />
                  <span>{lesson.totalQuizzes} Quizzes</span>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-gray-400 text-sm">Course Progress</div>
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="text-center text-gray-300 text-sm">
                  {completedCount} of {lesson.totalLessons} sections completed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" gap-8">
          {/* Lesson Content */}
          

          {/* Learning Outcomes */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 overflow-hidden">


             
             <Chapter params={ lesson.id }/>

              <div className="p-6">
                <ul className="space-y-4">
                 {lesson.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            
          </div>


          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="font-semibold text-white mb-4">Your Instructor</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">SC</span>
                </div>
                <div>
                  <div className="font-medium text-white">{lesson.instructorUserName}</div>
                  <div className="text-slate-400 text-sm">Senior Developer</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mt-4">
                Full-stack developer with 8+ years of experience building scalable web applications with React and Next.js.
              </p>
            </div>
            
        </div>
      </div>
    </div>
  )
}
