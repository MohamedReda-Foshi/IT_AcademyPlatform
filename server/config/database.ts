import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../src/index";

dotenv.config();

export function connection(){

    const conn = process.env.NODE_ENV === "production" ? process.env.MONGODB_URL : process.env.MONGODB_URL_LOCAL;
    
    mongoose.connect(conn as string)
    .then(async()=>{
        console.log("Database connected!");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }).catch((err) => {
        console.log("MongoDB connection error:",err);
    });
}