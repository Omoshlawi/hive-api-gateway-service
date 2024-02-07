import { NextFunction, Request, Response } from "express";
import { pricingRepo } from "../repositories";
import { z } from "zod";
import { isEmpty } from "lodash";

export const addPricing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pricing = await pricingRepo.create(req.body);
    return res.json(pricing);
  } catch (error) {
    next(error);
  }
};

export const getPricings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await pricingRepo.findAll());
  } catch (error) {
    next(error);
  }
};
export const getPricing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Pricing Not found" } };
    }
    return res.json(await pricingRepo.findOneById(idValidation.data));
  } catch (error) {
    next(error);
  }
};

export const updatePricing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Pricing Not found" } };
    }
    return res.json(pricingRepo.updateById(idValidation.data, req.body));
  } catch (error) {
    next(error);
  }
};

export const deletePricing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Pricing Not found" } };
    }

    return res.json(await pricingRepo.deleteById(idValidation.data));
  } catch (error) {
    next(error);
  }
};
