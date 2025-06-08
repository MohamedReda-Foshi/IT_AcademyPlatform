// types/lesson.d.ts 
import { Types } from 'mongoose';
export interface LessonData {
 
  id: Types.ObjectId ; // Unique identifier for the lesson
  ChapterId: string;
  Namecourse: string
  
    videoUrl?: string[]
    text?: string[]
    quiz?: string[]
        learningOutcomes?: string[]
        instructorUserName?: string;

  
  sections:[
    {
       title: string;
       duration?: string;
       type?: string;
       description?: string;
       content?: {
         video?: string;
         text?: string;

       };
    }
  ]
  totalLessons: number;
  totalQuizzes: number;
  enrollments: number;
  XpNumber: number;
  duration: number
  level: string;
  category: string;
  students: string;
  instructor: string;
  
}