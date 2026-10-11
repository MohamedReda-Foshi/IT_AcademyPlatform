
// app/courses/page.tsx
import CoursesList from '../components/CoursesList'
import { fetchAllCourseFromExpr } from '../lib/api/coures'
import type { CourseData } from '../types/course'
import { pageMetadata } from '../lib/seo'

export const metadata = pageMetadata(
  'Online IT Courses',
  'Explore TechLearn courses in programming, cloud computing, and other IT skills.',
  '/Courses',
)

export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
  let courses: CourseData[] = []
  try {
    courses = await fetchAllCourseFromExpr()
  } catch (err) {
    console.error(err)
    // You could render an error state here
  }

 

  return (
    <div className=" py-8">
      <div>
        <h1 className="text-3xl font-bold text-center mt-8 py-7">Courses</h1>


        <div className=' flex flex-row items-center justify-center'>
          <CoursesList courses={courses} />
        </div>
      </div>
    </div>
  )
}
