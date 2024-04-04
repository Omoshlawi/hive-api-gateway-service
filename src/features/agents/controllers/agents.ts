import { NextFunction, Request, Response } from "express";
import { agentsRepo } from "../repositories";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";
import { isEmpty } from "lodash";
import { asynTasks } from "../../../tasks";

export const getAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await agentsRepo.findByCriteria(req.query);
    if (!isEmpty(req.query)) {
      await asynTasks.addUserSearch({
        resourcepathName: "/agents",
        params: Object.entries(req.query as Record<string, string>).map(
          ([name, value]) => ({
            name,
            value,
          })
        ),
        person: (req as any).user?.person?.id,
      });
    }
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
    const agent = await agentsRepo.findOneById(idValidation.data, req.query);
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
    let image;
    let coverImage;

    // 1.Upload images
    if (req.files) {
      const { image: logoMemFile, coverImage: coverImageMemFile } =
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
      // Upload logo
      if (logoMemFile && logoMemFile.length > 0) {
        const logo_ = multerMemoryFilesToFileArray(logoMemFile);
        image = (
          await fileRepo.createMany({
            files: logo_,
            path: "agents/avatar",
            serviceName: configuration.name,
            serviceVersion: configuration.version,
            fieldName: "image",
          })
        )[0];
      }
      // Upload cover image
      if (coverImageMemFile && coverImageMemFile.length > 0) {
        const logo_ = multerMemoryFilesToFileArray(coverImageMemFile);
        coverImage = (
          await fileRepo.createMany({
            files: logo_,
            path: "agents/cover",
            serviceName: configuration.name,
            serviceVersion: configuration.version,
            fieldName: "coverImage",
          })
        )[0];
      }
    }

    const agent = await agentsRepo.create({
      ...req.body,
      image,
      coverImage,
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
