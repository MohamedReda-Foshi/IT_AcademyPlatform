import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

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

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
      if (req.body?.[field] && typeof req.body[field] === "string") {
        req.body[field] = sanitizeHtml(req.body[field], allowedHtml);
      }
    }

    if (typeof req.body?.text === "string") req.body.text = sanitizeHtml(req.body.text, allowedHtml);
    if (Array.isArray(req.body?.text)) req.body.text = req.body.text.map((value: unknown) =>
      typeof value === "string" ? sanitizeHtml(value, allowedHtml) : value);
    if (Array.isArray(req.body?.questions)) req.body.questions = req.body.questions.map((question: any) =>
      question && typeof question === "object" ? {
        ...question,
        question: typeof question.question === "string" ? sanitizeHtml(question.question, allowedHtml) : question.question,
        options: Array.isArray(question.options) ? question.options.map((option: unknown) =>
          typeof option === "string" ? sanitizeHtml(option, allowedHtml) : option) : question.options,
      } : question);

    next();
  } catch (err) {
    console.error("Sanitization error:", err);
    res.status(500).json({ message: "Input sanitization error" });
  }
};
