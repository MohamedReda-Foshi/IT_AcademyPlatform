import { AdminModel } from "../Model/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";






interface RegisterParams{
    adminName: string,
    email: string,
    password: string
}

export const registerAdmin =async ({ adminName, email, password}: RegisterParams)=>{
    const findAdmin= await AdminModel.findOne({email});
    if(findAdmin){
        return{error:{message:"admin user already exists"}};
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newAdmin=new AdminModel({
        adminName, 
        email, 
        password: hashedPassword})
    await newAdmin.save();
    
    return generateJWT({adminName,email});
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
            token: generateJWT({email, adminName: findAdmin.adminName})
        };
    }
    return {data:"Invalid password or email"}

}


interface JWTPayload {
    email: string;
    adminName: string;
}

const generateJWT = (data: JWTPayload) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
}

