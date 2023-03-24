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
exports.LoginUsecase = void 0;
const errors_1 = require("shared/errors");
const exceptions_1 = require("../exceptions");
class LoginUsecase {
    constructor(authRepository, sessionManager) {
        this.authRepository = authRepository;
        this.sessionManager = sessionManager;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateInput({ email, password });
            const cleanedInput = this.cleanInput({ email, password });
            const user = this.getUser(cleanedInput.email);
            this.validatePassword(user, cleanedInput.password);
            return this.sessionManager.generateAccessToken(cleanedInput.email);
        });
    }
    validateInput(input) {
        if (!input.email || !input.password) {
            throw new errors_1.InvalidInputData();
        }
    }
    cleanInput(input) {
        return {
            email: input.email.trim(),
            password: input.password.trim(),
        };
    }
    getUser(email) {
        const user = this.authRepository.getUser(email);
        if (!user) {
            throw new exceptions_1.UserNotFound();
        }
        return user;
    }
    validatePassword(user, passworrd) {
        if (user.password !== passworrd)
            throw new exceptions_1.InvalidSession();
    }
}
exports.LoginUsecase = LoginUsecase;
