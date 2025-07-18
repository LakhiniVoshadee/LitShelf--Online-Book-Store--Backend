import Book from "../model/book.model";
import { BookDto } from "../dto/book.dto";

export const getAllBooks = async (): Promise<BookDto[]> => {
    return Book.find();
};

export const saveBook = async (book: BookDto) => {
    return Book.create(book);
};

export const getBook = async (id: number): Promise<any> => {
    return Book.findOne({ id: id });
}

export const validateBook = (book: BookDto) => {
    if (!book.id || !book.title || !book.author || !book.genre || !book.price || !book.currency || !book.coverImage || !book.publicationYear || !book.publisher || !book.description || !book.pages || !book.language || !book.stock) {
        return 'All fields are required';
    }
    return null;
}
