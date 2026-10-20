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
const chapter_1 = require("../models/chapter");
const lesson_1 = require("../models/lesson");
const course_1 = require("../models/course");
const roleauth_1 = require("../middlewares/roleauth");
const auth_1 = require("../middlewares/auth");
const csrf_1 = require("../middlewares/csrf");
const sanitize_1 = require("../middlewares/sanitize");
const router = (0, express_1.Router)();
router.get("/getChapter/:lessonId", auth_1.auth, (0, roleauth_1.role)("admin", "instructor", "user"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(lessonId)) {
        res.status(400).json({ message: "Invalid lesson ID format" });
        return;
    }
    try {
        const chapters = yield chapter_1.chapterModel
            .find({ lessonId })
            .sort({ order: 1 });
        res.json(chapters);
    }
    catch (error) {
        console.error("Error fetching chapters:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/addChapter", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { ChapterTitle, order, videoUrl, videoTitle, textTitle, text, quize, filename, filedata, lessonId } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(lessonId)) {
        res.status(400).json({ message: "Invalid lesson ID format" });
        return;
    }
    try {
        const lesson = yield lesson_1.lessonModel.findById(lessonId);
        if (!lesson) {
            res.status(404).json({ message: "Lesson not found" });
            return;
        }
        const course = yield course_1.courseModel.findById(lesson.courseId);
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course && course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied — you do not own this course" });
            return;
        }
        const newChapter = new chapter_1.chapterModel({
            ChapterTitle, order, videoUrl, textTitle, text, quize, lessonId, videoTitle, filename, filedata
        });
        const savedChapter = yield newChapter.save();
        res.status(201).json(savedChapter);
    }
    catch (error) {
        console.error("Error adding chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.put("/updateChapter/:id", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid chapter ID format" });
        return;
    }
    try {
        const chapter = yield chapter_1.chapterModel.findById(id);
        if (!chapter) {
            res.status(404).json({ message: "Chapter not found" });
            return;
        }
        const lesson = yield lesson_1.lessonModel.findById(chapter.lessonId);
        const course = lesson ? yield course_1.courseModel.findById(lesson.courseId) : null;
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course && course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const allowedFields = [
            "ChapterTitle", "order", "videoUrl", "videoTitle",
            "textTitle", "text", "quize", "filename", "filedata"
        ];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined)
                updates[field] = req.body[field];
        }
        const updated = yield chapter_1.chapterModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        res.status(200).json(updated);
    }
    catch (error) {
        console.error("Error updating chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/deleteChapter/:id", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid chapter ID format" });
        return;
    }
    try {
        const chapter = yield chapter_1.chapterModel.findById(id);
        if (!chapter) {
            res.status(404).json({ message: "Chapter not found" });
            return;
        }
        const lesson = yield lesson_1.lessonModel.findById(chapter.lessonId);
        const course = lesson ? yield course_1.courseModel.findById(lesson.courseId) : null;
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course && course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        yield chapter_1.chapterModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Chapter deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
