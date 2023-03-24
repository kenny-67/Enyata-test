"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = require("domains/auth/apis");
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.post("/", apis_1.authAPI.tokenMiddleware, controllers_1.OrdersController.createOrder);
router.get("/", apis_1.authAPI.tokenMiddleware, controllers_1.OrdersController.getOrders);
exports.default = router;
