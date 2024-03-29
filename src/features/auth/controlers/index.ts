import { NextFunction, Request, Response } from "express";
import { authRepo } from "../repositories";
import { configuration } from "../../../utils";
import { User } from "../entities";
import { Token } from "../../../shared/types";
export * from "./oauthCallbacks";
export * from "./oauthSignIn";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authRepo.credentialsSignUp(req.body);
    return res
      .cookie(
        configuration.authCookieConfig.name,
        user.token.accessToken,
        configuration.authCookieConfig.config
      )
      .setHeader("x-access-token", user.token.accessToken)
      .setHeader("x-refresh-token", user.token.refreshToken)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: { user: User; token: Token } = await authRepo.login(req.body);
    return res
      .cookie(
        configuration.authCookieConfig.name,
        user.token.accessToken,
        configuration.authCookieConfig.config
      )
      .setHeader("x-access-token", user.token.accessToken)
      .setHeader("x-refresh-token", user.token.refreshToken)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const authProviders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ action: "Auth Providers!" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.header("x-refresh-token");
  if (!refreshToken)
    return res.status(401).json({ detail: "Unauthorized - Token missing" });
  try {
    const token = await authRepo.refreshUserToken(refreshToken);
    return res.json(token);
  } catch (err: any) {
    next(err);
  }
};
