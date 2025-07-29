import {NextFunction,Request,Response} from "express";
import {BookModel} from "../model/Book";

export const addBook = async (req:Request, res:Response,next:NextFunction):Promise<any> => {
    console.log("Add book function called");
    try {
        const bookData = new BookModel(req.body);
        const title = bookData.title;
        const existBook = await BookModel.findOne({title})

        console.log("existBook .............",existBook);

        if(existBook){
            return res.status(400).json({
                message: "Book with this title already exists",
                status: 400
            });
        }
        const savedBook = await bookData.save();
        if(!savedBook){
            return res.status(400).json({
                message: "Book not added",
                status: 400
            });
        }
        return res.status(201).json({
            message: "Book added successfully",
            book: bookData,
            status: 201
        });
    } catch (error) {
        console.error("Error adding book:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }

}
export const updateBook = async (req:Request, res:Response,next:NextFunction):Promise<any> => {
    console.log("Update book function called");
    try {
        const bookData = req.body;
        const title = bookData.title;
        const existingBook = await BookModel.findOne({title});

        if (!existingBook) {
            return res.status(400).json({
                message: "Book not found with this title",
                status: 400
            });
        }

        const updatedBook = await BookModel.findByIdAndUpdate({
            _id: existingBook._id
        }, bookData, { new: true, runValidators: true
        })
        if (!updatedBook) {
            return res.status(400).json({
                message: "Book not updated",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
            status: 200
        });
    } catch (error) {
        console.error("Error updating book:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
}
export const deleteBook = async (req:Request, res:Response,next:NextFunction):Promise<any> => {
    console.log("Delete book function called");

       try{
           const bookId = req.body._id;
           const deletedBook = await BookModel.findByIdAndDelete(bookId)
           if (!deletedBook) {
               return res.status(404).json({
                   message: "Book not found",
                   status: 404
               });
           }
           return res.status(200).json({
               message: "Book deleted successfully",
               status: 200
           });
       }catch (e) {
        console.error("Error deleting book:", e);
        next(e);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });

       }

}
export const getBook = async (req:Request, res:Response,next:NextFunction):Promise<any> => {}
export const getAllBook = async (req:Request, res:Response,next:NextFunction):Promise<any> => {
    console.log("Get all books function called");
    try {
        const books = await BookModel.find();
        if (!books || books.length === 0) {
            return res.status(404).json({
                message: "No books found",
                status: 404
            });
        }
        return res.status(200).json({
            message: "Books retrieved successfully",
            books: books,
            status: 200
        });
    } catch (error) {
        console.error("Error retrieving books:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
}
