import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const authenticateUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const authTokens = await authService.authenticateUser(username, password);
        if (!authTokens) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        res.json(authTokens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body;
        const validationError = authService.validateUser(newUser);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const savedUser = await authService.saveUser(newUser);
        res.status(201).json({
            id: savedUser.id,
            username: savedUser.username,
            role: savedUser.role,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const updatedData = req.body;
        const updatedUser = await authService.updateUser(userId, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            id: updatedUser.id,
            username: updatedUser.username,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const deleted = await authService.deleteUser(userId);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};