import { Router } from "express";
import {
  getUserSubscriptions,
  getMySubscriptions,
  subscribe,
} from "../controllers";

const router = Router();
router.get("/", getMySubscriptions);
router.post("/", subscribe); // Pricing id
router.get("/:id", getUserSubscriptions);
// router.get("/cancel/:id", ca);
export default router;
