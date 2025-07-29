"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../error/ApiError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof mongoose_1.default.Error) {
        res.status(400).json({
            message: err.message
        });
    }
    if (err instanceof ApiError_1.APIError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: "Internal server error" });
};
exports.errorHandler = errorHandler;
