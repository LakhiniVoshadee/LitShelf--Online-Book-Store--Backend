"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:5173',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/books", auth_middleware_1.authenticateToken, book_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/cart", auth_middleware_1.authenticateToken, cart_routes_1.default);
app.use("/api/orders", auth_middleware_1.authenticateToken, order_routes_1.default);
exports.default = app;
