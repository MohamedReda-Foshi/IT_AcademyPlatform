import express from 'express';
import {login} from "../services/userServices"
import { registerUser } from '../services/userServices';
import { userModel } from '../Model/userModel';
const router = express.Router();


router.get("/getuser",async(req,res)=>{
  try{
    const Userdata = await userModel.find();
    res.status(200).json(Userdata);

  }catch(err){
    res.status(404).send(err);
  }
});


































//Authoniocation
router.post('/regester',async(req,res)=>{
  try{
    const {firstName, lastName,email,password} = req.body
    const data = await registerUser({ firstName,lastName, email, password})
    res.status(201).send(data);
  }catch{
    res.status(404).send("Something went wrong!");
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





// google






//git hub

export default router;