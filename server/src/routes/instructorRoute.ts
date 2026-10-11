import { Router, Request, Response } from "express";
import { db } from "../config/database";
import { courseModel } from "../models/course";
import { auth } from "../middlewares/auth";
import { role } from "../middlewares/roleauth";

const router = Router();

router.get("/my-courses", auth, role("instrator"), async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await courseModel
      .find({ instructorId: req.user?.id })
      .select("-__v")
      .lean();
    res.status(200).json(courses);
  } catch (err) {
    console.error("Failed to fetch instructor courses", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all", auth, role("admin"), async (req: Request, res: Response): Promise<void> => {
  try {
    const instructors = await db
      .collection("user")
      .find({ role: "instrator" })
      .project({ name: 1, email: 1, role: 1, about: 1, createdAt: 1 })
      .toArray();

    const courses = await courseModel
      .find()
      .select("Namecourse Instructor InstructorInformation category level duration price isPublished createdAt")
      .lean();

    res.status(200).json({ instructors, courses });
  } catch (err) {
    console.error("Failed to fetch instructors", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
