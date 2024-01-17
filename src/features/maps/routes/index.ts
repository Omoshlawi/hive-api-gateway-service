import { Request, Response } from "express";
import { Router } from "express";
import {
  mapQuestPlacesSearch,
  openRoutePlaceSearch,
  mapQuestReverseGeoCode,
  openRouteReverseGeocode,
  openRouteMatrix,
  mapQuestMatrix,
  mapQuestOptimizedRoute,
} from "../repositories";

const router = Router();

router.get("/places", async (req: Request, res: Response) => {
  const results = await openRoutePlaceSearch(
    (req.query.q as string | undefined) ?? ""
  );
  res.json({ results: results || [] });
});
router.get("/direction", async (req: Request, res: Response) => {});
router.get("/geocoding/reverse", async (req: Request, res: Response) => {
  const location: any = req.query.location;
  if (!location || location.split(",").length !== 2) {
    return res.status(400).json({ detail: "Invalid Query parameter location" });
  }
  const [lat, lng] = location.split(",");
  const results = await openRouteReverseGeocode({ lat, lng });
  res.json({ results: results || [] });
});
router.post("/matrix", async (req: Request, res: Response) => {
  const profile = req.body.profile || undefined;
  const response = await mapQuestMatrix({ ...req.body, profile });
  return res.json(response);
});
router.post("/direction", async (req: Request, res: Response) => {
  const profile = req.body.profile || undefined;
  const response = await mapQuestOptimizedRoute({ ...req.body, profile });
  return res.json(response);
});

export default router;
