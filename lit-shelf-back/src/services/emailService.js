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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a transporter object using Gmail SMTP
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Function to generate a 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
// Function to send verification email
const sendVerificationEmail = (toEmail_1, ...args_1) => __awaiter(void 0, [toEmail_1, ...args_1], void 0, function* (toEmail, userName = 'User') {
    try {
        const verificationCode = generateVerificationCode();
        const mailOptions = {
            from: `"Library System" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Email Verification - Library System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Verification</h2>
                    <p>Hello ${userName},</p>
                    <p>Thank you for registering with our Library System. Please use the following verification code to verify your email address:</p>
                    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; letter-spacing: 2px; font-weight: bold;">
                        ${verificationCode}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this code, you can safely ignore this email.</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply directly to this email.</p>
                </div>
            `
        };
        yield transporter.sendMail(mailOptions);
        return { code: verificationCode, success: true };
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        return { code: '', success: false };
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
exports.default = {
    sendVerificationEmail: exports.sendVerificationEmail
};
