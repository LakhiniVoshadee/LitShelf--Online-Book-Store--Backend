import mongoose from "mongoose";

const bookModel = new mongoose.Schema(
    {
        "id": {
            required: true,
            type: Number,
            unique: true,
        },
        "title": {
            required: true,
            type: String,
            unique: true,
        },
        "author": {
            required: true,
            type: String,
        },
        "genre": {
            required: true,
            type: String,
        },
        "price": {
            required: true,
            type: Number,
        },
        "stock": {
            required: true,
            type: Number,
            default: 0,
        },
        "description": {
            required: true,
            type: String,
        },
        "coverImage": {
            type: String,
        },
        "publishedDate": {
            type: Date,
        },
        "createdAt": {
            type: Date,
            default: Date.now,
        },
        "updatedAt": {
            type: Date,
            default: Date.now,
        },
    }
);

const Book = mongoose.model('Book', bookModel);

export default Book;