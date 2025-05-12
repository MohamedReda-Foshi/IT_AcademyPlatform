import mongoose, { Schema,Document } from "mongoose";

export interface Icourse extends Document{
    Namecourse:String,

    Descriptioncourse:String,
    Descriptioncourseshort:String,
    Typecourse:String,
    levelcourse:"Beginner"|"Intermediate"|"Advanced",
    imagecourse:String
}

const lessonSchema = new Schema<Icourse>({

    Namecourse:{type:String,required:true},
    Descriptioncourse:{type:String,required:true},
    
    Descriptioncourseshort:{type:String,required:true},
    Typecourse:{type:String,required:true},
    levelcourse:{type:String,required:true,enum:["Beginner","Intermediate","Advanced"]},
    imagecourse:{type:String,required:true}
})
export const courseModel = mongoose.model<Icourse>('course',lessonSchema);