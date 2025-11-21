import express from "express";
import { login } from "../services/userServices";
import { registerUser } from "../services/userServices";
import { userModel } from "../Model/userModel";
import { Request, Response, NextFunction } from "express";
import { role } from "../middlewares/roleauth";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/getuser",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Userdata = await userModel
        .find()
        .select("firstName lastName email role provider ImageURL about Pyament");
      res.status(200).json(Userdata);
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

router.get(
  "/getusername/:id",
  auth,
  role("admin"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params._id;
      const UserName = await userModel
        .findById(id)
        .select("firstName lastName");
      res.status(200).json(UserName);
      next();
    } catch (err) {
      res.status(404).send(err);
    }
  }
);

//Authoniocation
router.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    const data = await registerUser({
      firstName,
      lastName,
      role,
      email,
      password,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(404).send(`Registration wrong! ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login({ email, password });
    res.status(200).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

// Route that uses middleware

// router.get('/me', async (req, res) => {
//   if (!req.firstName) return res.status(401).json({ user: null });
//   const user = await userModel.findById(req.firstName.id).select('name avatarUrl');
//   res.json({ user });
// });

export default router;
