import { Router } from "express";
import { savePaymentDetailsController } from "../controllers/payment.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const paymentRouter: Router = Router();

paymentRouter.post("/:orderId", authenticateToken, savePaymentDetailsController);

export default paymentRouter;