import { Router } from "express";
import {
  addAgent,
  deleteAgent,
  getAgent,
  getAgents,
  updateAgent,
} from "../controllers/agents";
import { uploader } from "../../../middlewares";

const router = Router();
router.get("/", getAgents);
router.post(
  "/",
  uploader.memoryFile().fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  addAgent
);
router.get("/:id", getAgent);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);
export default router;
