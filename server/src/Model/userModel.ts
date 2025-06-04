import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{

   firstName:string;
   lastName:string;
   email:string;
   role: 'user' | 'admin';
   password:string;
   about?: string;
}

 const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
      about: { type: String, default: '' }
 });


 export const userModel = mongoose.model<IUser>('user',UserSchema)

