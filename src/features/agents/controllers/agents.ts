import { NextFunction, Request, Response } from "express";
import { agentsRepo } from "../repositories";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";

export const getAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await agentsRepo.findAll();
    return res.json(agents);
  } catch (error) {
    return next(error);
  }
};

export const getAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agent not found!",
      });
    }
    const agent = await agentsRepo.findOneById(idValidation.data);
    return res.json(agent);
  } catch (error) {
    return next(error);
  }
};

export const addAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { licenses, profilePic } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    let uploadedProfilePic;
    let uploadedLicenses;
    // 1.Upload profile pic
    if (profilePic?.length > 0) {
      const profilePic_ = multerMemoryFilesToFileArray(profilePic);
      uploadedProfilePic = (
        await fileRepo.createMany({
          files: profilePic_,
          path: "agents/avatar",
          serviceName: configuration.name,
          serviceVersion: configuration.version,
          fieldName: "profilePic",
        })
      )[0];
    }
    // 1.Upload licences docs
    if (licenses?.length > 0) {
      const licenses_ = multerMemoryFilesToFileArray(licenses);
      uploadedLicenses = await fileRepo.createMany({
        files: licenses_,
        path: "agents/licences",
        serviceName: configuration.name,
        serviceVersion: configuration.version,
        fieldName: "licenses",
      });
    }
    // TODO Validate file type

    const agent = await agentsRepo.create({
      ...req.body,
      licenses: uploadedLicenses,
      profilePic: uploadedProfilePic,
    });
    return res.status(201).json(agent);
  } catch (error) {
    return next(error);
  }
};

export const updateAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agent not found!",
      });
    }
    const updateAgent = await agentsRepo.updateById(
      idValidation.data,
      req.body
    );
    return res.status(200).json({ updateAgent: updateAgent });
  } catch (error) {
    return next(error);
  }
};

export const deleteAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agent not found!",
      });
    }
    await agentsRepo.deleteById(idValidation.data);
    return res.status(200).send("Deleted successfully.");
  } catch (error) {
    return next(error);
  }
};
