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

    try{
        const newBook = req.body;
        const validationError = bookService.validateBook(newBook);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const savedBook = await bookService.saveBook(newBook);
        res.status(201).json(savedBook);

    } catch (error){
        console.log(error)
        res.status(500).json({error: "Something went wrong"});
    }

}