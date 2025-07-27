import { Request, Response } from "express";
import { savePaymentDetails } from "../services/payment.service";

export const savePaymentDetailsController = async (req: Request, res: Response) => {
    const userId = (req as Request & { user: any }).user.id;
    const orderId = parseInt(req.params.orderId);
    const paymentData = req.body;

    try {
        const payment = await savePaymentDetails(userId, orderId, paymentData);
        res.status(201).json(payment);
    } catch (error: unknown) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ error: errorMessage });
    }
};