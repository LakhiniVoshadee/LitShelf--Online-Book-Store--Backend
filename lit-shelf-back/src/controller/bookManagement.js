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
exports.getAll = exports.overDueSendEmail = exports.updateBookBorrow = exports.addBookBorrow = void 0;
const BookManage_1 = require("../model/BookManage");
const Book_1 = require("../model/Book");
const mailSender_1 = require("./mailSender");
const LibraryMemberUser_1 = require("../model/LibraryMemberUser");
const addBookBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Add book borrow function called...........", req.body);
    try {
        const bookBorrowData = new BookManage_1.BorrowBookModel(req.body);
        const { bookId, memberId } = bookBorrowData;
        console.log("memberid", memberId);
        const book = yield Book_1.BookModel.findById(bookId);
        const user = yield LibraryMemberUser_1.LibraryMemberUserModel.findById({
            _id: memberId
        });
        bookBorrowData.memberEmail = (user === null || user === void 0 ? void 0 : user.email) || "";
        bookBorrowData.bookTitle = (book === null || book === void 0 ? void 0 : book.title) || "";
        const saveBorrow = yield bookBorrowData.save();
        if (saveBorrow) {
            //update available book -1
            const getBook = yield Book_1.BookModel.findOne({ _id: bookId });
            if (!getBook) {
                return res.status(400).json({
                    message: "Book not found",
                    status: 400
                });
            }
            if (getBook.availableCopies <= 0) {
                return res.status(400).json({
                    message: "No available copies of this book",
                    status: 400
                });
            }
            getBook.availableCopies = getBook.availableCopies - 1;
            const updateBook = yield getBook.save();
            if (updateBook) {
                const receipt = {
                    referenceNumber: saveBorrow._id.toString(),
                    bookId: bookBorrowData.bookId.toString(),
                    bookTitle: updateBook.title,
                    memberId: bookBorrowData.memberId.toString(),
                    memberEmail: bookBorrowData.memberEmail,
                    borrowDate: bookBorrowData.borrowDate,
                    returnDate: bookBorrowData.returnDate,
                    payStatus: bookBorrowData.payStatus,
                    payAmount: bookBorrowData.payAmount
                };
                yield (0, mailSender_1.mailReceipt)(receipt);
                return res.status(201).json({
                    message: "Book borrow added successfully",
                    bookBorrow: saveBorrow,
                    status: 201
                });
            }
            return res.status(400).json({
                message: "Book borrow not added",
                status: 400
            });
        }
    }
    catch (error) {
        console.error("Error adding book borrow:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.addBookBorrow = addBookBorrow;
const updateBookBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const borrow = req.body;
    borrow.status = 'returned';
    borrow.payStatus = 'paid';
    console.log("Update book borrow function called with ID:", borrow._id);
    try {
        const existingBorrow = yield BookManage_1.BorrowBookModel.findById(borrow._id);
        if (!existingBorrow) {
            return res.status(404).json({
                message: "Book borrow not found",
                status: 404
            });
        }
        const updatedBorrow = yield BookManage_1.BorrowBookModel.findByIdAndUpdate(borrow._id, borrow, { new: true, runValidators: true });
        if (!updatedBorrow) {
            return res.status(400).json({
                message: "Book borrow not updated",
                status: 400
            });
        }
        // If the status is changed to 'returned', update the book's available copies
        if (updatedBorrow.status === "returned") {
            const book = yield Book_1.BookModel.findById(updatedBorrow.bookId);
            if (!book) {
                return res.status(400).json({
                    message: "Book not found",
                    status: 400
                });
            }
            book.availableCopies += 1; // Increment available copies
            yield book.save();
            return res.status(200).json({
                message: "Book borrow updated successfully",
                bookBorrow: updatedBorrow,
                status: 200
            });
        }
    }
    catch (error) {
        console.error("Error updating book borrow:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.updateBookBorrow = updateBookBorrow;
const overDueSendEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowBook = req.body;
    console.log("Overdue send email function called with ID:", borrowBook._id);
    try {
        const existingBorrow = yield BookManage_1.BorrowBookModel.findById(borrowBook._id);
        if (!existingBorrow) {
            console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww11111111111111111111111");
            return res.status(404).json({
                message: "Book borrow not found",
                status: 404
            });
        }
        const receipt = {
            referenceNumber: existingBorrow._id.toString(),
            bookId: existingBorrow.bookId.toString(),
            bookTitle: existingBorrow.bookTitle,
            memberId: existingBorrow.memberId.toString(),
            memberEmail: borrowBook.memberEmail,
            borrowDate: existingBorrow.borrowDate,
            returnDate: existingBorrow.returnDate,
            payStatus: existingBorrow.payStatus,
            payAmount: existingBorrow.payAmount
        };
        console.log("recepit", receipt);
        console.log("Receipt to be sent:", receipt);
        const emailStatus = yield (0, mailSender_1.overdueEmail)(receipt);
        if (emailStatus === 200) {
            return res.status(200).json({
                message: "Overdue email sent successfully",
                status: 200
            });
        }
        else {
            return res.status(500).json({
                message: "Failed to send overdue email",
                status: 500
            });
        }
    }
    catch (error) {
        console.error("Error sending overdue email:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.overDueSendEmail = overDueSendEmail;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get all book borrow function called");
    try {
        const bookBorrows = yield BookManage_1.BorrowBookModel.find();
        if (bookBorrows.length === 0) {
            return res.status(404).json({
                message: "No book borrows found",
                status: 404
            });
        }
        return res.status(200).json({
            message: "Book borrows retrieved successfully",
            bookBorrows,
            status: 200
        });
    }
    catch (error) {
        console.error("Error retrieving book borrows:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.getAll = getAll;
