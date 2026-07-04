// lib/api/chapter.ts
import type { ChapterData } from '../../types/ChapterData';
import { Types } from 'mongoose';




export async function fetchChapterById(id: Types.ObjectId | string): Promise<ChapterData[]> {
  
  if(!id){
    // console.error('Invalid course ID provided:', id);
    return [];
  }
  try {
    const idString =id.toString()
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/getChapter/${idString}` )
        // console.log('Fetching chapters for courseId:', idString);

    if (!res.ok) {
      throw new Error(`Network response was not ok (${res.status})`);
    }
    const  data= await  res.json();
    return data;
  } catch (error) {
    console.log(`Error fetching chapters for course ${id}:`, error);
    return [];
  }
}



