import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import User from "../model/user.model";
import { BookDto } from "../dto/book.dto";
import Book from "../model/book.model";

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL as string;

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendOrderConfirmationEmail = async (userId: number, order: any) => {
    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            console.error("User not found for email sending");
            return;
        }

        const bookDetails = await Promise.all(
            order.items.map(async (item: { bookId: number; quantity: number }) => {
                const book = await Book.findOne({ id: item.bookId }) as BookDto;
                return `${book.title} (Qty: ${item.quantity}, Price: ${book.currency} ${book.price})`;
            })
        );

        const emailContent = {
            to: user.username, // Assuming username is the email
            from: SENDGRID_SENDER_EMAIL,
            subject: `Order Confirmation - Order #${order.orderId}`,
            html: `
                <h2>Thank You for Your Order!</h2>
                <p>Dear ${user.username},</p>
                <p>Your order #${order.orderId} has been successfully placed.</p>
                <h3>Order Details:</h3>
                <ul>
                    ${bookDetails.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                <p><strong>Total Cost:</strong> ${order.currency} ${order.totalCost}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p>We will notify you when your order is shipped.</p>
                <p>Thank you for shopping with us!</p>
            `,
        };

        await sgMail.send(emailContent);
        console.log(`Order confirmation email sent to ${user.username}`);
    } catch (error) {
        console.error("Failed to send order confirmation email:", error);
        // Do not throw the error to avoid interrupting order placement
    }
};