  import { LessonData } from '@/app/types/lesson'



  const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || '';
  }
  return '';
};

// Helper function to create headers with auth
const createAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

  export async function fetchLessonById(id: string): Promise<LessonData[]> {
    try {
     //  2) Call your Express endpoint (replace host/port as needed)
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/lesson/${id}`)

      // 3) If the response isn’t “OK” (200–299), throw
      if (!res.ok) {
        
     
        throw new Error(`Network response was not ok (status: ${res.status})`)
      }

       //4) Parse JSON and assert it matches LessonData[]
      const data: LessonData[] = await res.json()
      return data
    } catch (error) {
      console.error(`Fetch lesson error for id: ${id}`, error)
      return []
    }
  }
