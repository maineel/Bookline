import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({origin: "http://localhost:8000" , credentials: true}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.get('/', (req, res) => {
    res.send("Welcome to Bookline server");
});

import { userRouter } from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);

import { studentRouter } from './routes/student.routes.js';
app.use('/api/v1/students', studentRouter);

import { classRouter } from './routes/class.routes.js';
app.use('/api/v1/class', classRouter);

export { app };