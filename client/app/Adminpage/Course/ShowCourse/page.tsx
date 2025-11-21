import InvoiceTable from '@/app/components/InvoiceTable'
import React from 'react'
import type { CourseData } from '../../../types/course'
import { fetchAllCourseFromExprAdmin } from '@/app/lib/api/admin'

export default async function page() {
  
  
    let courses: CourseData[] = []
    try {
      courses = await fetchAllCourseFromExprAdmin()
      console.log("this are courses admin",courses);
    } catch (err) {
      console.log("error in courses page",err)
      // You could render an error state here
    }

    return (
    <div className='py-20'>
        <InvoiceTable
        courses={courses}
    
    />
    </div>
  )
}