import { Router } from "express";
import { placeOrderController } from "../controllers/order.controller";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware";

const orderRouter: Router = Router();

orderRouter.post("/place", authenticateToken, authorizeRoles("customer"), placeOrderController);

export default orderRouter;