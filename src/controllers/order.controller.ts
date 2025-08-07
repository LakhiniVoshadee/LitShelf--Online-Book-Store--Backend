import { Request, Response } from "express";
import {
    placeOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} from "../services/order.service";
import { NotFoundError, ValidationError } from "../middleware/error.middleware";

// Customer: Place a new order
export const placeOrderController = async (req: Request, res: Response) => {
    const userId = (req as Request & { user: any }).user.id;
    try {
        const order = await placeOrder(userId);
        res.status(201).json({
            success: true,
            data: order,
            message: 'Order placed successfully'
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            res.status(400).json({
                success: false,
                error: "Duplicate order ID detected. Please try again."
            });
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
            res.status(500).json({
                success: false,
                error: errorMessage
            });
        }
    }
};

// Admin: Get all orders with pagination and filtering
export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const status = req.query.status as string | undefined;

        const result = await getAllOrders(page, limit, status);

        res.status(200).json({
            success: true,
            data: result.orders,
            pagination: result.pagination
        });
    } catch (error: unknown) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
};

// Admin: Get order by ID
export const getOrderByIdController = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        if (isNaN(orderId)) {
            throw new ValidationError("Invalid order ID");
        }

        const order = await getOrderById(orderId);

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error: unknown) {
        console.error("Error fetching order:", error);
        if (error instanceof NotFoundError) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        } else if (error instanceof ValidationError) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order';
            res.status(500).json({
                success: false,
                error: errorMessage
            });
        }
    }
};

// Admin: Update order status
export const updateOrderStatusController = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const { status } = req.body;
        const adminId = (req as Request & { user: any }).user.id;

        if (isNaN(orderId)) {
            throw new ValidationError("Invalid order ID");
        }

        if (!status) {
            throw new ValidationError("Status is required");
        }

        const updatedOrder = await updateOrderStatus(orderId, status, adminId);

        res.status(200).json({
            success: true,
            data: updatedOrder,
            message: `Order status updated to ${status} successfully`
        });
    } catch (error: unknown) {
        console.error("Error updating order status:", error);
        if (error instanceof NotFoundError) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        } else if (error instanceof ValidationError) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        } else if (error instanceof Error && error.message === 'Invalid status') {
            res.status(400).json({
                success: false,
                error: "Invalid status",
                validStatuses: ['pending_payment', 'paid', 'shipped', 'delivered', 'cancelled']
            });
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update order status';
            res.status(500).json({
                success: false,
                error: errorMessage
            });
        }
    }
};
