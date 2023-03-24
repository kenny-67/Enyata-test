import { BaseError } from "shared/errors";

export class UserNotFound extends BaseError {}
export class InvalidSession extends BaseError {}
export class MustBeLoggedIn extends BaseError {}
export class SessionExpired extends BaseError {}
