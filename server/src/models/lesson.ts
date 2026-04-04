// import mongoose, { Schema, Document, Types } from "mongoose";

// export interface ILesson extends Document {
//   Namelesson: string;
//   description?: string;
//   videoUrl?: string;
//   duration?: number;
//   text?: Types.ObjectId[];
//   video?: Types.ObjectId[];
//   quize?: Types.ObjectId[];
//   price: "Free" | "Paid";
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Export the schema so it can be used in course model
// export const lessonSchema = new Schema<ILesson>({
//   Namelesson: { type: String, required: true },
//   description: { type: String },
//   videoUrl: { type: String },
//   duration: { type: Number, default: 0 },
//   text: [{ type: Schema.Types.ObjectId, ref: "Text" }],
//   video: [{ type: Schema.Types.ObjectId, ref: "Video" }],
//   quize: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
//   price: { type: String, enum: ["Free", "Paid"], default: "Free" },
  
// }, {
//   timestamps: true
// });

// // Optional: Export as standalone model if needed elsewhere
// export const LessonModel = mongoose.model<ILesson>("Lesson", lessonSchema);