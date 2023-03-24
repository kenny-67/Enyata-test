import { MustBeLoggedIn } from "../exceptions";
import { SessionManagerType } from "../service/SessionManager";

export class VerifyTokenUsecase {
  constructor(private sessionManager: SessionManagerType) {}
  async execute(authorization?: string) {
    authorization = authorization || "";
    const accessToken = this.getAccessToken(authorization);

    const { email } = await this.sessionManager.verifyToken(accessToken);

    return {
      email,
    };
  }

  getAccessToken(authorization: string) {
    const authorizationParts = authorization?.trim().split(" ");

    if (authorizationParts.length != 2) {
      throw new MustBeLoggedIn();
    }

    if (authorizationParts[0].toLowerCase() !== "bearer") {
      throw new MustBeLoggedIn();
    }

    return authorizationParts[1];
  }
}
