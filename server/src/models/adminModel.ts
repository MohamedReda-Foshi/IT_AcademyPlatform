<<<<<<< HEAD
import mongoose,{Schema,Document} from "mongoose";


export interface IAdmin extends Document{
    adminName:string;
    email:string;
    password:string;
    
}

const adminSchema = new Schema<IAdmin>({
    adminName:{type: String,required:true},
    email:{type: String,required:true,unique: true},
    password:{type: String, required:true},
})

export const AdminModel = mongoose.model<IAdmin>('admin', adminSchema);
=======
import mongoose,{Schema,Document} from "mongoose";


export interface Iadmin extends Document{
    adminname:string;
    email:string;
    password:string;
    
}

 const adminSchema = new Schema<Iadmin>({

    adminname:{type: String,required:true},
    email:{type: String,required:true,unique: true},
    password:{type: String, required:true},
})

 export const AdminModel = mongoose.model<Iadmin>('admin',adminSchema);
>>>>>>> fadeac95cddd5dafc8550b362a042a357e7515b7
