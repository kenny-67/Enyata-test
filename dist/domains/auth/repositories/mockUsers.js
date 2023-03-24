"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUsers = void 0;
exports.mockUsers = process.env.NODE_ENV == "test"
    ? []
    : [
        {
            email: "john@example.com",
            firstName: "John",
            lastName: "Doh",
            password: "123456",
        },
        {
            email: "jane@example.com",
            firstName: "Jane",
            lastName: "Doh",
            password: "123456",
        },
    ];
