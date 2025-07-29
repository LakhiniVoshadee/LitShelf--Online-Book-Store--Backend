/*
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv";
import rootRouter from "./routes";
import {connectDB} from "./config/db";
dotenv.config();



const app = express();
const PORT = 3000;  // use env file

app.use(cors())
app.use(express.json());
app.use("/api",rootRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('MongoDB is Connected');
});



(async () =>{
connectDB().then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
})();

*/
