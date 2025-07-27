import { Request, Response } from "express";
import * as cartService from "../services/cart.service";

export const addToCart = async (req: Request, res: Response) => {
    const userId = (req as Request & { user: any }).user.id; // Get userId from authenticated user
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity || quantity < 1) {
        return res.status(400).json({ error: "Invalid bookId or quantity" });
    }

    try {
        const cart = await cartService.addToCart(userId, bookId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};