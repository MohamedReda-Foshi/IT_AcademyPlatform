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
