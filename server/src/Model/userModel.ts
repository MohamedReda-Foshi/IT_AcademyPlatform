import mongoose,{Schema,Document} from "mongoose";
export interface IUser extends Document{
   firstName:string;
   lastName:string;
   email:string;
   role: string;
   provider:string;
   password:string;
   about?: string;
   ImageURL:string;
   Pyament:string;
  }
  
 const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    provider: {type: String,
    required: true,
    enum: ['google', 'github','website'],
    default:'website'},
    role: { type: String, enum: ['user', 'admin'], required: true },
    Pyament: { type: String, enum: ['free', 'Pay'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
      about: { type: String, default: '' },
      ImageURL:{type:String ,default: ''}
 });
export const userModel = mongoose.model<IUser>('user',UserSchema)

