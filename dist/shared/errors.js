"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputData = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(input, errors) {
        super(input);
        this.errors = errors;
    }
}
exports.BaseError = BaseError;
class InvalidInputData extends BaseError {
}
exports.InvalidInputData = InvalidInputData;
