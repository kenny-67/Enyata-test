import { OrderRepository } from "../repositories/order";
import { CreateOrderUsecase } from "./CreateOrder";
import { GetOrdersUsecase } from "./GetOrders";

export const createOrderUsecase = new CreateOrderUsecase(OrderRepository);
export const getOrdersUsecase = new GetOrdersUsecase(OrderRepository);
