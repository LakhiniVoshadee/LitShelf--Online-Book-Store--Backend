"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        unique: [true, "Book title must be unique"],
        required: [true, "Title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    availableCopies: {
        type: Number,
        required: [true, "Available copies are required"],
        min: [0, "Available copies cannot be negative"]
    },
    totalCopies: {
        type: Number,
        required: [true, "Total copies are required"],
        min: [0, "Total copies cannot be negative"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    }
});
exports.BookModel = mongoose_1.default.model('Book', bookSchema);
