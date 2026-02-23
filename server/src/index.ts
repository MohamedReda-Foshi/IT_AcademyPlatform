import express from 'express';
import {connection} from '../config/database';
import admin from './routes/adminRoute';
import user from './routes/userRoute';
import course from './routes/courseRoute';
import chapter from './routes/Chapter';
import quiz from './routes/quiz';
import question from './routes/question';
import dotenv from "dotenv";
// import  from './Model/question';
// import { auth } from './middlewares/auth';

const cors = require('cors');
dotenv.config();

const app = express();
connection();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Home page!");
});

app.use(cors({
    origin: `${process.env.FRONT_END_PORT}`, // frontend URL
    credentials: true
  }));

app.use('/dashboard', admin);
app.use('/chapter', chapter);
app.use('/user', user);
app.use('/course', course);
app.use('/quizzes', quiz);
app.use('/questions', question)

export default app;