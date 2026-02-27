import { LessonData } from '@/app/types/lesson';
// Helper function to create headers with auth


  export async function fetchLessonById(id: string): Promise<LessonData[]> {
    try {

      // console.log("Id course from lesson file instead fetchLessonById fun :" + id);
     //  2) Call your Express endpoint (replace host/port as needed)
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/lesson/${id}`);
      // console.log('Fetching lesson with id:', res);

      // 3) If the response isn’t “OK” (200–299), throw
      if (!res.ok) {
        throw new Error(`Network response was not ok (status: ${res.status})`);
      }

       //4) Parse JSON and assert it matches LessonData[]
      const data: LessonData[] = await res.json();
      // console.log(data);
      return data as LessonData[];

    } catch (error) {
      console.error(`Fetch lesson error for id: ${id}`, error);
      return [] as LessonData[];
    }
  }
