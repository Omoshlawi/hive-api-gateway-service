import { NextFunction, Request, Response } from "express";
import { agencyArchievmentsRepo, agencyRepo } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";
import logger from "../../../shared/logger";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";

export const getArchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    const results = await agencyArchievmentsRepo.findAll(req.params.agencyId);
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const addArchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    let uploadAttachments;
    if (req.files?.length && (req.files as any).length > 0) {
      const files = multerMemoryFilesToFileArray(req.files);
      uploadAttachments = await fileRepo.createMany({
        files,
        path: "agencies/achievemnts",
        serviceName: configuration.name,
        serviceVersion: configuration.version,
        fieldName: "attachments",
      });
    }
    const results = await agencyArchievmentsRepo.create(
      { ...req.body, attachments: uploadAttachments },
      req.params.agencyId
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
