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
exports.CreateOrderUsecase = void 0;
const errors_1 = require("shared/errors");
class CreateOrderUsecase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    execute(title, description, price, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateInput({ title, description, price });
            const cleanedInput = this.cleanInput({ title, description, price });
            return this.orderRepository.createOrder(userEmail, cleanedInput.title, cleanedInput.description, cleanedInput.price);
        });
    }
    validateInput(input) {
        if (!input.title || !input.description || !input.price || isNaN(input.price)) {
            throw new errors_1.InvalidInputData();
        }
    }
    cleanInput(input) {
        return {
            title: input.title.trim(),
            description: input.description.trim(),
            price: +input.price
        };
    }
}
exports.CreateOrderUsecase = CreateOrderUsecase;
