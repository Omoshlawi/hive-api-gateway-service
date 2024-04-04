import { Router } from "express";
import {
  addAgencyMembership,
  addArchievements,
  createAgency,
  deleteAgencyMembership,
  getAgencies,
  getAgency,
  getAgencyMembership,
  getAgencyMemberships,
  getArchievements,
  updateAgencyMembership,
} from "../controllers";
import { authenticateOptional, uploader } from "../../../middlewares";

const router = Router();

router.get("/:agencyId/membership", getAgencyMemberships);
router.post("/:agencyId/membership", addAgencyMembership);
router.get("/:agencyId/membership/:id", getAgencyMembership);
router.put("/:agencyId/membership/:id", updateAgencyMembership);
router.delete("/:agencyId/membership/:id", deleteAgencyMembership);

router.get("/:agencyId/archivements", getArchievements);
router.post(
  "/:agencyId/archivements",
  uploader.memoryFile().array("attachments"),
  addArchievements
);

router.get("/", authenticateOptional, getAgencies);
router.get("/:id", getAgency);
router.post(
  "/",
  [
    /*authenticate,*/ uploader.memoryFile().fields([
      { name: "logo", maxCount: 1 },
      { name: "coverImage", maxCount: 1 },
    ]),
  ],
  createAgency
);
export default router;
