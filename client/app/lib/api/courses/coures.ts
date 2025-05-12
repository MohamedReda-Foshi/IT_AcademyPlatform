// lib/api.js

import { CourseData } from '@/app/types/course'

///this get all courses card from the database
export async function fetchAllCourseFromExpr(): Promise<CourseData[]> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/CourseCard`);
      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching all courses:', error);
      return [];
    }
  }


export async function fetchHomeCourseFromExpr(): Promise<CourseData[]> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/CourseCardHomepage`);
      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching all courses:', error);
      return [];
    }
  }




/// this courses by id from the database
export async function fetchCourseById(id: string): Promise<CourseData[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/${id}`)
    if (!res.ok) {
      throw new Error(`Network response was not ok (${res.status})`)
    }
    return await res.json()
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error)
    return []
  }
}



//// this is a course page 

export async function fetchLessonById(id: string): Promise<CourseData[]> {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/${id}`);
      if (!res.ok) {
          throw new Error(`Network response was not ok  (${res.status})`);
      }
      return await res.json();
  } catch (error) {
      console.error('Error fetching course with id ${id}:', error);
      return [];
  }
} 

