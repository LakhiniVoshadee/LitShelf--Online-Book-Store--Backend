import { Request, Response } from "express";
import { placeOrder } from "../services/order.service";

export const placeOrderController = async (req: Request, res: Response) => {
    const userId = (req as Request & { user: any }).user.id; // Extracted from authenticated user
    try {
        const order = await placeOrder(userId);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};