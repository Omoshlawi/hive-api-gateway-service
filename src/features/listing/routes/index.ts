import { Router } from "express";
import {
  addListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from "../controllers";
import { default as rentalRouter } from "./rentals";
import { default as salesRouter } from "./sales";
import { default as tourRouter } from "./tour";
import { authenticateOptional } from "../../../middlewares";

const router = Router();
router.use("/rentals", rentalRouter);
router.use("/sales", salesRouter);
router.use("/tours", tourRouter);
router.get("/", authenticateOptional, getListings);
router.post("/", addListing);
router.get("/:id", getListing);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);
export default router;
