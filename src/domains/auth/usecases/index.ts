import { AuthRepository } from "../repositories/auth";
import { SessionManager } from "../service/SessionManager";
import { LoginUsecase } from "./login";
import { VerifyTokenUsecase } from "./verifyToken";

export const loginUsecase = new LoginUsecase(AuthRepository, SessionManager);
export const verifyTokenUsecase = new VerifyTokenUsecase(SessionManager);
