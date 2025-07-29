import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to generate a 6-digit verification code
const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send verification email
export const sendVerificationEmail = async (toEmail: string, userName: string = 'User'): Promise<{code: string, success: boolean}> => {
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

        await transporter.sendMail(mailOptions);
        return { code: verificationCode, success: true };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { code: '', success: false };
    }
};

export default {
    sendVerificationEmail
};
