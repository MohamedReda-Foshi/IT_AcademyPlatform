import express from 'express';
import {login} from "../services/adminServices"
import { registerAdmin } from '../services/adminServices';
const router = express.Router();


router.post('/regester',async(req,res)=>{
  try {
    const {adminname, email, password} = req.body
    const data = await registerAdmin({adminname, email, password})
    res.status(200).send(data);

  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;
    const data = await login({ email, password });
    res.status(200).json(data);

    }catch{
        res.status(500).send("Something went wrong!");
      }
    });









export default router;