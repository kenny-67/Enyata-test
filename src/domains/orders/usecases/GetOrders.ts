import { OrderEntity } from "../entities";
import { OrderRepositoryType } from "../repositories/order";
import { SortByValues } from "../types";

export class GetOrdersUsecase {
  constructor(private orderRepository: OrderRepositoryType) {}
  async execute(
    page: number,
    sortBy: SortByValues,
    userEmail: string,
    maxPrice?: number,
    minPrice?: number
  ) {
    const cleanedPage = page > 0 ? page : 1;
    const orders = this.orderRepository.getOrders(
      userEmail,
      cleanedPage,
      maxPrice,
      minPrice
    );
    return {
      orders: this.handleSort(sortBy, orders.orders),
      paginationMeta: orders.paginationMeta,
    };
  }
  private handleSort(sortBy: SortByValues, orders: OrderEntity[]) {
    if (sortBy == "Ascending") {
      return orders.sort((a, b) => a.price - b.price);
    } else {
      return orders.sort((a, b) => b.price - a.price);
    }
  }
}
