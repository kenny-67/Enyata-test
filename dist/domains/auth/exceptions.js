"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExpired = exports.MustBeLoggedIn = exports.InvalidSession = exports.UserNotFound = void 0;
const errors_1 = require("shared/errors");
class UserNotFound extends errors_1.BaseError {
}
exports.UserNotFound = UserNotFound;
class InvalidSession extends errors_1.BaseError {
}
exports.InvalidSession = InvalidSession;
class MustBeLoggedIn extends errors_1.BaseError {
}
exports.MustBeLoggedIn = MustBeLoggedIn;
class SessionExpired extends errors_1.BaseError {
}
exports.SessionExpired = SessionExpired;
