import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: Number,
        required: true,
        unique: true,
    },
    orderId: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'failed', 'pending'],
        default: 'completed',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    additionalInfo: {
        type: Object,
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;