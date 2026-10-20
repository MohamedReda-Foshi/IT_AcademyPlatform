import { Router, Request, Response } from "express";
import { courseModel, Icourse } from "../models/course";
import { lessonModel, Ilesson } from "../models/lesson";
import { chapterModel } from "../models/chapter";
import mongoose from "mongoose";
import { auth } from "../middlewares/auth";
import { role } from "../middlewares/roleauth";
import { csrfMiddleware } from "../middlewares/csrf";
import { sanitizeMiddleware } from "../middlewares/sanitize";

const router = Router();

router.get("/CourseCard", async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .select(
        "_id Namecourse category shortDescription imageUrl duration level rating isPublished",
      )
      .lean();

    const lessons = await lessonModel.find().select("courseId").lean();
    const lessonMap = new Map(lessons.map((l) => [l.courseId.toString(), l._id.toString()]));

    const mapped = courses.map((c) => ({
      id: c._id,
      ...c,
      lessonId: lessonMap.get(c._id.toString()) || null,
    }));
    res.status(200).send(mapped);
  } catch (error) {
    console.error("Failed to fetch courses", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/CourseCardHomepage", async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .select(
        "_id Namecourse category shortDescription imageUrl duration level rating",
      )
      .limit(6)
      .lean();
    const mapped = courses.map((c) => ({ id: c._id, ...c }));
    res.status(200).send(mapped);
  } catch (error) {
    console.error("Failed to fetch homepage courses", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/AllCourse",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const courses = await courseModel.find();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

router.get(
  "/CourseCardSingle",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await courseModel
        .find()
        .limit(1)
        .select(
          "_id Namecourse category shortDescription imageUrl duration level rating",
        );
      res.status(200).json(courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Course detail page — joins course + lesson
router.get(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    try {
      const Course = await courseModel.findById(id).select("-__v");
      if (!Course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const Lesson = await lessonModel.findOne({ courseId: id }).select("-__v").lean();

      const {
        _id,
        Namecourse,
        DescriptionCourse,
        shortDescription,
        category,
        level,
        duration,
        rating,
        price,
        imageUrl,
        prerequisites,
        createdAt,
        updatedAt,
        enrollments,
        Instructor,
        InstructorInformation,
        isPublished,
      } = Course.toObject() as Icourse & { _id: mongoose.Types.ObjectId };

      res.status(200).json({
        id: _id,
        Namecourse,
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
        updatedAt,
        ...(Lesson ? {
          lessonId: Lesson._id.toString(),
          learningOutcomes: Lesson.learningOutcomes,
          totalLessons: Lesson.totalLessons,
          totalQuizzes: Lesson.totalQuizzes,
          XpNumber: Lesson.XpNumber,
          videoUrl: Lesson.videoUrl,
          text: Lesson.text,
          quize: Lesson.quize,
        } : {}),
      });
    } catch (err) {
      console.error("Failed to fetch course", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Lesson page — queries lessonModel
router.get(
  "/lesson/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Lesson ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lesson ID format" });
    }

    try {
      const lesson = await lessonModel.findById(id).select("-__v");
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      const {
        _id,
        Namecourse,
        videoUrl,
        text,
        quize,
        learningOutcomes,
        totalLessons,
        totalQuizzes,
        enrollments,
        XpNumber,
        duration,
        instructorId,
        Instructor,
      } = lesson.toObject() as Ilesson & { _id: mongoose.Types.ObjectId };

      res.status(200).json({
        id: _id,
        Namecourse,
        videoUrl: videoUrl ? videoUrl.map((v: any) => v.toString()) : [],
        text: text ? text.map((t: any) => t.toString()) : [],
        quize: quize ? quize.map((q: any) => q.toString()) : [],
        learningOutcomes: learningOutcomes ? learningOutcomes.map((o: any) => o.toString()) : [],
        totalLessons,
        totalQuizzes,
        enrollments,
        XpNumber,
        duration,
        instructorId,
        instructorUserName: Instructor,
      });
    } catch (err) {
      console.error("Failed to fetch lesson", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Create course + lesson
router.post(
  "/AddCourse",
  auth,
  role("admin", "instructor"),
  csrfMiddleware,
  sanitizeMiddleware,
  async (req, res) => {
    try {
      const {
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
        learningOutcomes,
        XpNumber,
        videoUrl,
        text,
        quize,
        totalLessons,
        totalQuizzes,
        enrollments,
      } = req.body;

      const course = new courseModel({
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
        instructorId: req.user?.id,
      });
      const savedCourse = await course.save();

      const lesson = new lessonModel({
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
        instructorId: req.user?.id,
        Instructor,
      });
      await lesson.save();

      res.status(201).json(savedCourse);
    } catch (err) {
      res.status(404).json(err);
    }
  },
);

// Update course + lesson
router.put("/UpdateCourse/:id", auth, csrfMiddleware, sanitizeMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }

    const course = await courseModel.findById(id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const isAdmin = req.user?.role === "admin";
    const isOwner = course.instructorId === req.user?.id;
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

    const courseUpdates: Record<string, unknown> = {};
    const lessonUpdates: Record<string, unknown> = {};

    for (const field of courseFields) {
      if (req.body[field] !== undefined) courseUpdates[field] = req.body[field];
    }
    for (const field of lessonFields) {
      if (req.body[field] !== undefined) lessonUpdates[field] = req.body[field];
    }

    if (Object.keys(courseUpdates).length > 0) {
      await courseModel.findByIdAndUpdate(id, courseUpdates, { new: true, runValidators: true });
    }
    if (Object.keys(lessonUpdates).length > 0) {
      await lessonModel.findOneAndUpdate({ courseId: id }, lessonUpdates, { new: true, runValidators: true });
    }

    const updatedCourse = await courseModel.findById(id);
    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error("Failed to update course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete course + lesson + chapters
router.delete("/DeleteCourse/:id", auth, csrfMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }

    const course = await courseModel.findById(id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const isAdmin = req.user?.role === "admin";
    const isOwner = course.instructorId === req.user?.id;
    if (!isAdmin && !isOwner) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const lesson = await lessonModel.findOne({ courseId: id });
    if (lesson) {
      await chapterModel.deleteMany({ lessonId: lesson._id });
      await lessonModel.findByIdAndDelete(lesson._id);
    }
    await courseModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Failed to delete course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
