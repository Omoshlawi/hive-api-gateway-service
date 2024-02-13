import { NextFunction, Request, Response } from "express";
import { salesListingRepo } from "../repositories";
import { z } from "zod";
import { configuration, expressMulterFileToFile } from "../../../utils";
import { fileRepo } from "../../files/repositories";

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
    if (!req.file)
      throw {
        status: 400,
        errors: { coverImage: { _errors: ["Cover image is Required"] } },
      };
    const file = expressMulterFileToFile(req.file);
    const files = await fileRepo.createMany({
      files: [file],
      path: "listings/sales",
      serviceName: configuration.name,
      serviceVersion: configuration.version,
      fieldName: "coverImage",
    });
    const listing = { ...req.body, coverImage: files[0] };
    return res.json(await salesListingRepo.create(listing));
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
