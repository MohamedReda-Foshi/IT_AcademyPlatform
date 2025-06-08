import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { chapterModel } from '../Model/chapter';

const router = Router();

/**
 * GET /getChapter/:courseId
 * Fetch all chapters associated with a specific course
 */
router.get("/getChapter/:courseId", async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Invalid course ID format" });
    return;
  }

  try {
    const chapters = await chapterModel
      .find({ courseId })
      .populate('courseId', ' ChapterTitile videoUrl text quize ')
      .sort({ order: 1 }); // Sort chapters by order

    res.json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * POST /addChapter
 * Create a new chapter
 */
router.post("/addChapter", async (req: Request, res: Response): Promise<void> => {
  const { ChapterTitle, order, videoUrl,videoTitle,filesname,filedata, text, quize, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Invalid course ID format" });
    return;
  }

  try {
    const newChapter = new chapterModel({
      ChapterTitle,
      order,
      videoUrl,
      text,
      quize,
      courseId,
      videoTitle,
      filesname,
      filedata
    });

    const savedChapter = await newChapter.save();
    res.status(201).json(savedChapter);
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
