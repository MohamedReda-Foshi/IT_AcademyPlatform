// lib/api.js

// import { CourseData } from '@/app/types/course'
import { LessonData } from '@/app/types/lesson';
import { type Course } from '@/app/types/course';

///this get all courses card from the database
export async function fetchAllCourseFromExpr(): Promise<Course[]> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/CourseCard`);
      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }
      // console.log('Fetching all courses', res.json());
      return await res.json();
    } catch (error) {
      console.error('Error fetching all courses:', error);
      return [];
    }
  }


export async function fetchHomeCourseFromExpr(): Promise<Course[]> {
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
export async function fetchCourseById(id: string): Promise<Course[]> {
  // console.log('Fetching course with id:', id);

  try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    if (!res.ok) {
      throw new Error(`Network response was not ok course (${res.status})`)
    }

    return  res.json();

  } catch (error) {
    console.error(`Error fetching course with id  ${id}:`, error);
    return [];
  }
}



export async function fetchLessonById(id: string): Promise<LessonData[]> {
  console.log('Fetching lesson with id:', id)
  try {
    // 2) Call your Express endpoint (replace host/port as needed)
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/lesson/${id}`)

    // 3) If the response isn’t “OK” (200–299), throw
    if (!res.ok) {
      throw new Error(`Network response was not ok (status: ${res.status})`)
    }

    // 4) Parse JSON and assert it matches LessonData[]
    
    return res.json()
  } catch (error) {
    console.error(`Fetch lesson error for id: ${id}`, error)
    return []
  }
}



//// this is a lesson page 





