import { Router } from "express";
import {
  getMyTourSchedules,
  addTourSchedule,
  getListingTourSchedules,
} from "../controllers";
import { requireAuthenticated } from "../../../middlewares";

const router = Router();
router.get("/", requireAuthenticated, getMyTourSchedules);
router.post("/:id", requireAuthenticated, addTourSchedule);
router.get("/:id", requireAuthenticated, getListingTourSchedules);
export default router;
