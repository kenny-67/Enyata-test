"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockOrders = void 0;
exports.mockOrders = process.env.NODE_ENV == "test"
    ? []
    : [
        {
            email: "john@example.com",
            title: "shoes",
            description: "A black shoe",
            price: 2000,
        },
        {
            email: "john@example.com",
            title: "shoes",
            description: "A red shoe",
            price: 3000,
        },
        {
            email: "jane@example.com",
            title: "bag",
            description: "hand bag",
            price: 3000,
        },
        {
            email: "jane@example.com",
            title: "bag",
            description: "shoulder bag",
            price: 4000,
        },
    ];
