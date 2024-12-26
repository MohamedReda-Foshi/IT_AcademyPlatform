import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import {connection} from '../config/database';


const app = express();

connection();


app.get("/", (req, res) => {
    res.send("Home page!");
})

export default app;