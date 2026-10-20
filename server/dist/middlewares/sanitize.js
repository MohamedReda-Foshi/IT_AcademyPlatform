"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMiddleware = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const allowedHtml = {
    allowedTags: [
        "a",
        "abbr",
        "b",
        "blockquote",
        "br",
        "cite",
        "code",
        "dd",
        "div",
        "dl",
        "dt",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "i",
        "img",
        "li",
        "ol",
        "p",
        "pre",
        "s",
        "sup",
        "sub",
        "strong",
        "u",
        "ul",
    ],
    allowedAttributes: {
        a: ["href", "title"],
        img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https"],
};
const sanitizeMiddleware = (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const fieldsToSanitize = [
            "DescriptionCourse",
            "InstructorInformation",
            "Namecourse",
            "category",
            "shortDescription",
            "ChapterTitle",
            "textTitle",
            "videoTitle",
            "title",
        ];
        for (const field of fieldsToSanitize) {
            if (((_a = req.body) === null || _a === void 0 ? void 0 : _a[field]) && typeof req.body[field] === "string") {
                req.body[field] = (0, sanitize_html_1.default)(req.body[field], allowedHtml);
            }
        }
        if (typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.text) === "string")
            req.body.text = (0, sanitize_html_1.default)(req.body.text, allowedHtml);
        if (Array.isArray((_c = req.body) === null || _c === void 0 ? void 0 : _c.text))
            req.body.text = req.body.text.map((value) => typeof value === "string" ? (0, sanitize_html_1.default)(value, allowedHtml) : value);
        if (Array.isArray((_d = req.body) === null || _d === void 0 ? void 0 : _d.questions))
            req.body.questions = req.body.questions.map((question) => question && typeof question === "object" ? Object.assign(Object.assign({}, question), { question: typeof question.question === "string" ? (0, sanitize_html_1.default)(question.question, allowedHtml) : question.question, options: Array.isArray(question.options) ? question.options.map((option) => typeof option === "string" ? (0, sanitize_html_1.default)(option, allowedHtml) : option) : question.options }) : question);
        next();
    }
    catch (err) {
        console.error("Sanitization error:", err);
        res.status(500).json({ message: "Input sanitization error" });
    }
};
exports.sanitizeMiddleware = sanitizeMiddleware;
