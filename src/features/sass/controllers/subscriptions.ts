import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userSubscriptionsRepo } from "../repositories";

export const getUserSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "User not found!" } };
    const results = await userSubscriptionsRepo.findUserSubscriptions(
      req.params.id,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
export const getMySubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await userSubscriptionsRepo.findUserSubscriptions(
      (req as any).user.id,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await userSubscriptionsRepo.create(
      req.body,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
