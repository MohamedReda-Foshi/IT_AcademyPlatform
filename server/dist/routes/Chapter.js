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
const roleauth_1 = require("../middlewares/roleauth");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
/**
 * GET /getChapter/:courseId
 * Fetch all chapters associated with a specific course
 */
router.get("/getChapter/:courseId", auth_1.auth, (0, roleauth_1.role)("admin", "user"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(`courseId`)) {
        res.status(400).json({ message: "Invalid course ID format" });
        return;
    }
    try {
        const chapters = yield chapter_1.chapterModel
            .find({ courseId })
            .populate('courseId', ' ChapterTitile videoUrl text quize ')
            .sort({ order: 1 }); // Sort chapters by order
        res.json(chapters);
    }
    catch (error) {
        console.error("Error fetching chapters:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
/**
 * POST /addChapter
 * Create a new chapter
 */
router.post("/addChapter", auth_1.auth, (0, roleauth_1.role)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ChapterTitle, order, videoUrl, videoTitle, textTitle, text, quize, filename, filedata, courseId } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
        res.status(400).json({ message: "Invalid course ID format" });
        return;
    }
    try {
        const newChapter = new chapter_1.chapterModel({
            ChapterTitle,
            order,
            videoUrl,
            textTitle,
            text,
            quize,
            courseId,
            videoTitle,
            filename,
            filedata
        });
        const savedChapter = yield newChapter.save();
        res.status(201).json(savedChapter);
    }
    catch (error) {
        console.error("Error adding chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
