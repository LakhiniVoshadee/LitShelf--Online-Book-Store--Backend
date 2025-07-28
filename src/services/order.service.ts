import Cart from "../model/cart.model";
import Book from "../model/book.model";
import Order from "../model/order.model";
import { sendOrderConfirmationEmail } from "./email.service";

export const placeOrder = async (userId: number) => {
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        let totalCost = 0;
        const firstBook = await Book.findOne({ id: cart.items[0].bookId });
        if (!firstBook) {
            throw new Error(`Book with id ${cart.items[0].bookId} not found`);
        }
        const currency = firstBook.currency;

        for (const item of cart.items) {
            const book = await Book.findOne({ id: item.bookId });
            if (!book) {
                throw new Error(`Book with id ${item.bookId} not found`);
            }
            if (book.stock < item.quantity) {
                throw new Error(`Not enough stock for book ${book.title}`);
            }
            totalCost += book.price * item.quantity;
            book.stock -= item.quantity;
            await book.save();
        }

        const orderId = await generateUniqueOrderId();
        const newOrder = new Order({
            orderId,
            userId,
            items: cart.items,
            totalCost,
            currency,
            status: 'pending_payment',
        });

        await newOrder.save();

        // Clear the cart
        cart.items.splice(0, cart.items.length);
        await cart.save();

        // Send order confirmation email (non-blocking)
        await sendOrderConfirmationEmail(userId, newOrder);

        return newOrder;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

async function generateUniqueOrderId(): Promise<number> {
    const lastOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const nextId = lastOrder && lastOrder.orderId ? lastOrder.orderId + 1 : 1;
    return nextId;
}