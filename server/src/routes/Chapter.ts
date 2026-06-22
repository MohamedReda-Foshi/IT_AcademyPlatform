import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { chapterModel } from '../models/chapter';
import { courseModel } from '../models/course';
import { role } from '../middlewares/roleauth';
import { auth } from '../middlewares/auth';

const router = Router();

router.get("/getChapter/:courseId", auth, role("admin", "instrator", "user"),
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ message: "Invalid course ID format" });
      return;
    }

    try {
      const chapters = await chapterModel
        .find({ courseId })
        .populate('courseId', 'ChapterTitle videoUrl text quize')
        .sort({ order: 1 });

      res.json(chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/addChapter", auth, role("admin", "instrator"), async (req: Request, res: Response): Promise<void> => {
  const { ChapterTitle, order, videoUrl, videoTitle, textTitle, text, quize, filename, filedata, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Invalid course ID format" });
    return;
  }

  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const isAdmin = req.user?.role === "admin";
    const isOwner = course.instructorId === req.user?.id;
    if (!isAdmin && !isOwner) {
      res.status(403).json({ message: "Access denied — you do not own this course" });
      return;
    }

    const newChapter = new chapterModel({
      ChapterTitle, order, videoUrl, textTitle, text, quize, courseId, videoTitle, filename, filedata
    });

    const savedChapter = await newChapter.save();
    res.status(201).json(savedChapter);
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateChapter/:id", auth, role("admin", "instrator"), async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid chapter ID format" });
    return;
  }

  try {
    const chapter = await chapterModel.findById(id);
    if (!chapter) {
      res.status(404).json({ message: "Chapter not found" });
      return;
    }

    const course = await courseModel.findById(chapter.courseId);
    const isAdmin = req.user?.role === "admin";
    const isOwner = course && course.instructorId === req.user?.id;
    if (!isAdmin && !isOwner) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const allowedFields = [
      "ChapterTitle", "order", "videoUrl", "videoTitle",
      "textTitle", "text", "quize", "filename", "filedata"
    ];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const updated = await chapterModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteChapter/:id", auth, role("admin", "instrator"), async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid chapter ID format" });
    return;
  }

  try {
    const chapter = await chapterModel.findById(id);
    if (!chapter) {
      res.status(404).json({ message: "Chapter not found" });
      return;
    }

    const course = await courseModel.findById(chapter.courseId);
    const isAdmin = req.user?.role === "admin";
    const isOwner = course && course.instructorId === req.user?.id;
    if (!isAdmin && !isOwner) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    await chapterModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
