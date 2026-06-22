import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "instrator";
  about?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin", "instrator"],
      required: true,
    },
    about: { type: String, default: "" },
  },
  { collection: "user" }
);

export const userModel = mongoose.model<IUser>("User", UserSchema);
