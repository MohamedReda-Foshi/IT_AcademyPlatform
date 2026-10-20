import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { quizModel } from "../models/quiz";
import { lessonModel } from "../models/lesson";
import { courseModel } from "../models/course";
import { chapterModel } from "../models/chapter";
import { role } from "../middlewares/roleauth";
import { auth } from "../middlewares/auth";
import { csrfMiddleware } from "../middlewares/csrf";
import { sanitizeMiddleware } from "../middlewares/sanitize";

const router = Router();

router.get("/byChapter/:chapterId", auth, role("admin", "instructor", "user"),
  async (req: Request, res: Response): Promise<void> => {
    const { chapterId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      res.status(400).json({ message: "Invalid chapter ID" });
      return;
    }
    try {
      const quiz = await quizModel.findOne({ chapterId }).select("-questions.correctAnswer");
      if (!quiz) {
        res.status(404).json({ message: "No quiz found for this chapter" });
        return;
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/byLesson/:lessonId", auth, role("admin", "instructor", "user"),
  async (req: Request, res: Response): Promise<void> => {
    const { lessonId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      res.status(400).json({ message: "Invalid lesson ID" });
      return;
    }
    try {
      const quizzes = await quizModel.find({ lessonId }).select("-questions.correctAnswer");
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/create", auth, role("admin", "instructor"), csrfMiddleware, sanitizeMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { title, chapterId, lessonId, questions, passingScore } = req.body;

    if (!chapterId || !mongoose.Types.ObjectId.isValid(chapterId)) {
      res.status(400).json({ message: "Invalid chapter ID" });
      return;
    }
    if (!lessonId || !mongoose.Types.ObjectId.isValid(lessonId)) {
      res.status(400).json({ message: "Invalid lesson ID" });
      return;
    }
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ message: "Title and at least one question are required" });
      return;
    }

    for (const q of questions) {
      if (!q || typeof q.question !== "string" || !Array.isArray(q.options) || q.options.length < 2 || q.correctAnswer === undefined) {
        res.status(400).json({ message: "Each question needs: question text, 2+ options, and correctAnswer index" });
        return;
      }
    }

    try {
      const lesson = await lessonModel.findById(lessonId);
      if (!lesson) {
        res.status(404).json({ message: "Lesson not found" });
        return;
      }

      const chapter = await chapterModel.findById(chapterId);
      if (!chapter || chapter.lessonId?.toString() !== lessonId) {
        res.status(400).json({ message: "Chapter does not belong to lesson" });
        return;
      }

      const course = await courseModel.findById(lesson.courseId);
      const isAdmin = req.user?.role === "admin";
      const isOwner = course && course.instructorId === req.user?.id;
      if (!isAdmin && !isOwner) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const existing = await quizModel.findOne({ chapterId });
      if (existing) {
        res.status(409).json({ message: "Quiz already exists for this chapter. Use PUT to update." });
        return;
      }

      const quiz = new quizModel({
        title,
        chapterId,
        lessonId,
        questions,
        passingScore: passingScore || 60,
      });
      const saved = await quiz.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.put("/update/:id", auth, role("admin", "instructor"), csrfMiddleware, sanitizeMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid quiz ID" });
      return;
    }

    try {
      const quiz = await quizModel.findById(id);
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }

      const lesson = await lessonModel.findById(quiz.lessonId);
      const course = lesson ? await courseModel.findById(lesson.courseId) : null;
      const isAdmin = req.user?.role === "admin";
      const isOwner = course && course.instructorId === req.user?.id;
      if (!isAdmin && !isOwner) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const { title, questions, passingScore } = req.body;
      const updates: Record<string, unknown> = {};
      if (title !== undefined) updates.title = title;
      if (questions !== undefined) updates.questions = questions;
      if (passingScore !== undefined) updates.passingScore = passingScore;
      updates.updatedAt = new Date();

      const updated = await quizModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      res.json(updated);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete("/delete/:id", auth, role("admin", "instructor"), csrfMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid quiz ID" });
      return;
    }

    try {
      const quiz = await quizModel.findById(id);
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }

      const lesson = await lessonModel.findById(quiz.lessonId);
      const course = lesson ? await courseModel.findById(lesson.courseId) : null;
      const isAdmin = req.user?.role === "admin";
      const isOwner = course && course.instructorId === req.user?.id;
      if (!isAdmin && !isOwner) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      await quizModel.findByIdAndDelete(id);
      res.json({ message: "Quiz deleted" });
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/submit/:id", auth, role("admin", "instructor", "user"),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid quiz ID" });
      return;
    }

    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ message: "answers array is required" });
      return;
    }

    try {
      const quiz = await quizModel.findById(id);
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }

      let totalPoints = 0;
      let earnedPoints = 0;
      const results = quiz.questions.map((q, i) => {
        totalPoints += q.points;
        const userAnswer = answers[i];
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) earnedPoints += q.points;
        return {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userAnswer,
          isCorrect,
          points: q.points,
        };
      });

      const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      const passed = score >= quiz.passingScore;

      res.json({
        quizId: quiz._id,
        title: quiz.title,
        score,
        earnedPoints,
        totalPoints,
        passingScore: quiz.passingScore,
        passed,
        results,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
