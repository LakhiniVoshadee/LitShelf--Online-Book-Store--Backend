import Cart from "../model/cart.model";
import Book from "../model/book.model";

export const addToCart = async (userId: number, bookId: number, quantity: number) => {
    try {
        // Check if the book exists
        const book = await Book.findOne({ id: bookId });
        if (!book) {
            throw new Error("Book not found");
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
            });
        }

        // Check if the book is already in the cart
        const existingItem = cart.items.find(item => item.bookId === bookId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ bookId, quantity });
        }

        // Save the cart
        await cart.save();
        return cart;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};