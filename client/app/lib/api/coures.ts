// lib/api.js

import { CourseData } from '@/app/types/course';
import { LessonData } from '@/app/types/lesson';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Network response was not ok (${res.status})`);
  }

  return res.json();
}

async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as Record<string, string>).message || `POST failed (${res.status})`);
  }

  return res.json();
}

async function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as Record<string, string>).message || `PUT failed (${res.status})`);
  }
  return res.json();
}

async function apiDelete(endpoint: string): Promise<void> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as Record<string, string>).message || `DELETE failed (${res.status})`);
  }
}

export async function createCourse(data: Record<string, unknown>): Promise<unknown> {
  return apiPost('/course/AddCourse', data);
}

export async function updateCourse(id: string, data: Record<string, unknown>): Promise<unknown> {
  return apiPut(`/course/UpdateCourse/${id}`, data);
}

export async function deleteCourse(id: string): Promise<void> {
  return apiDelete(`/course/DeleteCourse/${id}`);
}

export async function fetchMyCourses(): Promise<unknown[]> {
  return apiFetch('/instructor/my-courses');
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