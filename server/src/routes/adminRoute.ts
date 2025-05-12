import express from 'express';
import {login} from "../services/adminServices"
import { registerAdmin } from '../services/adminServices';
import {userModel} from '../Model/userModel'
import { AdminModel } from '../Model/adminModel';

const router = express.Router();


router.post('/regester',async(req,res)=>{
  try {
    const {adminname, email, password} = req.body
    const data = await registerAdmin({adminname, email, password})
    res.status(201).json(data);

  } catch {
    res.status(500).json("Something went wrong!");
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;
    const data = await login({ email, password });
    res.status(200).json(data);
    }catch{
        res.status(404).json("not 404");
      }
    });


//get all admin user

router.get("/AdminUser",async(req,res)=>{
  try{
    const data = await AdminModel.find();
    res.status(200).json(data);
  }
  catch(err){
    res.status(404).json(err)
  }
})




// delet user
router.delete("/deleuser",async(req,res)=>{

    try{
      const id = req.body.id;
      const data = await userModel.findByIdAndDelete(id);
      res.status(200).json(data);
    }
    catch(err){
      res.status(404).json(err);
    }
})



export default router;