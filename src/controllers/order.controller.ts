import { Request, Response } from "express";
import { placeOrder } from "../services/order.service";

export const placeOrderController = async (req: Request, res: Response) => {
    const userId = (req as Request & { user: any }).user.id;
    try {
        const order = await placeOrder(userId);
        res.status(201).json(order);
    } catch (error: any) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: "Duplicate order ID detected. Please try again." });
        } else {
            res.status(500).json({ error: error.message || "Something went wrong" });
        }
    }
};