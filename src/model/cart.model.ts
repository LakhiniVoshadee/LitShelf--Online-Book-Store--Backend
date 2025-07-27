import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true, // Ensures one cart per user
    },
    items: [
        {
            bookId: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to update the updatedAt timestamp
cartSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;