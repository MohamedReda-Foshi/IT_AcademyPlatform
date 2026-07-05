import mongoose, { Schema, Document, Types } from "mongoose";

export interface Ichapter extends Document {
  ChapterTitle: string;
  order: number;
  videoTitle:string;
  videoUrl?: string;
  textTitle:string;
  text?: string[];
  quize?: string;
  filename:string;
  filedata:string;
  lessonId?: Types.ObjectId;
}

const chapterSchema = new Schema<Ichapter>({
    ChapterTitle: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    videoTitle:{type:String,default: null },
    videoUrl: { type: String, default: null },
    textTitle:{type:String,default: null },
    text: {type: [String], default: null },
    quize: { type: String, default: null },
    filename: { type: String, default: null },
    filedata: { type: String, default: null },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
});

export const chapterModel = mongoose.model<Ichapter>('Chapter', chapterSchema);
