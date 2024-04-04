import { Router } from "express";
import { dashboardSummary } from "../controllers";

const router = Router();
router.get("/", dashboardSummary);
export default router;
