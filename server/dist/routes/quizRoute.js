"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_1 = require("../models/quiz");
const lesson_1 = require("../models/lesson");
const course_1 = require("../models/course");
const chapter_1 = require("../models/chapter");
const roleauth_1 = require("../middlewares/roleauth");
const auth_1 = require("../middlewares/auth");
const csrf_1 = require("../middlewares/csrf");
const sanitize_1 = require("../middlewares/sanitize");
const router = (0, express_1.Router)();
router.get("/byChapter/:chapterId", auth_1.auth, (0, roleauth_1.role)("admin", "instructor", "user"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(chapterId)) {
        res.status(400).json({ message: "Invalid chapter ID" });
        return;
    }
    try {
        const quiz = yield quiz_1.quizModel.findOne({ chapterId }).select("-questions.correctAnswer");
        if (!quiz) {
            res.status(404).json({ message: "No quiz found for this chapter" });
            return;
        }
        res.json(quiz);
    }
    catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/byLesson/:lessonId", auth_1.auth, (0, roleauth_1.role)("admin", "instructor", "user"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(lessonId)) {
        res.status(400).json({ message: "Invalid lesson ID" });
        return;
    }
    try {
        const quizzes = yield quiz_1.quizModel.find({ lessonId }).select("-questions.correctAnswer");
        res.json(quizzes);
    }
    catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/create", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { title, chapterId, lessonId, questions, passingScore } = req.body;
    if (!chapterId || !mongoose_1.default.Types.ObjectId.isValid(chapterId)) {
        res.status(400).json({ message: "Invalid chapter ID" });
        return;
    }
    if (!lessonId || !mongoose_1.default.Types.ObjectId.isValid(lessonId)) {
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
        const lesson = yield lesson_1.lessonModel.findById(lessonId);
        if (!lesson) {
            res.status(404).json({ message: "Lesson not found" });
            return;
        }
        const chapter = yield chapter_1.chapterModel.findById(chapterId);
        if (!chapter || ((_a = chapter.lessonId) === null || _a === void 0 ? void 0 : _a.toString()) !== lessonId) {
            res.status(400).json({ message: "Chapter does not belong to lesson" });
            return;
        }
        const course = yield course_1.courseModel.findById(lesson.courseId);
        const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        const isOwner = course && course.instructorId === ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const existing = yield quiz_1.quizModel.findOne({ chapterId });
        if (existing) {
            res.status(409).json({ message: "Quiz already exists for this chapter. Use PUT to update." });
            return;
        }
        const quiz = new quiz_1.quizModel({
            title,
            chapterId,
            lessonId,
            questions,
            passingScore: passingScore || 60,
        });
        const saved = yield quiz.save();
        res.status(201).json(saved);
    }
    catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.put("/update/:id", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid quiz ID" });
        return;
    }
    try {
        const quiz = yield quiz_1.quizModel.findById(id);
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        const lesson = yield lesson_1.lessonModel.findById(quiz.lessonId);
        const course = lesson ? yield course_1.courseModel.findById(lesson.courseId) : null;
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course && course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const { title, questions, passingScore } = req.body;
        const updates = {};
        if (title !== undefined)
            updates.title = title;
        if (questions !== undefined)
            updates.questions = questions;
        if (passingScore !== undefined)
            updates.passingScore = passingScore;
        updates.updatedAt = new Date();
        const updated = yield quiz_1.quizModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        res.json(updated);
    }
    catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/delete/:id", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid quiz ID" });
        return;
    }
    try {
        const quiz = yield quiz_1.quizModel.findById(id);
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        const lesson = yield lesson_1.lessonModel.findById(quiz.lessonId);
        const course = lesson ? yield course_1.courseModel.findById(lesson.courseId) : null;
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course && course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        yield quiz_1.quizModel.findByIdAndDelete(id);
        res.json({ message: "Quiz deleted" });
    }
    catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/submit/:id", auth_1.auth, (0, roleauth_1.role)("admin", "instructor", "user"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid quiz ID" });
        return;
    }
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ message: "answers array is required" });
        return;
    }
    try {
        const quiz = yield quiz_1.quizModel.findById(id);
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
            if (isCorrect)
                earnedPoints += q.points;
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
    }
    catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
