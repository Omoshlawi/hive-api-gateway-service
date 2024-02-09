import { NextFunction, Request, Response } from "express";
import { featuresRepo } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";

export const getFeatures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await featuresRepo.findAll());
  } catch (error) {
    next(error);
  }
};

export const getFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Feature Not found" } };
    }
    return res.json(await featuresRepo.findOneById(idValidation.data));
  } catch (error) {
    next(error);
  }
};

export const addFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feature = await featuresRepo.create(req.body);
    return res.json(feature);
  } catch (error) {
    next(error);
  }
};

export const updateFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Feature Not found" } };
    }
    const feature = await featuresRepo.updateById(idValidation.data, req.body);
    return res.json(feature);
  } catch (error) {
    next(error);
  }
};

export const deleteFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Feature Not found" } };
    }
    return res.json(await featuresRepo.deleteById(idValidation.data));
  } catch (error) {
    next(error);
  }
};
