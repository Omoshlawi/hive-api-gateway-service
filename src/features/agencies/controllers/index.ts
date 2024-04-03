import { NextFunction, Request, Response } from "express";
import { agencyRepo } from "../repositories";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";
export * from "./agencyMembershipController";
export * from "./achievements";

export const getAgencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agency = await agencyRepo.findByCriteria(req.query);
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
    let coverImage;

    // 1.Upload images
    if (req.files) {
      const { logo: logoMemFile, coverImage: coverImageMemFile } =
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
      // Upload logo
      if (logoMemFile && logoMemFile.length > 0) {
        const logo_ = multerMemoryFilesToFileArray(logoMemFile);
        logo = (
          await fileRepo.createMany({
            files: logo_,
            path: "agencies/logo",
            serviceName: configuration.name,
            serviceVersion: configuration.version,
            fieldName: "logo",
          })
        )[0];
      }
      // Upload cover image
      if (coverImageMemFile && coverImageMemFile.length > 0) {
        const logo_ = multerMemoryFilesToFileArray(coverImageMemFile);
        coverImage = (
          await fileRepo.createMany({
            files: logo_,
            path: "agencies/cover",
            serviceName: configuration.name,
            serviceVersion: configuration.version,
            fieldName: "coverImage",
          })
        )[0];
      }
    }
    const agency = await agencyRepo.create({
      ...req.body,
      logo,
      coverImage
    });
    return res.json(agency);
  } catch (error) {
    next(error);
  }
};
