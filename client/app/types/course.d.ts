// types/course.d.ts


export interface CourseData {
  _id: string;
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
  }
  