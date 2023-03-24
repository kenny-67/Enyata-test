import "dotenv/config";

export const JWT_TOKEN_SETTINGS = {
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET || "shhhhjgirogongo#Y($Y*#Yy98y",
  accessTokenDuration: +(
    process.env.ACCESS_TOKEN_EXP_TIME_IN_SECONDS || 5 * 60
  ),
};
