import { Router } from "express";
import {
  getPeople,
  createPerson,
  getPerson,
  updatePerson,
} from "../controlers";
import { requireAuthenticated, uploader } from "../../../middlewares";

const router = Router();
router.get("/", getPeople);
router.post("/", [uploader.memoryFile().single("image")], createPerson);
router.get("/:id", getPerson);
router.put("/:id", [uploader.memoryFile().single("image")], updatePerson);
// router.delete("/:id", requireAuthenticated, deleteUser);
export default router;
