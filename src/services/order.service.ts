import Cart from "../model/cart.model";
import Book from "../model/book.model";
import Order from "../model/order.model";

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
        const currency = firstBook.currency; // Assuming all books have the same currency

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
            status: 'pending',
        });

        await newOrder.save();

        // Clear the cart
        cart.items.remove({});
        await cart.save();

        return newOrder;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

async function generateUniqueOrderId(): Promise<number> {
    const lastOrder = await Order.findOne().sort({ orderId: -1 });
    return lastOrder ? lastOrder.orderId + 1 : 1;
}