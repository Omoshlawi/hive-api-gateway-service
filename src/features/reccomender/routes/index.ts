import { Router } from "express";
import {
  addResources,
  getResources,
  getSearches,
  recommendListings,
} from "../controllers";
import {
  authenticateOptional,
  requireAuthenticated,
} from "../../../middlewares";

const router = Router();
router.get("/listings", authenticateOptional, recommendListings);
router.get("/resources", getResources);
router.post("/resources", addResources);
router.get("/user-searches/:id", getSearches);
export default router;
