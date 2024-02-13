import { Router } from "express";
import {
  addRentalListing,
  deleteRentalListing,
  getRentalListing,
  getRentalListings,
  updateRentalListing,
} from "../controllers";
import { uploader } from "../../../middlewares";

const router = Router();
router.get("/", getRentalListings);
router.post("/",uploader.memoryFile().single("coverImage"), addRentalListing);
router.get("/:id", getRentalListing);
router.put("/:id", updateRentalListing);
router.delete("/:id", deleteRentalListing);
export default router;