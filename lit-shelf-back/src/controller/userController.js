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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.verifyCode = exports.userRegister = exports.getAllUser = exports.getUser_2 = exports.deleteUser = exports.updateUser = exports.addUser = void 0;
const User_1 = require("../model/User");
const VerificationCodeGenerator_1 = require("../model/VerificationCodeGenerator");
const mailSender_1 = require("./mailSender");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LibraryMemberUser_1 = require("../model/LibraryMemberUser");
const SECRET = "ExiXGmnNx2pWE7eXj3sBtFabIjTpSZQ3";
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const libraryUser = new LibraryMemberUser_1.LibraryMemberUserModel(req.body);
    const id = req.body._id;
    libraryUser.id = id;
    console.log("library User", libraryUser);
    const existingUser = yield LibraryMemberUser_1.LibraryMemberUserModel.findOne({ email: libraryUser.email });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists with this email",
            status: 400
        });
    }
    try {
        const savedUser = yield libraryUser.save();
        return res.status(201).json({
            message: "User added successfully",
            user: savedUser,
            status: 201
        });
    }
    catch (error) {
        console.error("Error adding user:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.addUser = addUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update user...............................................................................................................");
    try {
        console.log("Update user", req.body);
        const email = req.body.email;
        const existingUser = yield LibraryMemberUser_1.LibraryMemberUserModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                message: "User not found with this email",
                status: 400
            });
        }
        const updateUser = LibraryMemberUser_1.LibraryMemberUserModel.findByIdAndUpdate({
            _id: existingUser._id
        }, req.body, { new: true, runValidators: true });
        if (!updateUser) {
            return res.status(400).json({
                message: "User not updated",
                status: 400
            });
        }
        if (yield updateUser) {
            return res.status(201).json({
                message: "User updated successfully",
                status: 201
            });
        }
    }
    catch (e) {
        console.error("Error updating user:", e);
        next(e);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete user...............................................................................................................", req.body);
    const userId = req.body._id;
    try {
        const user = yield LibraryMemberUser_1.LibraryMemberUserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404
            });
        }
        return res.status(200).json({
            message: "User deleted successfully",
            status: 200
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.deleteUser = deleteUser;
const getUser_2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        const user = yield LibraryMemberUser_1.LibraryMemberUserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404
            });
        }
        return res.status(200).json({
            user,
            status: 200
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.getUser_2 = getUser_2;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield LibraryMemberUser_1.LibraryMemberUserModel.find();
        return res.status(200).json({
            message: users,
            status: 200
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.getAllUser = getAllUser;
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const existUser = yield User_1.UserModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User already registered with this email",
                status: 400
            });
        }
        const verificationCode = (0, VerificationCodeGenerator_1.VerificationCodeGenerator)();
        const user = new User_1.UserModel(Object.assign(Object.assign({}, req.body), { verificationCode }));
        const mailResponse = yield (0, mailSender_1.mailSender)(user);
        if (mailResponse !== 200) {
            return res.status(400).json({
                message: "Failed to send verification email",
                status: 400
            });
        }
        const newUser = yield user.save();
        return res.status(200).json({
            message: `User registered successfully. Verification code sent to ${user.email}`,
            status: 200
        });
    }
    catch (err) {
        console.error("Error in user registration:", err);
        next(err);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.userRegister = userRegister;
const verifyCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, verificationCode } = req.body;
        const user = yield User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404
            });
        }
        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({
                message: "Invalid verification code",
                status: 400
            });
        }
        user.isVerified = true;
        user.verificationCode = 123456; // Reset to default
        yield user.save();
        return res.status(200).json({
            message: "User verified successfully",
            status: 200
        });
    }
    catch (err) {
        console.error("Error in user verification:", err);
        next(err);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.verifyCode = verifyCode;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials",
                status: 404
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid credentials",
                status: 401
            });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first",
                status: 403
            });
        }
        const token = jsonwebtoken_1.default.sign({ email }, SECRET, { expiresIn: "3h" });
        return res.status(200).json({
            token,
            status: 200
        });
    }
    catch (error) {
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const user = yield User_1.UserModel.findOne({ email: userEmail });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            status: 404
        });
    }
    return res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified
        },
        status: 200
    });
});
exports.getUser = getUser;
