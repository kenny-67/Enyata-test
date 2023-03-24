import { mockUsers } from "domains/auth/repositories/mockUsers";
import app from "infrastructure/app";
import chai from "chai";
import { OrderEntity } from "domains/orders/entities";
import { mockOrders } from "domains/orders/repositories/mockOrders";

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const createUser = (data: UserData) => {
  mockUsers.push(data);
};
export const deleteAllUser = () => {
  for (let i = 0; i <= mockUsers.length; i++) {
    mockUsers.pop();
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await chai.request(app).post("/api/auth/login").send({
    email,
    password,
  });
  return response.body.token;
};

export const createOrder = (order: OrderEntity) => {
  mockOrders.push(order);
};

export const deleteAllOrders = () => {
  for (let i = 0; i <= mockOrders.length; i++) {
    mockOrders.pop();
  }
};
