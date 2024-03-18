import { NextFunction, Request, Response } from "express";
import { agencyRepo } from "../repositories";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";

export const getAgencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agency = await agencyRepo.findAll();
    return res.json(agency);
  } catch (error) {
    next(error);
  }
};

export const getAgency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agency not found or doesn't exist.",
      });
    }
    const agency = await agencyRepo.findOneById(idValidation.data);
    return res.json(agency);
  } catch (error) {
    next(error);
  }
};

export const createAgency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let logo;

    // 1.Upload profile pic
    if (req.file) {
      const pic_ = multerMemoryFilesToFileArray([req.file]);
      logo = (
        await fileRepo.createMany({
          files: pic_,
          path: "agencies/logo",
          serviceName: configuration.name,
          serviceVersion: configuration.version,
          fieldName: "logo",
        })
      )[0];
    }
    const agency = await agencyRepo.create({
      ...req.body,
      logo: logo,
    });
    return res.json(agency);
  } catch (error) {
    next(error);
  }
};
