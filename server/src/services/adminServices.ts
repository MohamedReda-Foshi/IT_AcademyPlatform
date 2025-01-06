import { AdminModel } from "../Model/adminModel";




interface ResgisterParams{
    adminname: string,
    email: string,
    password: string
}

export const register =async ({ adminname, email, password}: ResgisterParams)=>{
    const findAdmin= await AdminModel.findOne({email});
    if(findAdmin){
        return{error:{message:"admin unser already exists"}};
    } 
    const newAdmin=new AdminModel({adminname, email, password});
    await newAdmin.save();
    return {admin:newAdmin};
}


interface LoginParams{
    email: string,
    password: string
}

export const login= async({ email, password}: LoginParams)=>{
    const findAdmin = await AdminModel.findOne({email});
    if(!findAdmin){
        return{error:{message:"admin not found"}};
    }
    const isMatch= password===findAdmin.password
    if(isMatch){
        return{
            findAdmin
        };
    }
    return{error:{message:"wrong password"}};

}


