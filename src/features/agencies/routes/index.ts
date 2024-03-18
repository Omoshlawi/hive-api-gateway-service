import { Router } from "express";
import { createAgency, getAgencies } from "../controllers";
import authenticate from "../../../middlewares/authentication";
import { uploader } from "../../../middlewares";

const router = Router();
router.get("/", getAgencies);
router.post(
  "/",
  [/*authenticate,*/ uploader.memoryFile().single("logo")],
  createAgency
);
export default router;
