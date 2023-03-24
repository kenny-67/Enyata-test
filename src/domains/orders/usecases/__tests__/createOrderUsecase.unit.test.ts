import { expect } from "chai";
import { InvalidInputData } from "shared/errors";
import { mockOrderRepository } from "__tests__/unit/stubs";
import { CreateOrderUsecase } from "../CreateOrder";

const mockCreateOrderUsecase = new CreateOrderUsecase(mockOrderRepository);

describe("Create Order Usecase", () => {
  it("should correctly validate user inputs 1", async () => {
    try {
      mockCreateOrderUsecase.execute("", "", 3, "");
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidInputData);
    }
  });
  it("should correctly validate user inputs 2", () => {
    try {
      mockCreateOrderUsecase.execute("shoes", "", 3, "");
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidInputData);
    }
  });
  it("should correctly validate user inputs 3", () => {
    try {
      mockCreateOrderUsecase.execute("shoes", "", 3, "test@test.com");
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidInputData);
    }
  });
  it("should successfully create order", () => {
    try {
        mockCreateOrderUsecase.execute("shoes", "a black shoe", 3, "test@test.com");
      } catch (error) {
        expect(error).to.be.instanceOf(InvalidInputData);
      }
  });
});
