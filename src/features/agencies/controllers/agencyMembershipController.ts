import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { agencyRepo, membershipsRepo } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { pick } from "lodash";

export const getAgencyMemberships = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    const agencyMemberships = await membershipsRepo.findAll(
      req.params.agencyId
    );
    return res.json(agencyMemberships);
  } catch (error) {
    return next(error);
  }
};

export const getAgencyMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agency membership  not found or doesn't exist.",
      });
    }
    const agencyMembership = await membershipsRepo.findOneById(
      idValidation.data,
      req.params.agencyId
    );
    return res.json(agencyMembership);
  } catch (error) {
    return next(error);
  }
};

export const addAgencyMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    const agencyMembership = await membershipsRepo.create(
      req.body,
      req.params.agencyId
    );
    return res.status(201).json(agencyMembership);
  } catch (error) {
    return next(error);
  }
};

export const updateAgencyMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.agencyId).success)
      throw { status: 404, errors: { detail: "Agency not found" } };
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(404).json({
        errors: "Agency membership  not found or doesn't exist.",
      });
    }
    const updateAgencyMembership = await membershipsRepo.updateById(
      idValidation.data,
      req.body,
      req.params.agencyId
    );
    return res.status(200).json(updateAgencyMembership);
  } catch (error) {
    return next(error);
  }
};

export const deleteAgencyMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !z.string().uuid().safeParse(req.params.agencyId).success
    )
      throw { status: 404, errors: { detail: "Agency not found" } };
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (
      !idValidation.success
    ) {
      return res.status(404).json({
        error: "Agent Membership not found or doesn't exist.",
      });
    }
    await membershipsRepo.deleteById(idValidation.data, req.params.agencyId);
    return res.status(200).send("Deleted successfully.");
  } catch (error) {
    return next(error);
  }
};
