"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        minlength: [2, "Name at least 2 characters"],
        required: [true, "Name is required"],
        trim: true
    },
    email: { type: String,
        unique: [true, "User already registered"],
        required: [true, "email is required"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "please fill a valid email format"]
    },
    password: { type: String, required: true },
    verificationCode: {
        type: Number,
        required: [true, "Verification code is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    mailSend: {
        type: Boolean,
        default: false
    }
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
