import { authAPI } from "domains/auth/apis";
import { Router } from "express";
import { OrdersController } from "./controllers";
const router = Router();

router.post("/", authAPI.tokenMiddleware, OrdersController.createOrder);
router.get("/", authAPI.tokenMiddleware, OrdersController.getOrders);

export default router;
