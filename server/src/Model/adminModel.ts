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
});

export const AdminModel = mongoose.model<IAdmin>('admin',adminSchema);
