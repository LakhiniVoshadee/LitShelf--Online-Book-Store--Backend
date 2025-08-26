import { Router } from "express";
import {
    authenticateUser,
    registerUser,
    updateUser,
    deleteUser,
    getCustomerByName, getAllCustomers
} from "../controllers/auth.controller";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware";

const authRouter: Router = Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/register", registerUser);
authRouter.put("/users/:id", authenticateToken, authorizeRoles("admin"), updateUser);
authRouter.delete("/users/:id", authenticateToken, authorizeRoles("admin"), deleteUser);
authRouter.get("/customers", authenticateToken, authorizeRoles("admin"), getAllCustomers);
authRouter.get("/customers/search", authenticateToken, authorizeRoles("admin"), getCustomerByName);

export default authRouter;