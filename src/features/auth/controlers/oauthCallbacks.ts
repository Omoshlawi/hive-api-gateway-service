import { NextFunction, Request, Response } from "express";
import { getProfileInfo, getToken } from "../../../utils";
import { authRepo } from "../repositories";

export const googleSignInCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.code)
      throw {
        status: 401,
        errors: { detail: "Unauthorized - Error authenticating with google" },
      };
    const user_ = await authRepo.googleSignin(req.query);
    res.json(user_);
  } catch (e: any) {
    next(e);
  }
};
