import { NextFunction, Request, Response } from "express";
import { APIException } from "../../../shared/exceprions";
import { mpesaRepo } from "../repositories";
export const makeMpesaPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _res = await mpesaRepo.makePayment(
      req.body,
      req.header("x-access-token")
    );
    return res.json(_res);
  } catch (error: any) {
    next(error);
  }
};
export const checkStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _res = await mpesaRepo.checkStatus(
      req.body,
      req.header("x-access-token")
    );
    return res.json(_res);
  } catch (error) {
    next(error);
  }
};
export const stkCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _res = await mpesaRepo.stkCallback(
      req.body,
      req.header("x-access-token")
    );
    return res.json(_res);
  } catch (error) {
    next(error);
  }
};
