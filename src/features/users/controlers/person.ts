import { NextFunction, Request, Response } from "express";
import { personRepo } from "../repositories";
import { z } from "zod";
import { APIException } from "../../../shared/exceprions";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";

export const getPeople = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const people = await personRepo.findAll();
    return res.json(people);
  } catch (error) {
    next(error);
  }
};

export const getPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Person not found" } };
    const person = await personRepo.findOneById(req.params.id);
    return res.json(person);
  } catch (error) {
    next(error);
  }
};

export const createPerson = async (
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
          path: "people/avatar",
          serviceName: configuration.name,
          serviceVersion: configuration.version,
          fieldName: "image",
        })
      )[0];
    }
    const person = await personRepo.create({
      ...req.body,
      image: uploadedProfilePic,
    });
    return res.json(person);
  } catch (error) {
    next(error);
  }
};
export const updatePerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Person not found" } };

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

    const person = await personRepo.updateById(req.params.id,{
      ...req.body,
      image: uploadedProfilePic,
    });
    return res.json(person);
  } catch (error) {
    next(error);
  }
};
