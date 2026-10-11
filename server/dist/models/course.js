"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    Namecourse: { type: String, required: true, trim: true },
    DescriptionCourse: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    category: { type: String, required: true, index: true },
    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced"],
        index: true
    },
    imageUrl: { type: String, required: true },
    duration: { type: Number, default: 0 },
    modules: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Module" }],
    prerequisites: [{ type: String }],
    price: { type: String, enum: ["Free", "Paid"], default: "Free" },
    rating: { type: Number, default: 0, min: 0, max: 5 }, // Fixed: single number
    learningOutcomes: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    totalLessons: { type: Number, default: 0 },
    totalQuizzes: { type: Number, default: 0 },
    enrollments: { type: Number, default: 0 },
    XpNumber: { type: Number, default: 0 },
    instructorId: { type: String, index: true },
    Instructor: { type: String },
    InstructorInformation: { type: String },
    videoUrl: [{ type: String }],
    text: [{ type: String }],
    quize: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
exports.courseModel = mongoose_1.default.model('Course', courseSchema);
