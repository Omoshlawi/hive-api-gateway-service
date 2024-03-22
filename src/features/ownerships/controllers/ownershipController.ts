import { NextFunction, Request, Response } from "express";
import { ownerRepo, ownerShipRepo } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";
import { isEmpty, pick } from "lodash";

const getOwnerShips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerShip = await ownerShipRepo.findAll();
    return res.json(ownerShip);
  } catch (err) {
    next(err);
  }
};

const addOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownership = await ownerShipRepo.create(req.body);
    return res.json(ownership);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Not found" } };
    }
    const owner = await ownerShipRepo.updateById(req.params.id, req.body);
    return res.json(owner);
  } catch (err) {
    next(err);
  }
};

const deleteOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Not found" } };
    }
    await ownerShipRepo.deleteById(idValidation.data);
    return res.json({
      detail: "OwnerShip deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { addOwnerShip, updateOwnerShip, getOwnerShips, deleteOwnerShip };
