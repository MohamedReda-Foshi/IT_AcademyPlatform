import { Router } from "express";
import { questionModel } from "../Model/question";
import { auth } from '../middlewares/auth';
import { role } from '../middlewares/role_auth';


const router = Router();

router.get("/getQuestions", auth, role("admin","user"), async (req, res) => {
    try {
        const { idQuiz } = req.body;
        const questions = await questionModel.find()

        res.status(200).json({
            questions: questions,
        });
    } catch(err) {
        console.log("Error: " + err);
    }
});

router.post("/addQuestion", auth, role("admin"), async (req, res) => {
    try {
        const { question, questionType, answerSelectionType, answers, correctAnswer, messageForCorrectAnswer, messageForIncorrectAnswer, explanation, point, idQuiz } = req.body;

        const newQuestion = await questionModel.create({
            question,
            questionType,
            answerSelectionType,
            answers,
            correctAnswer,
            messageForCorrectAnswer,
            messageForIncorrectAnswer,
            explanation,
            point,
            idQuiz,
        });
        
        res.status(200).json({
            question: newQuestion,
        });

    } catch(err) {
        console.log("Error: " + err);
    }
});

export default router;