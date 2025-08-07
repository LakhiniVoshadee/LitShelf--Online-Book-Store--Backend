import Cart from "../model/cart.model";
import Book from "../model/book.model";
import Order from "../model/order.model";
import { sendOrderConfirmationEmail } from "./email.service";
import { NotFoundError } from "../middleware/error.middleware";

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

// Get all orders with pagination and optional status filter
export const getAllOrders = async (page: number = 1, limit: number = 10, status?: string) => {
    try {
        const skip = (page - 1) * limit;
        const query: any = {};

        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Order.countDocuments(query);

        return {
            orders,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

// Get order by orderId
export const getOrderById = async (orderId: number) => {
    try {
        const order = await Order.findOne({ orderId });
        if (!order) {
            throw new NotFoundError("Order not found");
        }
        return order;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};

// Update order status
export const updateOrderStatus = async (orderId: number, status: string, adminId: number) => {
    try {
        const validStatuses = ['pending_payment', 'paid', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status');
        }

        const order = await Order.findOneAndUpdate(
            { orderId },
            {
                status,
                updatedBy: adminId,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!order) {
            throw new NotFoundError("Order not found");
        }

        return order;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};
