import { NextFunction, Request, Response } from "express";
import {
  locationRepo,
} from "../repositories";

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await locationRepo.findAll());
  } catch (error) {
    next(error);
  }
};

export const addLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await locationRepo.create(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await locationRepo.updateById(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};
export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await locationRepo.deleteById(req.params.id));
  } catch (error) {
    next(error);
  }
};
