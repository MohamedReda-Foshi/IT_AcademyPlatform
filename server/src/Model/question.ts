import mongoose, {Schema, Document, Types} from "mongoose";

export interface IQuestion extends Document {
    question: string;
    questionType: string;
    answerSelectionType: string;
    answers: string[];
    correctAnswer: string;
    messageForCorrectAnswer: string;
    messageForIncorrectAnswer: string;
    explanation: string;
    point: string;
    idQuiz: Types.ObjectId[];
}

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    questionType: { type: String, required: true },
    answerSelectionType: { type: String, required: true },
    answers: { type: [Schema.Types.String], required: true },
    correctAnswer: { type: String, required: true },
    messageForCorrectAnswer: { type: String, required: true },
    messageForIncorrectAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    point: { type: String, required: true },
    idQuiz: [{ type: Schema.Types.ObjectId, ref: "Quiz", required: true }],
});

export const questionModel = mongoose.model<IQuestion>('Question', questionSchema);
// title: { type: String, required: true },
// synopsis: { type: String, required: true },
// nbrOfQuestions: { type: Number, required: true },
// questions: { type: [Schema.Types.Array], required: true },
// courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the course