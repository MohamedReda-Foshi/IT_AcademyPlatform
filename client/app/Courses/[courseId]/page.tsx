import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/Button'
import  {fetchCourseById}  from '@/app/lib/api/coures'
import { Types } from 'mongoose';



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



export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const  {courseId}  = await params
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
    <div className='flex flex-row py-20 space-y-4 px-10 '>
    <div className=" flex-1 p-6 space-y-4">
      <h1 className="text-4xl font-bold">{datacourse.Namecourse}</h1>
      <p className="text-gray-500 mb-4">id: {datacourse.id}</p>

     

      <p>{datacourse.DescriptionCourse}</p>

      <Link href={`/Courses/${datacourse.id}/Lesson/${datacourse.id}`}>
      

        <Button button="Get Started" />
       
      </Link>

      <section>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>{datacourse.shortDescription ?? 'No overview available.'}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">What you will learn</h2>
        <ul className="list-disc pl-5">
          {datacourse.learningOutcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </section>
        </div>
          <div>

      <aside className="p-6 rounded-lg bg-red-600">
      <Image
        src={datacourse.imageUrl ?? '/default.png'}
        alt={datacourse.Namecourse}
        width={300}
        height={450}
        className="rounded-lg object-cover"
      />
        <h3 className="text-xl font-semibold mb-2">Course Details</h3>
        <p><strong>Duration:</strong> {datacourse.duration} hours</p>
        <p><strong>Level:</strong> {datacourse.level}</p>
        <p><strong>Category:</strong> {datacourse.category}</p>
        <p><strong>Lessons:</strong> {datacourse.totalLessons}</p>
        <p><strong>Quizzes:</strong> {datacourse.totalQuizzes}</p>
        <p><strong>Enrolled:</strong> {datacourse.enrollments}</p>
      </aside>
          </div>
    </div>
  )
}
