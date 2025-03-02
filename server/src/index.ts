import express from 'express';
import {connection} from '../config/database';
import admin from './routes/adminRoute';
import user from './routes/userRoute';
import course from './routes/courseRoute';

const app = express();
connection();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Home page!");
})

app.use('/dashboard', admin)
app.use('/user', user)
app.use('/course', course);

export default app;