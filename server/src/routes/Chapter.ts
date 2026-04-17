import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { chapterModel } from '../models/chapter';
// import {role} from '../middlewares/role_auth';
// import { auth } from '../middlewares/auth';



const router = Router();

/**
 * GET /getChapter/:courseId
 * Fetch all chapters associated with a specific course
 */
router.get("/getChapter/:courseId",
  async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(`${courseId}`)) {
    res.status(400).json({ message: "Invalid course ID format" });
    return;
  }

  try {
    const chapters = await chapterModel
      .find({ courseId })
      // .populate('courseId', ' ChapterTitle videoUrl text quiz ')
      .populate('courseId')
      .sort({ order: 1 }); // Sort chapters by order
      // console.log(chapters[0]._id);
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
  const { ChapterTitle,
      order,
      videoUrl,
      videoTitle,
      textTitle,
      text, 
      quiz,
      filesname,
      filedata, 
      courseId 
    } = req.body;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Invalid course ID format" });
    return;
  }

  try {
    const newChapter = new chapterModel({
      ChapterTitle,
      order,
      videoUrl,
      textTitle,
      text,
      quiz,
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
