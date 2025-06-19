import mongoose, { Schema, Document, Types } from "mongoose";

export interface Icourse extends Document {
  Namecourse: string; // name of the course
  DescriptionCourse: string; // description of the course
  shortDescription: string; // short description of the course
  category: string; // category of the course
  level: "Beginner" | "Intermediate" | "Advanced"; // level of difficulty
  imageUrl: string; // image of the course
  duration: number; // Total course duration in minutes
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
  Instructor:string;
  InstructorInformation:string;
  videoUrl:string[]
  text:string[]
  quize:string[]

  
}

const courseSchema = new Schema<Icourse>({
  Namecourse: { type: String, required: true, trim: true },
  DescriptionCourse: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  category: { type: String, required: true, index: true },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
    index: true
  },
  imageUrl: { type: String, required: true },
  duration: { type: Number, default: 0 },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  prerequisites: [{ type: String }],
  price: { type: String, enum: ["Free", "Paid"], default: "Free" },
  rating: { type: Number, default: 0, min: 0, max: 5 }, // Fixed: single number
  learningOutcomes: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  totalLessons: { type: Number, default: 0 },
  totalQuizzes: { type: Number, default: 0 },
  enrollments: { type: Number, default: 0 },
  XpNumber: { type: Number, default: 0 },
  Instructor:{type:String},
  InstructorInformation:{type:String},
  videoUrl:[{ type: String }],
  text:[{ type: String }],
  quize:[{ type: String }],
    
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

export const courseModel = mongoose.model<Icourse>('Course', courseSchema);