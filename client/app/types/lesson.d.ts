// types/lesson.d.ts 

export interface LessonData {
 
  _id: number;
  
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