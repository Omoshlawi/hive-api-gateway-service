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
    let uploadedProfilePic;

    // 1.Upload profile pic
    if (req.file) {
      const profilePic_ = multerMemoryFilesToFileArray([req.file]);
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

    const agent = await agentsRepo.create({
      ...req.body,
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
