import { JWT_TOKEN_SETTINGS } from "infrastructure/settings";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { InvalidSession, SessionExpired } from "../exceptions";

export class SessionManager {
  private static JWT_TOKEN_SECRET = JWT_TOKEN_SETTINGS.jwtTokenSecret;
  private static ACCESS_TOKEN_EXP_TIME_IN_SECONDS =
    JWT_TOKEN_SETTINGS.accessTokenDuration;

  private static generateToken(
    data: Record<string, any>,
    expTimeInSec: number
  ) {
    return jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + expTimeInSec, data },
      this.JWT_TOKEN_SECRET
    );
  }

  public static verifyToken(token: string) {
    try {
      const { data } = jwt.verify(token, this.JWT_TOKEN_SECRET) as any;
      return data;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new SessionExpired();
      }
      throw new InvalidSession();
    }
  }

  public static decode(token: string) {
    try {
      const { data } = jwt.decode(token) as { data: any };
      return data;
    } catch (error) {
      throw new InvalidSession();
    }
  }

  public static generateAccessToken(email: string) {
    const accessTokenData = {
      email: email,
    };
    return this.generateToken(
      accessTokenData,
      this.ACCESS_TOKEN_EXP_TIME_IN_SECONDS
    );
  }
}

export type SessionManagerType = typeof SessionManager;
