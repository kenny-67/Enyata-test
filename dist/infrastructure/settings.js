"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_TOKEN_SETTINGS = void 0;
require("dotenv/config");
exports.JWT_TOKEN_SETTINGS = {
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET || "shhhhjgirogongo#Y($Y*#Yy98y",
    accessTokenDuration: +(process.env.ACCESS_TOKEN_EXP_TIME_IN_SECONDS || 5 * 60),
};
