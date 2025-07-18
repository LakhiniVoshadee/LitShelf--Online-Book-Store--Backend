import mongoose from "mongoose";

const bookModel = new mongoose.Schema({
    id: {
        required: true,
        type: Number,
        unique: true,
    },
    title: {
        required: true,
        type: String

    },
    author: {
        required: true,
        type: String,
    },
    genre: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    currency: {
        required: true,
        type: String,
    },
    coverImage: {
        required: true,
        type: String,
    },
    publicationYear: {
        required: true,
        type: Number,
    },
    publisher: {
        type: String,
    },
    description: {
        required: true,
        type: String
    },
    pages: {
        type: Number,
    },
    language: {
        required: true,
        type: String,
        default: 'English'
    },
    stock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

const Book = mongoose.model("Book", bookModel);

export default Book;