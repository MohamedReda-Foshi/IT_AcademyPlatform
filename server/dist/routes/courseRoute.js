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
const course_1 = require("../models/course");
const lesson_1 = require("../models/lesson");
const chapter_1 = require("../models/chapter");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../middlewares/auth");
const roleauth_1 = require("../middlewares/roleauth");
const csrf_1 = require("../middlewares/csrf");
const sanitize_1 = require("../middlewares/sanitize");
const router = (0, express_1.Router)();
router.get("/CourseCard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel
            .find()
            .select("_id Namecourse category shortDescription imageUrl duration level rating isPublished")
            .lean();
        const lessons = yield lesson_1.lessonModel.find().select("courseId").lean();
        const lessonMap = new Map(lessons.map((l) => [l.courseId.toString(), l._id.toString()]));
        const mapped = courses.map((c) => (Object.assign(Object.assign({ id: c._id }, c), { lessonId: lessonMap.get(c._id.toString()) || null })));
        res.status(200).send(mapped);
    }
    catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/CourseCardHomepage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel
            .find()
            .select("_id Namecourse category shortDescription imageUrl duration level rating")
            .limit(6)
            .lean();
        const mapped = courses.map((c) => (Object.assign({ id: c._id }, c)));
        res.status(200).send(mapped);
    }
    catch (error) {
        console.error("Failed to fetch homepage courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/AllCourse", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel.find();
        res.status(200).json(courses);
    }
    catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/CourseCardSingle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel
            .find()
            .limit(1)
            .select("_id Namecourse category shortDescription imageUrl duration level rating");
        res.status(200).json(courses);
    }
    catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Course detail page — joins course + lesson
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid course ID format" });
    }
    try {
        const Course = yield course_1.courseModel.findById(id).select("-__v");
        if (!Course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const Lesson = yield lesson_1.lessonModel.findOne({ courseId: id }).select("-__v").lean();
        const { _id, Namecourse, DescriptionCourse, shortDescription, category, level, duration, rating, price, imageUrl, prerequisites, createdAt, updatedAt, enrollments, Instructor, InstructorInformation, isPublished, } = Course.toObject();
        res.status(200).json(Object.assign({ id: _id, Namecourse,
            DescriptionCourse,
            shortDescription,
            category,
            level,
            duration,
            rating,
            imageUrl,
            price,
            prerequisites,
            enrollments,
            Instructor,
            InstructorInformation,
            isPublished,
            createdAt,
            updatedAt }, (Lesson ? {
            lessonId: Lesson._id.toString(),
            learningOutcomes: Lesson.learningOutcomes,
            totalLessons: Lesson.totalLessons,
            totalQuizzes: Lesson.totalQuizzes,
            XpNumber: Lesson.XpNumber,
            videoUrl: Lesson.videoUrl,
            text: Lesson.text,
            quize: Lesson.quize,
        } : {})));
    }
    catch (err) {
        console.error("Failed to fetch course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Lesson page — queries lessonModel
router.get("/lesson/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Lesson ID is required" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid lesson ID format" });
    }
    try {
        const lesson = yield lesson_1.lessonModel.findById(id).select("-__v");
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        const { _id, Namecourse, videoUrl, text, quize, learningOutcomes, totalLessons, totalQuizzes, enrollments, XpNumber, duration, instructorId, Instructor, } = lesson.toObject();
        res.status(200).json({
            id: _id,
            Namecourse,
            videoUrl: videoUrl ? videoUrl.map((v) => v.toString()) : [],
            text: text ? text.map((t) => t.toString()) : [],
            quize: quize ? quize.map((q) => q.toString()) : [],
            learningOutcomes: learningOutcomes ? learningOutcomes.map((o) => o.toString()) : [],
            totalLessons,
            totalQuizzes,
            enrollments,
            XpNumber,
            duration,
            instructorId,
            instructorUserName: Instructor,
        });
    }
    catch (err) {
        console.error("Failed to fetch lesson", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Create course + lesson
router.post("/AddCourse", auth_1.auth, (0, roleauth_1.role)("admin", "instructor"), csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { Namecourse, DescriptionCourse, shortDescription, category, level, imageUrl, duration, modules, prerequisites, price, isPublished, Instructor, InstructorInformation, learningOutcomes, XpNumber, videoUrl, text, quize, totalLessons, totalQuizzes, enrollments, } = req.body;
        const course = new course_1.courseModel({
            Namecourse,
            DescriptionCourse,
            shortDescription,
            category,
            level,
            imageUrl,
            duration,
            modules,
            prerequisites,
            price,
            isPublished,
            Instructor,
            InstructorInformation,
            instructorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        const savedCourse = yield course.save();
        const lesson = new lesson_1.lessonModel({
            courseId: savedCourse._id,
            Namecourse,
            videoUrl: videoUrl || [],
            text: text || [],
            quize: quize || [],
            learningOutcomes: learningOutcomes || [],
            totalLessons: totalLessons || 0,
            totalQuizzes: totalQuizzes || 0,
            enrollments: enrollments || 0,
            XpNumber: XpNumber || 0,
            duration: duration || 0,
            instructorId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
            Instructor,
        });
        yield lesson.save();
        res.status(201).json(savedCourse);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
// Update course + lesson
router.put("/UpdateCourse/:id", auth_1.auth, csrf_1.csrfMiddleware, sanitize_1.sanitizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid course ID format" });
            return;
        }
        const course = yield course_1.courseModel.findById(id);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const courseFields = [
            "Namecourse", "DescriptionCourse", "shortDescription", "category",
            "level", "imageUrl", "duration", "prerequisites",
            "price", "isPublished", "Instructor", "InstructorInformation",
        ];
        const lessonFields = [
            "learningOutcomes", "XpNumber", "videoUrl", "text", "quize",
            "totalLessons", "totalQuizzes", "enrollments",
        ];
        const courseUpdates = {};
        const lessonUpdates = {};
        for (const field of courseFields) {
            if (req.body[field] !== undefined)
                courseUpdates[field] = req.body[field];
        }
        for (const field of lessonFields) {
            if (req.body[field] !== undefined)
                lessonUpdates[field] = req.body[field];
        }
        if (Object.keys(courseUpdates).length > 0) {
            yield course_1.courseModel.findByIdAndUpdate(id, courseUpdates, { new: true, runValidators: true });
        }
        if (Object.keys(lessonUpdates).length > 0) {
            yield lesson_1.lessonModel.findOneAndUpdate({ courseId: id }, lessonUpdates, { new: true, runValidators: true });
        }
        const updatedCourse = yield course_1.courseModel.findById(id);
        res.status(200).json(updatedCourse);
    }
    catch (err) {
        console.error("Failed to update course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Delete course + lesson + chapters
router.delete("/DeleteCourse/:id", auth_1.auth, csrf_1.csrfMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid course ID format" });
            return;
        }
        const course = yield course_1.courseModel.findById(id);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        const isAdmin = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        const isOwner = course.instructorId === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (!isAdmin && !isOwner) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        const lesson = yield lesson_1.lessonModel.findOne({ courseId: id });
        if (lesson) {
            yield chapter_1.chapterModel.deleteMany({ lessonId: lesson._id });
            yield lesson_1.lessonModel.findByIdAndDelete(lesson._id);
        }
        yield course_1.courseModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (err) {
        console.error("Failed to delete course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
