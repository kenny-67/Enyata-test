import app from "infrastructure/app";
import chai, { expect } from "chai";
import {
  createUser,
  deleteAllOrders,
  deleteAllUser,
  loginUser,
} from "__tests__/integration/helpers";
import { mockUserData } from "__tests__/integration/mocks";

let accessToken: string;

describe("Create Order Integration Test", () => {
  before(async () => {
    createUser(mockUserData);
    const token = await loginUser(mockUserData.email, mockUserData.password);
    accessToken = token;
  });
  beforeEach(() => {
    deleteAllOrders();
  });
  after(() => {
    deleteAllUser();
  });
  it("should fail if user is not logged in", async () => {
    const response = await chai.request(app).post("/api/order").send({
      title: "shoes",
      descripton: "A black shoe",
      price: 200,
    });

    expect(response.status).to.be.eql(401);
  });
  it("should fail if invalid input is provided", async () => {
    const response = await chai
      .request(app)
      .post("/api/order")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        title: "bags",
        description: "",
        price: 100,
      });

    expect(response.status).to.be.eql(400);
    expect(response.body.message).to.eql("Invalid data");
  });
  it("should successfully create order", async () => {
    const response = await chai
      .request(app)
      .post("/api/order")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        title: "bags",
        description: "a blue bag",
        price: 100,
      });

    expect(response.status).to.be.eql(201);
    expect(response.body.message).to.eql("Order Created");
  });
});
