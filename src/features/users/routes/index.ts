import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateProfile,
  viewProfile,
} from "../controlers";
import { requireAuthenticated, uploader } from "../../../middlewares";
export { default as personRouter } from "./person";

const router = Router();
router.get("/", getUsers);
router.get("/profile", requireAuthenticated, viewProfile);
router.post(
  "/profile",
  [requireAuthenticated, uploader.memoryFile().single("image")],
  updateProfile
);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
export default router;
