import { Router } from "express";
import {
  addRentalListing,
  deleteRentalListing,
  getRentalListing,
  getRentalListings,
  updateRentalListing,
} from "../controllers";

const router = Router();
router.get("/", getRentalListings);
router.post("/", addRentalListing);
router.get("/:id", getRentalListing);
router.put("/:id", updateRentalListing);
router.delete("/:id", deleteRentalListing);
export default router;