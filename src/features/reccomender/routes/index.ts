import { Router } from "express";
import { addResources, getResources, getSearches } from "../controllers";

const router = Router();
router.get("/resources", getResources);
router.post("/resources", addResources);
router.get("/user-searches/:id", getSearches);
export default router;
