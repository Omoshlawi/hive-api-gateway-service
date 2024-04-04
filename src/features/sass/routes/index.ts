import { Router } from "express";
import { default as featuresRouter } from "./features";
import { default as subscriptionsRouter } from "./subscriptions";
import {
  addPricing,
  deletePricing,
  getPricing,
  getPricings,
  updatePricing,
} from "../controllers";
import { requireAuthenticated } from "../../../middlewares";

const router = Router();
router.use("/features", featuresRouter);
router.use("/subscriptions", requireAuthenticated, subscriptionsRouter);
router.get("/", getPricings);
router.post("/", addPricing);
router.put("/:id", updatePricing);
router.get("/:id", getPricing);
router.delete("/:id", deletePricing);
export default router;
