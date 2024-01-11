import { NextFunction, Request, Response } from "express";
import { PropertyRepository, propertyRepo } from "../repositories";

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await propertyRepo.findAll());
  } catch (error) {
    next(error);
  }
};

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await propertyRepo.create(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await propertyRepo.updateById(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};
export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await propertyRepo.deleteById(req.params.id));
  } catch (error) {
    next(error);
  }
};
