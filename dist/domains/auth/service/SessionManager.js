"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const settings_1 = require("infrastructure/settings");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const exceptions_1 = require("../exceptions");
class SessionManager {
    static generateToken(data, expTimeInSec) {
        return jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + expTimeInSec, data }, this.JWT_TOKEN_SECRET);
    }
    static verifyToken(token) {
        try {
            const { data } = jsonwebtoken_1.default.verify(token, this.JWT_TOKEN_SECRET);
            return data;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new exceptions_1.SessionExpired();
            }
            throw new exceptions_1.InvalidSession();
        }
    }
    static decode(token) {
        try {
            const { data } = jsonwebtoken_1.default.decode(token);
            return data;
        }
        catch (error) {
            throw new exceptions_1.InvalidSession();
        }
    }
    static generateAccessToken(email) {
        const accessTokenData = {
            email: email,
        };
        return this.generateToken(accessTokenData, this.ACCESS_TOKEN_EXP_TIME_IN_SECONDS);
    }
}
SessionManager.JWT_TOKEN_SECRET = settings_1.JWT_TOKEN_SETTINGS.jwtTokenSecret;
SessionManager.ACCESS_TOKEN_EXP_TIME_IN_SECONDS = settings_1.JWT_TOKEN_SETTINGS.accessTokenDuration;
exports.SessionManager = SessionManager;
