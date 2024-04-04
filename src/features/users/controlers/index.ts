import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { UserRequest } from "../../../shared/types";
import { any, z } from "zod";
import { configuration, multerMemoryFilesToFileArray } from "../../../utils";
import { fileRepo } from "../../files/repositories";
import { ownerRepo } from "../../ownerships/repositories";
import { agencyRepo } from "../../agencies/repositories";
import { agentsRepo } from "../../agents/repositories";
export * from "./person";

const exce_ = async (func: any, ...args: any[]) => {
  try {
    return await func(...args);
  } catch (error) {
    return null;
  }
};

export const getUserRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const personId = (req as any).user?.person.id;
    const userRoles = await Promise.all([
      exce_(ownerRepo.findOneById, personId, { by: "person" }),
      exce_(agencyRepo.findOneById, personId, { by: "person" }),
      exce_(agentsRepo.findOneById, personId, { by: "person" }),
    ]);
    return res.json({
      roles: userRoles.reduce<any>((prev, curr, i) => {
        if (i === 0 && curr) return { ...prev, owner: curr };
        if (i === 1 && curr) return { ...prev, agency: curr };
        if (i === 2 && curr) return { ...prev, agent: curr };
        return prev;
      }, {}),
    });
  } catch (error) {
    next(error);
  }
};

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
