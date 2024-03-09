import { NextFunction, Request, Response } from "express";
import { paymentsRepo } from "../repositories";

export const getPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const results = await paymentsRepo.findByCriteria({ user, complete: true });
    return res.json({ results });
  } catch (error) {
    next(error);
  }
};
