import Book from "../model/book.model";
import {BookDto} from "../dto/book.dto";

export const getAllBooks = async (): Promise<BookDto[]> => {
    return Book.find();
};

export const saveBook = async (book: BookDto) => {
    return Book.create(book);
};

export const getBook = async (id: number): Promise<any> => {
    return Book.findOne({id: id});
}

export const getBookByTitle = async (title: string): Promise<any> => {
    return Book.findOne({title: {$regex: `^${title}$`, $options: 'i'}});
};

export const getBooksByGenre = async (genre: string): Promise<any> => {
    return Book.find({ genre: { $regex: genre, $options: 'i' } });
};

export const updateBook = async (id: number, data: BookDto) => {

    const book = await Book.findOneAndUpdate({id: id}, data, {new: true});

    if (!book) {
        return null;
    }
    return book;
}

export const deleteBook = async (id: number) => {
    await Book.deleteOne({id: id});
    return true;
}

export const validateBook = (book: BookDto) => {
    if (!book.id || !book.title || !book.author || !book.genre || !book.price || !book.currency || !book.coverImage || !book.publicationYear || !book.publisher || !book.description || !book.pages || !book.language || !book.stock) {
        return 'All fields are required';
    }
    return null;
}
