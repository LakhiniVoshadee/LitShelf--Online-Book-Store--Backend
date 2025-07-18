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
    // without validation
    try{
        const book = await bookService.saveBook(req.body);
        res.status(200).json(book);

    } catch (error){
        res.status(500).json({error: "Something went wrong"});
    }

}