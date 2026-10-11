import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface IQuiz extends Document {
  title: string;
  chapterId: Types.ObjectId;
  lessonId: Types.ObjectId;
  questions: IQuizQuestion[];
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const quizQuestionSchema = new Schema<IQuizQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true, minlength: 2 },
  correctAnswer: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, default: 1 },
}, { _id: false });

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true, trim: true },
  chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  questions: { type: [quizQuestionSchema], required: true, minlength: 1 },
  passingScore: { type: Number, required: true, default: 60 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const quizModel = mongoose.model<IQuiz>("Quiz", quizSchema);
