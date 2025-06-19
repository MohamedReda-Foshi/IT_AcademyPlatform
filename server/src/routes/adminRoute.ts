import express from 'express';
import {login} from "../services/adminServices"
import { registerAdmin } from '../services/adminServices';
import {userModel} from '../Model/userModel'
import { AdminModel } from '../Model/adminModel';
import { auth } from '../middlewares/auth';
import {role} from '../middlewares/roleauth';

const router = express.Router();






//get all admin user

router.get("/AdminUser",auth, role ("admin"),async(req,res)=>{
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