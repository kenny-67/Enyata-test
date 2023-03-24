import { expect } from "chai";
import { InvalidSession, UserNotFound } from "domains/auth/exceptions";
import { InvalidInputData } from "shared/errors";
import { mockAuthRepository, mockSessionManager } from "__tests__/unit/stubs";
import { LoginUsecase } from "../login";

const mockLoginUsecase = new LoginUsecase(
  mockAuthRepository,
  mockSessionManager
);

const mockTestUser = {
  email: "john@test.com",
  firstName: "John",
  lastName: "Doh",
  password: "123456",
};

describe("Login Usecase", () => {
  beforeEach(() => {
    mockAuthRepository.getUser.reset();
    mockSessionManager.generateAccessToken.reset();
  });
  it("should correctly validate user inputs", async () => {
    try {
      await mockLoginUsecase.execute("", "");
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidInputData);
    }
  });

  it("should fail if email is invalid", async () => {
    try {
      mockAuthRepository.getUser.returns(undefined);
      await mockLoginUsecase.execute("incorrect@test.com", "123456");
    } catch (error) {
      expect(error).to.be.instanceOf(UserNotFound);
    }
  });
  it("should should fail is password is invalid", async () => {
    try {
      mockAuthRepository.getUser.returns(mockTestUser);
      await mockLoginUsecase.execute("john@test.com", "1236");
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidSession);
    }
  });
  it("should successfully generate user token", async () => {
    mockAuthRepository.getUser.returns(mockTestUser);
    mockSessionManager.generateAccessToken.returns("a_random_token");
    const token = await mockLoginUsecase.execute("john@test.com", "123456");

    mockSessionManager.generateAccessToken.should.have.been.calledOnceWith(
      "john@test.com"
    );
    expect(token).to.eql("a_random_token");
  });
});
