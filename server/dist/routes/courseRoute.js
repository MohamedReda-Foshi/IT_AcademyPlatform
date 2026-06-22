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
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../middlewares/auth");
const roleauth_1 = require("../middlewares/roleauth");
// this is a cart course
const router = (0, express_1.Router)();
router.get("/CourseCard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel
            .find()
            .select("_id Namecourse category shortDescription imageUrl duration level rating")
            .lean();
        const mapped = courses.map((c) => (Object.assign({ id: c._id }, c)));
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
router.get("/AllCourse", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel.find();
        res.status(200).send(courses);
        next();
    }
    catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// all user courses
router.get("/course/CourseCard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.courseModel
            .find()
            .limit(1)
            .select("_id Namecourse category shortDescription imageUrl duration level rating");
        res.status(200).send(courses);
    }
    catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// this is a course page all user can see
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid course ID format" });
    }
    try {
        const Course = yield course_1.courseModel.findById(id).select("-__v"); // Exclude __v field from the response
        if (!Course) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        const { _id, Namecourse, DescriptionCourse, category, level, duration, rating, price, imageUrl, XpNumber, prerequisites, learningOutcomes, totalLessons, totalQuizzes, enrollments, videoUrl, text, quize, createdAt, updatedAt, } = Course.toObject();
        res.status(200).json({
            id: _id,
            Namecourse,
            DescriptionCourse,
            category,
            level,
            duration,
            rating,
            imageUrl,
            XpNumber,
            price,
            prerequisites,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            enrollments,
            videoUrl,
            text,
            quize,
            createdAt,
            updatedAt,
        });
    }
    catch (err) {
        console.error("Failed to fetch course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/lesson/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid course ID format" });
    }
    try {
        const Lesson = yield course_1.courseModel.findById(id).select("-__v"); // Exclude __v field from the response
        if (!Lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        const { _id, Namecourse, videoUrl, text, quize, totalLessons, totalQuizzes, enrollments, XpNumber, duration, } = Lesson.toObject();
        res.status(200).json({
            id: _id,
            Namecourse,
            videoUrl: videoUrl ? videoUrl.map((v) => v.toString()) : [], // Convert ObjectId to string
            // Convert ObjectId to string for each field
            text: text ? text.map((t) => t.toString()) : [],
            quize: quize ? quize.map((q) => q.toString()) : [],
            totalLessons,
            totalQuizzes,
            enrollments,
            XpNumber,
            duration,
        });
    }
    catch (err) {
        console.error("Failed to fetch lesson", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// this is a course page all user can see
// Method 2: Get all lessons for a specific course
router.post("/AddCourse", auth_1.auth, (0, roleauth_1.role)("admin", "instrator"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { Namecourse, DescriptionCourse, shortDescription, category, level, imageUrl, duration, modules, prerequisites, learningOutcomes, price, isPublished, XpNumber, videoUrl, text, quize, Instructor, InstructorInformation, } = req.body;
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
            learningOutcomes,
            price,
            isPublished,
            XpNumber,
            videoUrl,
            text,
            quize,
            Instructor,
            InstructorInformation,
            instructorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        const data = yield course.save();
        res.status(201).json(data);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
router.put("/UpdateCourse/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const allowedFields = [
            "Namecourse", "DescriptionCourse", "shortDescription", "category",
            "level", "imageUrl", "duration", "prerequisites", "learningOutcomes",
            "price", "isPublished", "XpNumber", "videoUrl", "text", "quize",
            "Instructor", "InstructorInformation",
        ];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined)
                updates[field] = req.body[field];
        }
        const updatedCourse = yield course_1.courseModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        res.status(200).json(updatedCourse);
    }
    catch (err) {
        console.error("Failed to update course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/DeleteCourse/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield course_1.courseModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (err) {
        console.error("Failed to delete course", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
