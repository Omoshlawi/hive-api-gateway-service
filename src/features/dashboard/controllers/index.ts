import { NextFunction, Request, Response } from "express";
import { propertyRepo } from "../../properties/repositories";
import { agentsRepo } from "../../agents/repositories";
import { agencyRepo } from "../../agencies/repositories";
import { listingRepo } from "../../listing/repositories";

export const dashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summeries: any[] = await Promise.all([
      propertyRepo.findAll(),
      agentsRepo.findAll(),
      agencyRepo.findAll(),
      listingRepo.findAll(),
    ]);
    return res.json(
      summeries.reduce((prev, curr, index) => {
        if (index === 0) return { ...prev, properties: curr.results.length };
        if (index === 1) return { ...prev, agents: curr.results.length };
        if (index === 2) return { ...prev, agencies: curr.results.length };
        if (index === 3) return { ...prev, listings: curr.results.length };
      }, {})
    );
  } catch (error) {
    next(error);
  }
};
