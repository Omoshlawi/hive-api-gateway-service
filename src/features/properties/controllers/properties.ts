import { NextFunction, Request, Response } from "express";
import { propertyRepo } from "../repositories";
import {
  configuration,
  multerMemoryFilesToFileArray,
  objectToFormData,
} from "../../../utils";
import { fileRepo } from "../../files/repositories";
import { FileUpload } from "../../files/entities";

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await propertyRepo.findByCriteria(req.query));
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property = await propertyRepo.findOneById(req.params.id);
    return res.json(property);
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
    const files = multerMemoryFilesToFileArray(req.files);
    const file = await fileRepo.createMany({
      files,
      path: "properties",
      serviceName: configuration.name,
      serviceVersion: configuration.version,
      fieldName: "images",
    });
    const property_ = { ...req.body, images: file };
    const property = await propertyRepo.create(property_);
    return res.json(property);
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
