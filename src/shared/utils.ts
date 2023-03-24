import { Response } from "express";

type UnknownErrorArgument = {
  error: unknown;
};

export const handleUnknownError = (
  res: Response,
  args: UnknownErrorArgument
) => {
  const { error } = args;
  console.error({ error });

  res.status(500).json({
    message:
      "An error occured while processing your request. Please contact support",
  });
};
