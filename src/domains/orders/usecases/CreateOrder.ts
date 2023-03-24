import { InvalidInputData } from "shared/errors";
import { OrderRepositoryType } from "../repositories/order";

type InputType = {
  title: string;
  description: string;
  price: number;
};

export class CreateOrderUsecase {
  constructor(private orderRepository: OrderRepositoryType) {}
  async execute(
    title: string,
    description: string,
    price: number,
    userEmail: string
  ) {
    this.validateInput({ title, description, price });
    const cleanedInput = this.cleanInput({ title, description, price });
    return this.orderRepository.createOrder(
      userEmail,
      cleanedInput.title,
      cleanedInput.description,
      cleanedInput.price
    );
  }
  private validateInput(input: InputType) {
    if (!input.title || !input.description || !input.price || isNaN(input.price)) {
      throw new InvalidInputData();
    }
  }
  private cleanInput(input: InputType) {
    return {
      title: input.title.trim(),
      description: input.description.trim(),
      price: +input.price
    };
  }
}
