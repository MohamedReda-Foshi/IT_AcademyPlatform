// lib/api.js

import { CourseData } from '@/app/types/course';
import { LessonData } from '@/app/types/lesson';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include', // send cookies automatically
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Network response was not ok (${res.status})`);
  }

  return res.json();
}

/// get all courses card from the database
export async function fetchAllCourseFromExpr(): Promise<CourseData[]> {
  try {
    return await apiFetch<CourseData[]>('/course/CourseCard');
  } catch (error) {
    console.error('Error fetching all courses:', error);
    return [];
  }
}

export async function fetchHomeCourseFromExpr(): Promise<CourseData[]> {
  try {
    return await apiFetch<CourseData[]>('/course/CourseCardHomepage');
  } catch (error) {
    console.error('Error fetching homepage courses:', error);
    return [];
  }
}

/// get course by id
export async function fetchCourseById(id: string): Promise<CourseData[]> {
  console.log('Fetching course with id:', id);

  try {
    return await apiFetch<CourseData[]>(`/course/${id}`);
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    return [];
  }
}

/// get lesson by id
export async function fetchLessonById(id: string): Promise<LessonData[]> {
  console.log('Fetching lesson with id:', id);

  try {
    return await apiFetch<LessonData[]>(`/course/lesson/${id}`);
  } catch (error) {
    console.error(`Fetch lesson error for id: ${id}`, error);
    return [];
  }
}