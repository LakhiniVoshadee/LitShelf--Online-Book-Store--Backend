import express, {Express} from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes";
import authRoutes from "./routes/auth.routes";
import {authenticateToken} from "./middleware/auth.middleware";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";



const app: Express = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }

    }

}
app.use(cors(corsOptions));

app.use("/api/books", authenticateToken, bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", authenticateToken, cartRoutes);
app.use("/api/orders", authenticateToken, orderRoutes);


export default app;