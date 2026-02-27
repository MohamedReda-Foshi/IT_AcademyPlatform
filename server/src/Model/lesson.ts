// import mongoose, { Schema, Document, Types } from "mongoose";

// export interface ILesson extends Document {
//   NameLesson: string;
//   description?: string;
//   videoUrl?: string;
//   duration?: number;
//   text?: Types.ObjectId[];
//   video?: Types.ObjectId[];
//   quiz?: Types.ObjectId[];
//   price: "Free" | "Paid";
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Export the schema so it can be used in course model
// export const lessonSchema = new Schema<ILesson>({
//   NameLesson: { type: String, required: true },
//   description: { type: String },
//   videoUrl: { type: String },
//   duration: { type: Number, default: 0 },
//   text: [{ type: Schema.Types.ObjectId, ref: "Text" }],
//   video: [{ type: Schema.Types.ObjectId, ref: "Video" }],
//   quiz: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
//   price: { type: String, enum: ["Free", "Paid"], default: "Free" },

// }, {
//   timestamps: true
// });

// // Optional: Export as standalone model if needed elsewhere
// export const LessonModel = mongoose.model<ILesson>("Lesson", lessonSchema);