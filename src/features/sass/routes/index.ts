import { Router } from "express";
import { default as featuresRouter } from "./features";
import {
  addPricing,
  deletePricing,
  getPricing,
  getPricings,
  updatePricing,
} from "../controllers";

const router = Router();
router.use("/features", featuresRouter);
router.get("/", getPricings);
router.post("/", addPricing);
router.put("/:id", updatePricing);
router.get("/:id", getPricing);
router.delete("/:id", deletePricing);
export default router;
