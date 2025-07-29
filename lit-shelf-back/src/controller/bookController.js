"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBook = exports.getBook = exports.deleteBook = exports.updateBook = exports.addBook = void 0;
const Book_1 = require("../model/Book");
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Add book function called");
    try {
        const bookData = new Book_1.BookModel(req.body);
        const title = bookData.title;
        const existBook = yield Book_1.BookModel.findOne({ title });
        console.log("existBook .............", existBook);
        if (existBook) {
            return res.status(400).json({
                message: "Book with this title already exists",
                status: 400
            });
        }
        const savedBook = yield bookData.save();
        if (!savedBook) {
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
    }
    catch (error) {
        console.error("Error adding book:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.addBook = addBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update book function called");
    try {
        const bookData = req.body;
        const title = bookData.title;
        const existingBook = yield Book_1.BookModel.findOne({ title });
        if (!existingBook) {
            return res.status(400).json({
                message: "Book not found with this title",
                status: 400
            });
        }
        const updatedBook = yield Book_1.BookModel.findByIdAndUpdate({
            _id: existingBook._id
        }, bookData, { new: true, runValidators: true
        });
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
    }
    catch (error) {
        console.error("Error updating book:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete book function called");
    try {
        const bookId = req.body._id;
        const deletedBook = yield Book_1.BookModel.findByIdAndDelete(bookId);
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
    }
    catch (e) {
        console.error("Error deleting book:", e);
        next(e);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.deleteBook = deleteBook;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getBook = getBook;
const getAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get all books function called");
    try {
        const books = yield Book_1.BookModel.find();
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
    }
    catch (error) {
        console.error("Error retrieving books:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.getAllBook = getAllBook;
