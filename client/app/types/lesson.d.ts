export interface LessonData {
  id: string;
  Namecourse: string;
  videoUrl?: string[];
  text?: string[];
  quize?: string[];
  learningOutcomes?: string[];
  instructorUserName?: string;
  totalLessons: number;
  totalQuizzes: number;
  enrollments: number;
  XpNumber: number;
  duration: number;
  instructorId?: string;
}
