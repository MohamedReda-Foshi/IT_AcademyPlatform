import mongoose from "mongoose" ;
import dotenv from "dotenv";
import express from 'express';


const app = express();

dotenv.config();



export function  connect ()
{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port `,process.env.PORT);
      });
}
/*{
    mongoose
    .connect()
    .then(async () => {
      console.log("Database connected!");    
  

  
    // Start the server after a successful connection.
  
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
};*/
