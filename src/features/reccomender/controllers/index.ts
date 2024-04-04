import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { searchRepo, resourceRepo } from "../repositories";

export const getSearches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Not found" } };
    return res.json(await searchRepo.findAll(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await resourceRepo.findAll());
  } catch (error) {
    next(error);
  }
};

export const addResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceRepo.create(req.body);
    return res.json(resource);
  } catch (error) {
    next(error);
  }
};
