"use client"
// app/courses/page.tsx
import CourseFilter from '../components/CourseFilter'
import CoursesList from '../components/CoursesList'
import { fetchAllCourseFromExpr } from '../lib/api/courses/coures'
import type { CourseData } from '../types/course'

export default async function CoursesPage() {
  let courses: CourseData[] = []
  try {
    courses = await fetchAllCourseFromExpr()
  } catch (err) {
    console.error(err)
    // You could render an error state here
  }

  const categories = ['Front-end', 'Back-end', 'Data Base','Web','AI']; 
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const handleFilterChange = (filters: any) => {
    // Handle filter changes here
  };

  return(
  <div className=" flex flex-row ">
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Courses</h1>
      <CourseFilter 
        categories={categories}
        levels={levels}
        onFilterChange={handleFilterChange}
      />
    </div>

    <div>

      <CoursesList courses={courses} />
    </div>
  </div>
   )
}
