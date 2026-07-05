import mongoose, { Schema, Document, Types } from "mongoose";

export interface Icourse extends Document {
  Namecourse: string;
  DescriptionCourse: string;
  shortDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  duration: number;
  modules: Types.ObjectId[];
  prerequisites: string[];
  rating: number;
  price: "Free" | "Paid";
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  enrollments: number;
  instructorId: string;
  Instructor: string;
  InstructorInformation: string;
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
    index: true},
  imageUrl: { type: String, required: true },
  duration: { type: Number, default: 0 },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  prerequisites: [{ type: String }],
  price: { type: String, enum: ["Free", "Paid"], default: "Free" },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isPublished: { type: Boolean, default: false },
  enrollments: { type: Number, default: 0 },
  instructorId: { type: String, index: true },
  Instructor:{type:String},
  InstructorInformation:{type:String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const courseModel = mongoose.model<Icourse>('Course', courseSchema);
