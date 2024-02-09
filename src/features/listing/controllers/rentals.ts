import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { rentalListingRepo } from "../repositories";

export const getRentalListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await rentalListingRepo.findAll();
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getRentalListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Rental Listing not found" } };
    }
    const listings = await rentalListingRepo.findOneById(idValidation.data);
    return res.json(listings);
  } catch (error) {
    next(error);
  }
};
export const addRentalListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await rentalListingRepo.create(req.body));
  } catch (error) {
    next(error);
  }
};
export const updateRentalListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Rental Listing not found" } };
    }
    return res.json(
      await rentalListingRepo.updateById(idValidation.data, req.body)
    );
  } catch (error) {
    next(error);
  }
};
export const deleteRentalListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Rental Listing not found" } };
    }
    return res.json(await rentalListingRepo.deleteById(idValidation.data));
  } catch (error) {
    next(error);
  }
};
