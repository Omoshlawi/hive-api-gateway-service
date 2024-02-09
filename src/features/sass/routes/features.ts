import { Router } from "express";
import {
  addFeature,
  deleteFeature,
  getFeature,
  getFeatures,
  updateFeature,
} from "../controllers";

const router = Router();
router.get("/", getFeatures);
router.post("/", addFeature);
router.get("/:id", getFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);
export default router;
