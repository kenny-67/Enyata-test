import app from "infrastructure/app";
import chai, { expect } from "chai";
import {
  createOrder,
  createUser,
  deleteAllOrders,
  deleteAllUser,
  loginUser,
} from "__tests__/integration/helpers";
import { mockUserData } from "__tests__/integration/mocks";

let accessToken: string;

describe("Get Orders integration Test", () => {
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
    const response = await chai.request(app).get("/api/order");

    expect(response.status).to.be.eql(401);
  });
  it("should only get orders belonging to the logged in user", async () => {
    createOrder({
      email: "test@test.com",
      title: "bags",
      description: "a blue bag",
      price: 100,
    });
    await createOrder({
      email: "john@test.com",
      title: "shoes",
      description: "a blue shoe",
      price: 1000,
    });

    const response = await chai
      .request(app)
      .get("/api/order")
      .query({ page: 1 })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).to.eql(200);
    expect(response.body.data.orders.length).to.eql(1);
    expect(response.body.data.orders[0].title).to.eql("shoes");
    expect(response.body.data.orders[0].price).to.eql(1000);
  });
  it("should correctly sort user order", async () => {
    createOrder({
      email: "john@test.com",
      title: "bags",
      description: "a blue bag",
      price: 100,
    });
    await createOrder({
      email: "john@test.com",
      title: "shoes",
      description: "a blue shoe",
      price: 1000,
    });
    const response = await chai
      .request(app)
      .get("/api/order")
      .query({ page: 1, sortBy: "Ascending" })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).to.eql(200);
    expect(response.body.data.orders[0].price).to.eql(100);
    expect(response.body.data.orders[1].price).to.eql(1000);
  });
  it("should correctly filter user order", async () => {
    createOrder({
      email: "john@test.com",
      title: "bags",
      description: "a blue bag",
      price: 100,
    });
    await createOrder({
      email: "john@test.com",
      title: "shoes",
      description: "a blue shoe",
      price: 1000,
    });
    const response = await chai
      .request(app)
      .get("/api/order")
      .query({ page: 1, maxPrice: 4000, minPrice: 500 })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).to.eql(200);
    expect(response.body.data.orders.length).to.eql(1);
    expect(response.body.data.orders[0].price).to.eql(1000);
  });
});
