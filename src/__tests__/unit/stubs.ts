import { AuthRepository } from "domains/auth/repositories/auth";
import { SessionManager } from "domains/auth/service/SessionManager";
import { OrderRepository } from "domains/orders/repositories/order";
import sinon from "sinon";

export const sandbox = sinon.createSandbox();

export const mockOrderRepository = sandbox.stub(OrderRepository);
export const mockAuthRepository = sandbox.stub(AuthRepository);
export const mockSessionManager = sandbox.stub(SessionManager);
