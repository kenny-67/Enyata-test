"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenUsecase = exports.loginUsecase = void 0;
const auth_1 = require("../repositories/auth");
const SessionManager_1 = require("../service/SessionManager");
const login_1 = require("./login");
const verifyToken_1 = require("./verifyToken");
exports.loginUsecase = new login_1.LoginUsecase(auth_1.AuthRepository, SessionManager_1.SessionManager);
exports.verifyTokenUsecase = new verifyToken_1.VerifyTokenUsecase(SessionManager_1.SessionManager);
