import express from 'express';
import {login} from "../services/userServices"
import { registerUser } from '../services/userServices';
const router = express.Router();


router.post('/regester',async(req,res)=>{
  const {firstName, lastName,email,password} = req.body
  const data = await registerUser({ firstName,lastName, email, password})
  res.status(200).send(data);
})

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