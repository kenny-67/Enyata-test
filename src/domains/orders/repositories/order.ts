import { OrderEntity } from "../entities";
import { mockOrders } from "./mockOrders";

export class OrderRepository {
  public static createOrder(
    email: string,
    title: string,
    description: string,
    price: number
  ) {
    return mockOrders.push({ email, title, description, price });
  }
  public static getOrders(
    email: string,
    page: number,
    maxPrice = Infinity,
    minPrice = 0
  ) {
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const orders: OrderEntity[] = [];
    mockOrders.forEach((order) => {
      if (
        order.email == email &&
        order.price >= minPrice &&
        order.price <= maxPrice
      ) {
        orders.push(order);
      }
    });

    const totalPages = Math.ceil(mockOrders.length / itemsPerPage);

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

export type OrderRepositoryType = typeof OrderRepository;
