import { Router } from "express";
import {
  addAgent,
  deleteAgent,
  getAgent,
  getAgents,
  updateAgent,
} from "../controllers/agents";

const router = Router();
router.get("/", getAgents);
router.post("/", addAgent);
router.get("/:id", getAgent);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);
export default router;
