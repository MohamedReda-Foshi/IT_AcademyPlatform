import { userModel } from "../Model/userModel";
import bcrypt from "bcrypt";
interface ResgisterParams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export const registerUser = async ({
    firstName,
    lastName,
    email,
    password
}:ResgisterParams)=>{
    
    const findUser =await userModel.findOne({email});

    if(findUser){
        return {data:"User name  is already in existence"};
    }
    const hachedPassword = await bcrypt.hash(password,10);
    const newUser =new userModel({
        firstName,
        lastName,
        email,
        password:hachedPassword})
    await newUser.save();

    return newUser;
}

interface LoginParams{
    email:string;
    password:string;
}


export const login =async ({email,password}: LoginParams)=>{
    const findUser =await userModel.findOne({email});

    if(!findUser) return {
        data:"User is not found"
    };
    const passwordMatch = await bcrypt.compare(password,findUser.password);
    if(passwordMatch) {
        return findUser;
    }
    return {data:"Iconract password"}
}