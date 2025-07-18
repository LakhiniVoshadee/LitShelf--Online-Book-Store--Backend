import Book from "../model/book.model";
import {BookDto} from "../dto/book.dto";


export const getAllBooks = async (): Promise<BookDto[]> => {
    return Book.find();
}

