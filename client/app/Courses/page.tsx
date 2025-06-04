
// app/courses/page.tsx
import CoursesList from '../components/CoursesList'
import { fetchAllCourseFromExpr } from '../lib/api/coures'
import type { CourseData } from '../types/course'

export default async function CoursesPage() {
  let courses: CourseData[] = []
  try {
    courses = await fetchAllCourseFromExpr()
  } catch (err) {
    console.error(err)
    // You could render an error state here
  }

 

  return (
    <div className=" flex flex-row ">
      <div>
        <h1 className="text-3xl font-bold text-center mt-8">Courses</h1>


        <div>
          <CoursesList courses={courses} />
        </div>
      </div>
    </div>
  )
}