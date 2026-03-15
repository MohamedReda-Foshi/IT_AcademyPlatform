import express from 'express';
// import {login} from "../services/adminServices"
// import { registerAdmin } from '../services/adminServices';
import {userModel} from '../Model/userModel'
import { AdminModel } from '../Model/adminModel';
import { auth } from '../middlewares/auth';
import {role} from '../middlewares/role_auth';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


const router = express.Router();

//get all admin user
router.get("/AdminUser", auth, role("admin"), async(req,res)=>{
  try {
    const id = req.body.id;
    const data = await AdminModel.find({id, role:"admin"});
    res.status(200).json(data);
  } catch(err) {
    res.status(404).json(err);
  }
});

const generateJWT=(payload:any)=>{
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn:"2h"
    });
} 
export const verifyJWT = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};

router.post("/addAdminUser",/*auth, role("admin"),*/ async(req,res)=>{
  try {
    const {adminName, email, password } = req.body;
    const adminExist = await AdminModel.findOne({email});

    if(adminExist) {
      res.status(500).json({
        message: 'The Admin Already Exist'
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    
    const data = await AdminModel.create({
      adminName,
      email,
      password: hashedPassword,
    });

    const token = await generateJWT({email, admin: true});

    res.status(200).json({data, token});

  } catch(err) {
    res.status(404).json(err);
  }
});

// delete user
router.delete("/deleUser", async(req,res)=>{
    try{
      const id = req.body.id;
      const data = await userModel.findByIdAndDelete(id);
      res.status(200).json(data);
    }
    catch(err){
      res.status(404).json(err);
    }
});

export default router;