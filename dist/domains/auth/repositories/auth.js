"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const mockUsers_1 = require("./mockUsers");
class AuthRepository {
    static getUser(email) {
        return mockUsers_1.mockUsers.find((user) => user.email == email);
    }
}
exports.AuthRepository = AuthRepository;
