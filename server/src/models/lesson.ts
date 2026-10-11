import mongoose, { Schema, Document, Types } from "mongoose";

export interface Ilesson extends Document {
  courseId: Types.ObjectId;
  Namecourse: string;
  videoUrl: string[];
  text: string[];
  quize: string[];
  learningOutcomes: string[];
  totalLessons: number;
  totalQuizzes: number;
  enrollments: number;
  XpNumber: number;
  duration: number;
  instructorId: string;
  Instructor: string;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<Ilesson>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
  Namecourse: { type: String, required: true, trim: true },
  videoUrl: [{ type: String }],
  text: [{ type: String }],
  quize: [{ type: String }],
  learningOutcomes: [{ type: String }],
  totalLessons: { type: Number, default: 0 },
  totalQuizzes: { type: Number, default: 0 },
  enrollments: { type: Number, default: 0 },
  XpNumber: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  instructorId: { type: String },
  Instructor: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const lessonModel = mongoose.model<Ilesson>("Lesson", lessonSchema);
