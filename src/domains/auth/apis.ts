import { AuthController } from "./controllers";

export const authAPI = {
  tokenMiddleware: AuthController.tokenMiddleware,
};

export type AuthAPIType = typeof authAPI;
