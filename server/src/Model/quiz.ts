import mongoose, {Schema, Document, Types} from "mongoose";
// import { IQuestion } from "./question";

export interface IQuiz extends Document {
    title: string,
    synopsis: string,
    nbrOfQuestions: number,
    questions: Types.ObjectId[],
    courseId: Types.ObjectId
}

const quizSchema = new Schema<IQuiz>({
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    nbrOfQuestions: { type: Number, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question", default: null }], // Reference to the question
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, default: null }, // Reference to the course
});

export const quizModel = mongoose.model<IQuiz>('Quiz', quizSchema);