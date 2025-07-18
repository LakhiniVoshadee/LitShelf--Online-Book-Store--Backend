import {Request, Response} from "express";
import * as bookService from "../services/book.service";


export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"});
    }
}

export const saveBook = async (req: Request, res: Response) => {

    try {
        const newBook = req.body;
        const validationError = bookService.validateBook(newBook);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const savedBook = await bookService.saveBook(newBook);
        res.status(201).json(savedBook);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"});
    }

}


export const getBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({error: "Invalid book id"});
        return;
    }
    const book = await bookService.getBook(bookId);
    if (!book) {
        res.status(404).json({error: "Book not found"});
        return;
    }
    res.status(200).json(book);
}

export const updateBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({error: "Invalid book id"});
        return;
    }
    const updatedData = req.body;
    const updateBook = await bookService.updateBook(bookId, updatedData);
    if (!updateBook) {
        res.status(404).json({
            error: "Book not found"
        });
        return;
    }
    res.status(200).json(updateBook);
}

export const deleteBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({error: "Invalid book id"});
        return;
    }
    const deletedBook = await bookService.deleteBook(bookId);
    if (!deletedBook) {
        res.status(404).json({
            error: "Book not found"
        });
        return;
    }
    res.status(200).json({
        message: "Book deleted successfully"
    });
    return;
}