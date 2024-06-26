import { NextFunction, Request, Response } from "express";
import { listingRepo, tourScheduleRepository } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";
import { ownerShipRepo } from "../../ownerships/repositories";

export const getMyTourSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await tourScheduleRepository.findAll(
        req.header("x-access-token") as string
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getListingTourSchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Listing not found" } };
    return res.json(
      await tourScheduleRepository.findOneById(
        req.params.id,
        req.header("x-access-token") as string
      )
    );
  } catch (error) {
    next(error);
  }
};

export const addTourSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Listing not found" } };
    const tour = await tourScheduleRepository.create(
      req.body,
      req.params.id,
      req.header("x-access-token") as string
    );
    const listing = await listingRepo.findOneById(req.params.id);
    // const ownership = await Promise.all(
    //   listing?.properties.map((prop) =>
    //     ownerShipRepo.findByIds(prop._id!, { by: "property" })
    //   ) ?? []
    // );
    // await sendSms(
    //   "0793889658",
    //   `Dear Laurent Ouma, you have received a tour request for ${listing?.title} scheduled for ${tour.date} ${tour.time}`
    // );

    return res.json(tour);
  } catch (error) {
    next(error);
  }
};
