import { expect } from "chai";
import { SortByValues } from "domains/orders/types";
import { mockOrderRepository } from "__tests__/unit/stubs";
import { GetOrdersUsecase } from "../GetOrders";

const mockGetOrderUsecase = new GetOrdersUsecase(mockOrderRepository);

const mockInputs = {
  page: 1,
  userEmail: "john@test.com",
  maxPrice: 5000,
  minPrice: 1500,
  sortBy: "Ascending" as SortByValues,
};

const mockOrderResponse = {
  orders: [
    {
      email: "john@example.com",
      title: "shoes",
      description: "A black shoe",
      price: 2000,
    },
    {
      email: "john@example.com",
      title: "shoes",
      description: "A black shoe",
      price: 1000,
    },
  ],
  paginationMeta: {
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 5,
  },
};

describe("Get Order Usecase", () => {
  beforeEach(() => {
    mockOrderRepository.getOrders.reset();
  });
  it("should get user orders", async () => {
    mockOrderRepository.getOrders.returns(mockOrderResponse);
    const orders = await mockGetOrderUsecase.execute(
      mockInputs.page,
      mockInputs.sortBy,
      mockInputs.userEmail
    );
    mockOrderRepository.getOrders.should.have.been.calledOnceWith(
      mockInputs.userEmail,
      mockInputs.page
    );
    expect(orders.orders.length).to.eql(2);
    expect(orders.paginationMeta.currentPage).to.eql(mockInputs.page);
  });

  it("should correctly sort orders", async () => {
    mockOrderRepository.getOrders.returns(mockOrderResponse);
    const orders = await mockGetOrderUsecase.execute(
      mockInputs.page,
      "Ascending",
      mockInputs.userEmail
    );
    mockOrderRepository.getOrders.should.have.been.calledOnceWith(
      mockInputs.userEmail,
      mockInputs.page
    );
    expect(orders.orders[0].price).to.eql(1000);
    expect(orders.orders[1].price).to.eql(2000);
  });
  it("should correctly filter orders", async () => {
    mockOrderRepository.getOrders.returns({
      orders: [mockOrderResponse.orders[0]],
      paginationMeta: mockOrderResponse.paginationMeta,
    });
    const orders = await mockGetOrderUsecase.execute(
      mockInputs.page,
      mockInputs.sortBy,
      mockInputs.userEmail,
      mockInputs.maxPrice,
      mockInputs.minPrice
    );
    mockOrderRepository.getOrders.should.have.been.calledOnceWith(
      mockInputs.userEmail,
      mockInputs.page,
      mockInputs.maxPrice,
      mockInputs.minPrice
    );
    expect(orders.orders.length).to.eql(1);
  });
});
