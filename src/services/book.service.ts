import Book from "../model/book.model";
import { BookDto } from "../dto/book.dto";

export const getAllBooks = async (): Promise<BookDto[]> => {
    return Book.find();
};

export const saveBook = async (book: BookDto) => {
    return Book.create(book);
};

/*
export const validateBook = async (book: BookDto) => {
    if (!book.id || !book.title) {
        return "Title, author, genre, price, and currency are required";
    }
    // Allow coverImage to be an empty string or undefined
    return null;
};*/
