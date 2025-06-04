import express from 'express';
import {login} from "../services/userServices"
import { registerUser } from '../services/userServices';
const router = express.Router();




router.post('/register',async(req,res,next)=>{
  try{
    const {firstName, lastName,role, email, password} = req.body
    const data = await registerUser({ firstName, lastName,role, email, password})
    res.status(201).send(data);
  }catch{
    res.status(404).send("Something went wrong!");
  }
  next();
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
interface AuthRequest extends express.Request {
  query: {
    role?: string;
  }
}

export default router;