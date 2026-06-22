export interface CourseData {
  id: string;
  Namecourse: string;
  DescriptionCourse: string;
  shortDescription: string;
  category: string;
  level: string;
  duration: number;
  XpNumber: number;
  AchievementsIcon: string;
  Icon: string;
  modules: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  rating: number;
  totalLessons: number;
  totalQuizzes: number;
  enrollments: number;
  imageUrl?: string;
  o: number;
  i: number;
}

export interface Course {
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
  filters: string;
  modules: string[];
  price: "Free" | "Paid";
  isPublished: boolean;
  videoUrl?: string[];
  text?: string[];
  quize?: string[];
  InstructorInformation: string;
  Instructor: string;
  o: number;
  i: number;
}
  