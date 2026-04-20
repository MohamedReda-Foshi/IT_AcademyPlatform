import { Router } from 'express';
import {quizModel} from '../Model/quiz';


const router = Router();

router.get("/getQuizzes", async (req, res) => {
    try {
        const { idCourse } = req.body;
        const quizzes = await quizModel.find().where(idCourse);
        res.status(200).send(quizzes);
    } catch (error) {
        console.error("Failed to fetch quizzes", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/addQuiz", async (req, res) => {
    try {
        const { title, synopsis, nbrOfQuestions, questions, courseId } = req.body;
        // const newQuiz = new quizModel({
        //     QuizTitle,
        //     nbrOfQuestions,
        //     synopsis,
        //     questions,
        //     idCourse,
        // });
        // const savedQuiz = await newQuiz.save();
        const savedQuiz = await quizModel.create({
            title,
            synopsis,
            nbrOfQuestions,
            questions,
            courseId,
        });
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error("Failed to add quiz", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;