import mongoose, { Schema, Document, Types } from "mongoose";

export interface Ichapter extends Document {
  ChapterTitile: string; // name of the course
  order: number; // order of the chapter
  videoUrl?: string; // video URL of the lesson
  text?: string; // text content of the chapter
  quize?: string; // text content of the chapter;
  courseId?: Types.ObjectId; // Reference to the course this chapter belongs to

  
}

const courseSchema = new Schema<Ichapter>({
    ChapterTitile: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    videoUrl: { type: String, default: null }, // Optional video URL
    text: { type: String, default: null }, // Optional text content
    quize: { type: String, default: null }, // Optional quiz content
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the course
    
});

export const chapterModel = mongoose.model<Ichapter>('Chapter', courseSchema);