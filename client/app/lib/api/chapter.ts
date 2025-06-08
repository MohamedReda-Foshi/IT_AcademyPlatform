// lib/api/chapter.ts
import type { ChapterData } from '../../types/ChapterData';
import { Types } from 'mongoose';




export async function fetchChapterById(id: Types.ObjectId | string): Promise<ChapterData[]> {
  
  if(!id){
    console.error('Invalid course ID provided:', id);
    return [];
  }
  try {
    const idstring =id.toString
    const res = await fetch(`http://localhost:8001/course/getChapter/${idstring}` )
        console.log('Fetching chapters for courseId:', idstring);

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



