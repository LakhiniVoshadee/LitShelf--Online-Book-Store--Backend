import mongoose from "mongoose";

const wishlistModel = new mongoose.Schema(
    {
        id: {
            required: true,
            type: Number,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
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
    }
);

const Wishlist = mongoose.model('Wishlist', wishlistModel);

export default Wishlist;