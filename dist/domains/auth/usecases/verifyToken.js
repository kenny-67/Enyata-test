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
exports.VerifyTokenUsecase = void 0;
const exceptions_1 = require("../exceptions");
class VerifyTokenUsecase {
    constructor(sessionManager) {
        this.sessionManager = sessionManager;
    }
    execute(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            authorization = authorization || "";
            const accessToken = this.getAccessToken(authorization);
            const { email } = yield this.sessionManager.verifyToken(accessToken);
            return {
                email,
            };
        });
    }
    getAccessToken(authorization) {
        const authorizationParts = authorization === null || authorization === void 0 ? void 0 : authorization.trim().split(" ");
        if (authorizationParts.length != 2) {
            throw new exceptions_1.MustBeLoggedIn();
        }
        if (authorizationParts[0].toLowerCase() !== "bearer") {
            throw new exceptions_1.MustBeLoggedIn();
        }
        return authorizationParts[1];
    }
}
exports.VerifyTokenUsecase = VerifyTokenUsecase;
