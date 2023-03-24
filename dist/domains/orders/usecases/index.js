"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersUsecase = exports.createOrderUsecase = void 0;
const order_1 = require("../repositories/order");
const CreateOrder_1 = require("./CreateOrder");
const GetOrders_1 = require("./GetOrders");
exports.createOrderUsecase = new CreateOrder_1.CreateOrderUsecase(order_1.OrderRepository);
exports.getOrdersUsecase = new GetOrders_1.GetOrdersUsecase(order_1.OrderRepository);
