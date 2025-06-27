import { userModel } from "../Model/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface RegisterParams{
    firstName:string;
    lastName:string;
    role: { type: String, enum: ['user', 'admin'], required: true };
    email:string;
    password:string;
}

export const registerUser = async ({
    firstName,
    lastName,
    role,
    email,
    password
}:RegisterParams)=>{
    
    const findUser =await userModel.findOne({email});

    if(findUser){
        return {data:"User name  is already in existence"};
    }
    const hachedPassword = await bcrypt.hash(password,10);
    const newUser =new userModel({
        firstName,
        lastName,
        role,
        email,
        password:hachedPassword})
    await newUser.save();

    return generateJWT({firstName,lastName,email});
}

interface LoginParams{
    email:string;
    password:string;
    role?: string;
}


export const login =async ({email,password}: LoginParams)=>{
    const findUser =await userModel.findOne({email});
    if(!findUser) return {
        data:"User is not found"
    };
    const passwordMatch = await bcrypt.compare(password,findUser.password);
    if(passwordMatch) {
        const token =generateJWT({id:findUser._id,role:findUser.role})
        return token;
    }
    return {data:"Iconract password"}    
};

const generateJWT=(payload:any)=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY as string,{
        expiresIn:"1d"});
} 
export const verifyJWT = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};