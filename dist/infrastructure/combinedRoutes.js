"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("domains/auth/index");
const index_2 = require("domains/orders/index");
function combinedRoutes(app) {
    const routesWithoutCorsSetting = (0, express_1.Router)();
    routesWithoutCorsSetting.use((0, cors_1.default)());
    routesWithoutCorsSetting.use("/auth", index_1.authRoutes);
    routesWithoutCorsSetting.use("/order", index_2.orderRoutes);
    app.use("/api", routesWithoutCorsSetting);
}
exports.default = combinedRoutes;
