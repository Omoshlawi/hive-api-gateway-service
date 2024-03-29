import { NextFunction, Request, Response } from "express";
import { agentsArchievmentsRepo } from "../repositories";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";

export const getArchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agentId).success)
      throw { status: 404, errors: { detail: "Agents not found" } };
    const results = await agentsArchievmentsRepo.findAll(req.params.agentId);
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
    if (!z.string().uuid().safeParse(req.params.agentId).success)
      throw { status: 404, errors: { detail: "Agents not found" } };
    let uploadAttachments;
    if (req.files?.length && (req.files as any).length > 0) {
      const files = multerMemoryFilesToFileArray(req.files);
      uploadAttachments = await fileRepo.createMany({
        files,
        path: "agents/achievemnts",
        serviceName: configuration.name,
        serviceVersion: configuration.version,
        fieldName: "attachments",
      });
    }
    const results = await agentsArchievmentsRepo.create(
      { ...req.body, attachments: uploadAttachments },
      req.params.agentId
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
