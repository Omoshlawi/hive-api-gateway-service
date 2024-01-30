import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { UserRequest } from "../../../shared/types";
import { APIException } from "../../../shared/exceprions";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepo.findAll(
      req.header("x-access-token") as string
    );
    return res.json( users );
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id)
      throw { status: 404, errors: { detail: "User not found" } };
    const users = await userRepo.findOneById(
      req.params.id,
      req.header("x-access-token") as string
    );
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json((req as UserRequest).user);
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userRepo.updateById(
      (req as UserRequest).user.id,
      req.body,
      req.header("x-access-token") as string
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
