"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const errors_1 = require("shared/errors");
const utils_1 = require("shared/utils");
const index_1 = require("../usecases/index");
class OrdersController {
    static createOrder(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, price } = req.body;
            try {
                yield index_1.createOrderUsecase.execute(title, description, price, (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.email);
                return res.status(201).json({ message: "Order Created" });
            }
            catch (error) {
                if (error instanceof errors_1.InvalidInputData) {
                    return res.status(400).json({
                        message: "Invalid data",
                    });
                }
                return (0, utils_1.handleUnknownError)(res, {
                    error,
                });
            }
        });
    }
    static getOrders(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, sortBy = "Descending", maxPrice, minPrice } = req.query;
            try {
                const response = yield index_1.getOrdersUsecase.execute(page, sortBy, (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.email, maxPrice, minPrice);
                return res
                    .status(200)
                    .json({ message: "Successfully retrieved orders", data: response });
            }
            catch (error) {
                if (error instanceof errors_1.InvalidInputData) {
                    return res.status(400).json({
                        message: "Invalid data",
                    });
                }
                return (0, utils_1.handleUnknownError)(res, {
                    error,
                });
            }
        });
    }
}
exports.OrdersController = OrdersController;
