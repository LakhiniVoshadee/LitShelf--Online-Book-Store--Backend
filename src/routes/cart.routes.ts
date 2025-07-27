import { Router } from "express";
import { addToCart } from "../controllers/cart.controller";

const cartRouter: Router = Router();

cartRouter.post("/add", addToCart);

export default cartRouter;