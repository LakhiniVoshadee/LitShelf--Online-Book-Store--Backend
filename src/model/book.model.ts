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
        "currency": {
            required: true,
            type: String,
        },

        "coverImage": {
            required: true,
            type: String,
        }

    }
);

const Book = mongoose.model('Book', bookModel);

export default Book;