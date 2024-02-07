import { Router } from "express";

import {
  addPricing,
  deletePricing,
  getPricing,
  getPricings,
  updatePricing,
} from "../controllers";

const router = Router();
router.get("/", getPricings);
router.post("/", addPricing);
router.put("/:id", updatePricing);
router.get("/:id", getPricing);
router.delete("/:id", deletePricing);
export default router;
