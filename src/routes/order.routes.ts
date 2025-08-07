import { Router } from "express";
import { 
    placeOrderController, 
    getAllOrdersController, 
    getOrderByIdController, 
    updateOrderStatusController 
} from "../controllers/order.controller";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware";

const orderRouter: Router = Router();

// Customer routes
orderRouter.post("/place", 
    authenticateToken, 
    authorizeRoles("customer"), 
    placeOrderController
);

// Admin routes
orderRouter.get("/admin/orders", 
    authenticateToken, 
    authorizeRoles("admin"), 
    getAllOrdersController
);

orderRouter.get("/admin/orders/:orderId", 
    authenticateToken, 
    authorizeRoles("admin"), 
    getOrderByIdController
);

orderRouter.patch("/admin/orders/:orderId/status", 
    authenticateToken, 
    authorizeRoles("admin"), 
    updateOrderStatusController
);

export default orderRouter;