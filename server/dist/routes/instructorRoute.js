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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const course_1 = require("../models/course");
const auth_1 = require("../middlewares/auth");
const roleauth_1 = require("../middlewares/roleauth");
const router = (0, express_1.Router)();
router.get("/my-courses", auth_1.auth, (0, roleauth_1.role)("instrator"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const courses = yield course_1.courseModel
            .find({ instructorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
            .select("-__v")
            .lean();
        res.status(200).json(courses);
    }
    catch (err) {
        console.error("Failed to fetch instructor courses", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/all", auth_1.auth, (0, roleauth_1.role)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructors = yield database_1.db
            .collection("user")
            .find({ role: "instrator" })
            .project({ name: 1, email: 1, role: 1, about: 1, createdAt: 1 })
            .toArray();
        const courses = yield course_1.courseModel
            .find()
            .select("Namecourse Instructor InstructorInformation category level duration price isPublished createdAt")
            .lean();
        res.status(200).json({ instructors, courses });
    }
    catch (err) {
        console.error("Failed to fetch instructors", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
