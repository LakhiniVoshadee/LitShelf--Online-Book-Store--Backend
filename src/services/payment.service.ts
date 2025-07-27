import Payment from "../model/payment.model";
import Order from "../model/order.model";

export const savePaymentDetails = async (userId: number, orderId: number, paymentData: any) => {
    const { paymentMethod, transactionId, amountPaid, currency, additionalInfo } = paymentData;

    const order = await Order.findOne({ orderId });
    if (!order) {
        throw new Error("Order not found");
    }

    if (order.userId !== userId) {
        throw new Error("Unauthorized");
    }

    if (order.status !== 'pending_payment') {
        throw new Error("Order is not pending payment");
    }

    if (order.totalCost !== amountPaid || order.currency !== currency) {
        throw new Error("Payment amount or currency does not match order");
    }

    const paymentId = await generateUniquePaymentId();

    const payment = new Payment({
        paymentId,
        orderId,
        paymentMethod,
        transactionId,
        amountPaid,
        currency,
        status: 'completed',
        timestamp: new Date(),
        additionalInfo,
    });

    await payment.save();

    order.status = 'paid';
    await order.save();

    return payment;
};

async function generateUniquePaymentId(): Promise<number> {
    const lastPayment = await Payment.findOne().sort({ paymentId: -1 });
    return lastPayment ? lastPayment.paymentId + 1 : 1;
}