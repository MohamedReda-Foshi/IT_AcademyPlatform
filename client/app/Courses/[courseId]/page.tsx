import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/Button'
import { fetchCourseById } from '@/app/lib/api/courses/coures'

export interface CourseData {
  id:               string
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

type Props = {
  params: { courseId: string }
}

export default async function CoursePage({ params }: Props) {
  const { courseId } = params
  let course: CourseData[0] | null = null 

  try {
    course = await fetchCourseById(courseId)
  } catch (error) {
    console.log('Failed to fetch course:', error)
  }

  if (!course) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Course not found.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-row py-20 px-8'>
    <div className=" mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{course.Namecourse}</h1>

     

      <p>{course.DescriptionCourse}</p>

      <Link href={`/Courses/${course.id}/Lesson/${course.id}`}>
      

        <Button button="Get Started" />
       
      </Link>

      <section>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>{course.shortDescription ?? 'No overview available.'}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">What you will learn</h2>
        <ul className="list-disc pl-5">
          {course.learningOutcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </section>
        </div>
          <div>

      <aside className="p-6 rounded-lg bg-red-600">
      <Image
        src={course.imageUrl ?? '/default.png'}
        alt={course.Namecourse}
        width={300}
        height={450}
        className="rounded-lg object-cover"
      />
        <h3 className="text-xl font-semibold mb-2">Course Details</h3>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Lessons:</strong> {course.totalLessons}</p>
        <p><strong>Quizzes:</strong> {course.totalQuizzes}</p>
        <p><strong>Enrolled:</strong> {course.enrollments}</p>
      </aside>
          </div>
    </div>
  )
}
