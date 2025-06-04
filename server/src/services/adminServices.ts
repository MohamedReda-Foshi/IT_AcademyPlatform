import { AdminModel } from "../Model/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";






interface ResgisterParams{
    adminname: string,
    email: string,
    password: string
}

export const registerAdmin =async ({ adminname, email, password}: ResgisterParams)=>{
    const findAdmin= await AdminModel.findOne({email});
    if(findAdmin){
        return{error:{message:"admin unser already exists"}};
    }
    const hachedPassword = await bcrypt.hash(password,10);
    const newAdmin=new AdminModel({
        adminname, 
        email, 
        password:hachedPassword})
    await newAdmin.save();
    
    return generateJWT({adminname,email});
}


interface LoginParams{
    email: string,
    password: string
}

export const login= async({ email, password}: LoginParams)=>{
    const findAdmin = await AdminModel.findOne({email});
    if(!findAdmin){
        return{message:"admin not found"};
    }
    const isMatch= await bcrypt.compare(password,findAdmin.password);
    if(isMatch){
        return {
            token: generateJWT({email, adminname: findAdmin.adminname})
        };
    }
    return {data:"Iconract password"}

}


interface JWTPayload {
    email: string;
    adminname: string;
}

const generateJWT = (data: JWTPayload) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
}

