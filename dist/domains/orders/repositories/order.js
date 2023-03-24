"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const mockOrders_1 = require("./mockOrders");
class OrderRepository {
    static createOrder(email, title, description, price) {
        return mockOrders_1.mockOrders.push({ email, title, description, price });
    }
    static getOrders(email, page, maxPrice = Infinity, minPrice = 0) {
        const itemsPerPage = 5;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const orders = [];
        mockOrders_1.mockOrders.forEach((order) => {
            if (order.email == email &&
                order.price >= minPrice &&
                order.price <= maxPrice) {
                orders.push(order);
            }
        });
        const totalPages = Math.ceil(mockOrders_1.mockOrders.length / itemsPerPage);
        return {
            orders: orders.slice(startIndex, endIndex),
            paginationMeta: {
                totalPages,
                currentPage: page,
                itemsPerPage,
            },
        };
    }
}
exports.OrderRepository = OrderRepository;
