import { Schema,Document } from "mongoose";

export interface IModules extends Document{
    NameModul:String,
    DescriptionModul:String,
    TypeModul:String
}


const ModulesSchema = new Schema<IModules>({

    NameModul:{type:String,required:true},
    DescriptionModul:{type:String,required:true},
    TypeModul:{type:String,required:true},
   

})