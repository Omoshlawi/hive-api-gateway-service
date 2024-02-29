import { NextFunction, Request, Response } from "express";
import { agentsRepo } from "../repositories";
import { z } from "zod";

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
    const agent = await agentsRepo.create(req.body);
    return res.status(201).json({ agent: agent });
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
