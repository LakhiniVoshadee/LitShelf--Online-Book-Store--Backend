"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const borrowBookSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Book ID is required"]
    },
    bookTitle: {
        type: String,
        required: [true, "Book title is required"],
        trim: true
    },
    memberId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'LibraryMemberUser',
        required: [true, "User ID is required"]
    },
    memberEmail: {
        type: String,
        required: [true, "User name is required"],
        trim: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: [true, "Return date is required"]
    },
    status: {
        type: String,
        enum: ["borrowed", "returned", "overdue"],
        default: "borrowed"
    },
    payStatus: {
        type: String,
        enum: ["paid", "lending"],
        default: "lending"
    },
    payAmount: {
        type: Number,
        default: 0
    }
});
exports.BorrowBookModel = mongoose_1.default.model('BorrowBook', borrowBookSchema);
