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

export async function fetchLessonById(id: string): Promise<LessonData[]> {
  try {
    return await apiFetch<LessonData[]>(`/course/lesson/${id}`);
  } catch (error) {
    console.error(`Fetch lesson error for id: ${id}`, error);
    return [];
  }
}