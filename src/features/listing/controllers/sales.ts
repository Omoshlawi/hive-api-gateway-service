import { NextFunction, Request, Response } from "express";
import { salesListingRepo } from "../repositories";
import { z } from "zod";

export const getSalesListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await salesListingRepo.findAll();
    return res.json(results);
  } catch (error) {
    return next(error);
  }
};
export const getSalesListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Sales Listing not found" } };
    }
    const listing = await salesListingRepo.findOneById(idValidation.data);
    return res.json(listing);
  } catch (error) {
    return next(error);
  }
};

export const addSalesListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await salesListingRepo.create(req.body));
  } catch (error) {
    return next(error);
  }
};

export const updateSalesListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Sales Listing not found" } };
    }
    return res.json(
      await salesListingRepo.updateById(idValidation.data, req.body)
    );
  } catch (error) {
    return next(error);
  }
};
export const deleteSalesListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Sales Listing not found" } };
    }
    return res.json(await salesListingRepo.deleteById(idValidation.data));
  } catch (error) {
    return next(error);
  }
};
