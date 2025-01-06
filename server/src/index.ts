import express from 'express';
import {connection} from '../config/database';

import admin from './routes/adminRoute';

import user from './routes/userRoute';

const app = express();

connection();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page!");
})

app.use('/dashboard', admin)
app.use('/user', user)

export default app;