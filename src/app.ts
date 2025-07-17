import express, {Express} from "express";

const app: Express = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
];


export default app;