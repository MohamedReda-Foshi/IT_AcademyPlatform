// types/course.d.ts
export interface CourseData {
  _id: number;
  
  Namecourse: string;
  DescriptionCourse: string;
  shortDescription?: string;
  category: string;
  level: string;
  duration: number;
  XpNumber?: number;
  rating: number;
  imageUrl: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
  totalLessons?: number;
  totalQuizzes?: number;
  enrollments?: number;
  createdAt?: string;
  updatedAt?: string;
  filters:string,
  modules: Types.ObjectId[]; // References to module documents
  prerequisites: string[];
  learningOutcomes: string[];
  rating: number; // rating of the course
  price: "Free" | "Paid"; // type of the course
  createdAt: Date; // Timestamp of creation
  updatedAt: Date; // Timestamps for when the course was created and last updated
  isPublished: boolean; // is the course published?
  totalLessons: number; // Total number of lessons in the course
  totalQuizzes: number; // Total number of quizzes in the course
  enrollments: number; // number of enrollments
  XpNumber: number; // XP number for the course
  videoUrl?: Types.ObjectId[]; // video URL of the lesson
  text?: Types.ObjectId[];
  quize?: Types.ObjectId[];
  o:number
  i:number
  }
  