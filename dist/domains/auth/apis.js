"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAPI = void 0;
const controllers_1 = require("./controllers");
exports.authAPI = {
    tokenMiddleware: controllers_1.AuthController.tokenMiddleware,
};
