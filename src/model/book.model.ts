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

    }
});

const Book = mongoose.model("Book", bookModel);

export default Book;