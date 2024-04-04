import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { searchRepo, resourceRepo } from "../repositories";
import { listingRepo } from "../../listing/repositories";
import { Search } from "../entities";
import { randomInt } from "crypto"; // Import for random number generation

export const getSearches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success)
      throw { status: 404, errors: { detail: "Not found" } };
    return res.json(await searchRepo.findAll(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await resourceRepo.findAll());
  } catch (error) {
    next(error);
  }
};

export const recommendListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if user id authenticated
    if ((req as any).user) {
      // TODO Perform filter at db level

      const searches = (
        (await searchRepo.findAll((req as any).user.person.id)) as any
      ).results.filter(
        (search: Search) => search.resource.pathName === "/listings"
      );

      // Check if there are any search results
      if (searches.length > 0) {
        // Generate a random index within the bounds of the search results array
        const randomIndex = Math.floor(Math.random() * searches.length);

        // Select a random search object from the array using the random index
        const randomSearch = searches[randomIndex] as Search;

        // Retrieve listings based on the random search
        const recommendedListings = await listingRepo.findByCriteria(
          randomSearch?.params.reduce<any>(
            (prv, { name, value }) => ({ ...prv, [name]: value }),
            {}
          ) ?? {}
        );

        return res.json(recommendedListings);
      } else {
        // No search results found for "/listings"
        return res.json({ results: [] });
      }
    }

    // User not authenticated
    return res.json({ results: [] });
  } catch (error) {
    next(error);
  }
};

export const addResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resource = await resourceRepo.create(req.body);
    return res.json(resource);
  } catch (error) {
    next(error);
  }
};
