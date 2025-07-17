import mongoose from "mongoose";

const donationModel = new mongoose.Schema(
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
        },
        amount: {
            type: Number,
        },
        type: {
            required: true,
            type: String,
            enum: ['book', 'monetary'],
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

const Donation = mongoose.model('Donation', donationModel);

export default Donation;