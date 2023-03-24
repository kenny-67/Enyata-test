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
exports.GetOrdersUsecase = void 0;
class GetOrdersUsecase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    execute(page, sortBy, userEmail, maxPrice, minPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanedPage = page > 0 ? page : 1;
            const orders = this.orderRepository.getOrders(userEmail, cleanedPage, maxPrice, minPrice);
            return {
                orders: this.handleSort(sortBy, orders.orders),
                paginationMeta: orders.paginationMeta,
            };
        });
    }
    handleSort(sortBy, orders) {
        if (sortBy == "Ascending") {
            return orders.sort((a, b) => a.price - b.price);
        }
        else {
            return orders.sort((a, b) => b.price - a.price);
        }
    }
}
exports.GetOrdersUsecase = GetOrdersUsecase;
