import { NextFunction, Request, Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils";
import {
  InvalidSession,
  MustBeLoggedIn,
  SessionExpired,
  UserNotFound,
} from "../exceptions";
import { loginUsecase, verifyTokenUsecase } from "../usecases/index";

export class AuthController {
  static async tokenMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const authorization = req.headers.authorization;
    try {
      const decoded = await verifyTokenUsecase.execute(authorization as string);
      req.decoded = decoded;

      return next();
    } catch (error) {
      if (error instanceof MustBeLoggedIn || error instanceof InvalidSession) {
        return res.status(401).json({
          messsage: "You must be logged in to access this",
        });
      }
      if (error instanceof SessionExpired) {
        return res.status(401).json({
          message: "Your session has expired please try again",
        });
      }
      return handleUnknownError(res, {
        error,
      });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const response = await loginUsecase.execute(email, password);

      return res.status(200).json({ token: response });
    } catch (error) {
      if (error instanceof UserNotFound || error instanceof InvalidSession) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid data",
        });
      }
      return handleUnknownError(res, {
        error,
      });
    }
  }
}
