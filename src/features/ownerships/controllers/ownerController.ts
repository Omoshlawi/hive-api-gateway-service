import { NextFunction, Request, Response } from "express";
import { APIException } from "../../../shared/exceprions";
import { date, z } from "zod";
import { ownerRepo } from "../repositories";

const getOwners = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const owners = await ownerRepo.findAll();
    return res.json(owners);
  } catch (err) {
    next(err);
  }
};

const addOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const owner = await ownerRepo.create(req.body);
    return res.json(owner);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Not found" } };
    }
    const owner = await ownerRepo.updateById(req.params.id, req.body);
    return res.json(owner);
  } catch (err) {
    next(err);
  }
};

const deleteOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Not found" } };
    }
    await ownerRepo.deleteById(idValidation.data);
    return res.json({
      detail: "Owner deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { addOwner, updateOwner, getOwners, deleteOwner };
