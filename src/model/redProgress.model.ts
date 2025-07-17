import mongoose from "mongoose";

const preOrderModel = new mongoose.Schema(
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
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        status: {
            required: true,
            type: String,
            enum: ['pending', 'fulfilled'],
            default: 'pending',
        },
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

const PreOrder = mongoose.model('PreOrder', preOrderModel);

export default PreOrder;