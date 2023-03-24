import app from "infrastructure/app";
import chai, { expect } from "chai";
import { createUser, deleteAllUser } from "__tests__/integration/helpers";
import { mockUserData } from "__tests__/integration/mocks";

describe("Login Integration Test", () => {
  before(async () => {
    createUser(mockUserData);
  });
  after(() => {
    deleteAllUser();
  });
  it("should fail if invalid input is provided", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: "",
      password: "",
    });

    expect(response.status).to.be.eql(400);
    expect(response.body.message).to.eql("Invalid data");
  });

  it("should fail if email is incorrect", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: "Invalid Email",
      password: mockUserData.password,
    });

    expect(response.status).to.be.eql(401);
  });
  it("should fail if password is incorrect", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: mockUserData.email,
      password: "Invalid Password",
    });

    expect(response.status).to.be.eql(401);
  });
  it("should successfully generate token", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: mockUserData.email,
      password: mockUserData.password,
    });

    expect(response.status).to.be.eql(200);
  });
});
