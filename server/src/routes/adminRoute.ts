import express from 'express';
import {userModel} from '../models/userModel'
import { auth } from '../middlewares/auth';
import {role} from '../middlewares/roleauth';

const router = express.Router();

router.get("/AdminUser", auth, role("admin"), async (req, res) => {
  try {
    const data = await userModel
      .find({ role: "admin" })
      .select("name lastName email");
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/deleuser", async (req, res) => {
  try {
    const id = req.body.id;
    const data = await userModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
