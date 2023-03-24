"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUnknownError = void 0;
const handleUnknownError = (res, args) => {
    const { error } = args;
    console.error({ error });
    res.status(500).json({
        message: "An error occured while processing your request. Please contact support",
    });
};
exports.handleUnknownError = handleUnknownError;
