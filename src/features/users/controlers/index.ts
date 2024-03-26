import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { UserRequest } from "../../../shared/types";
import { z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";
export * from "./person";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepo.findAll(
      req.header("x-access-token") as string
    );
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "User not found" } };
    }
    const users = await userRepo.findOneById(
      req.params.id,
      req.header("x-access-token") as string
    );
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json((req as UserRequest).user);
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // content-type': 'multipart/form-data'
    // const contentType = req.header("content-type");
    let uploadedProfilePic;

    // 1.Upload profile pic
    if (req.file) {
      const profilePic_ = multerMemoryFilesToFileArray([req.file]);
      uploadedProfilePic = (
        await fileRepo.createMany({
          files: profilePic_,
          path: "persons/avatar",
          serviceName: configuration.name,
          serviceVersion: configuration.version,
          fieldName: "image",
        })
      )[0];
    }
    const user = await userRepo.updateById(
      (req as UserRequest).user.id,
      {
        ...req.body,
        image: uploadedProfilePic,
      },
      req.header("x-access-token") as string
    );

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "User not found" } };
    }
    const user = await userRepo.deleteById(
      req.params.id,
      req.header("x-access-token") as string
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
