import React from 'react'
import { fetchLessonById } from '@/app/lib/api/lesson'
import { PlayCircle, BookOpen, Clock, Users, Star, FileText, Video, Award, Brain, CheckCircle } from 'lucide-react'
import type { LessonData } from '@/app/types/lesson'



  
  
  


export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lesson Content */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 overflow-hidden">
            <div className="p-6 border-b border-red-500/30 bg-red-900/20">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-red-400" />
                Lesson Content
              </h2>
            </div>

            <div className="p-6">
              {lesson.videoUrl && lesson.videoUrl.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-400" />
                    Video Content
                  </h3>
                  <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center border border-red-500/30">
                    <div className="text-center">
                      <PlayCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                          <video width="320" height="240" controls preload="none">
                            <source src="/path/to/video.mp4" type="video/mp4" />
                            <track
                              src="/path/to/captions.vtt"
                              kind="subtitles"
                              srcLang="en"
                              label="English"
                            />
                            Your browser does not support the video tag.
                          </video>
                    </div>
                  </div>
                </div>
              )}

              {lesson.text && lesson.text.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-400" />
                    Reading Material
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    {lesson.text.map((text, index) => (
                      <div
                        key={index}
                        className="text-gray-300 leading-relaxed whitespace-pre-line mb-4"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lesson.quiz && lesson.quiz.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-red-400" />
                    Quiz Section
                  </h3>
                  <div className="space-y-4">
                    {lesson.quiz.map((quizId, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                      >
                        <p className="text-white font-medium mb-2">
                          Quiz {index + 1}
                        </p>
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                          Start Quiz
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 overflow-hidden">
            <div className="p-6 border-b border-red-500/30 bg-red-900/20">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                <Star className="w-6 h-6 text-red-400" />
                Chapter              
                
              </h2>
            </div>

             
              If you have learning outcomes or prerequisites to render, insert them here.
              For example:

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
