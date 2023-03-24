"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const errors_1 = require("shared/errors");
const utils_1 = require("shared/utils");
const exceptions_1 = require("../exceptions");
const index_1 = require("../usecases/index");
class AuthController {
    static tokenMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            try {
                const decoded = yield index_1.verifyTokenUsecase.execute(authorization);
                req.decoded = decoded;
                return next();
            }
            catch (error) {
                if (error instanceof exceptions_1.MustBeLoggedIn || error instanceof exceptions_1.InvalidSession) {
                    return res.status(401).json({
                        messsage: "You must be logged in to access this",
                    });
                }
                if (error instanceof exceptions_1.SessionExpired) {
                    return res.status(401).json({
                        message: "Your session has expired please try again",
                    });
                }
                return (0, utils_1.handleUnknownError)(res, {
                    error,
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const response = yield index_1.loginUsecase.execute(email, password);
                return res.status(200).json({ token: response });
            }
            catch (error) {
                if (error instanceof exceptions_1.UserNotFound || error instanceof exceptions_1.InvalidSession) {
                    return res.status(401).json({
                        message: "Invalid Credentials",
                    });
                }
                if (error instanceof errors_1.InvalidInputData) {
                    return res.status(400).json({
                        message: "Invalid data",
                    });
                }
                return (0, utils_1.handleUnknownError)(res, {
                    error,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
