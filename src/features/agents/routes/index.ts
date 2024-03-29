import { Router } from "express";
import {
  addAgent,
  addArchievements,
  deleteAgent,
  getAgent,
  getAgents,
  getArchievements,
  updateAgent,
} from "../controllers";
import { uploader } from "../../../middlewares";

const router = Router();
router.get("/:agentId/archivements", getArchievements);
router.post(
  "/:agentId/archivements",
  uploader.memoryFile().array("attachments"),
  addArchievements
);

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
