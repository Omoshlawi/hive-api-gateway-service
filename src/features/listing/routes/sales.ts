import { Router } from "express";
import {
  addSalesListing,
  deleteSalesListing,
  getSalesListing,
  getSalesListings,
  updateSalesListing,
} from "../controllers";

const router = Router();
router.get("/", getSalesListings);
router.post("/", addSalesListing);
router.get("/:id", getSalesListing);
router.put("/:id", updateSalesListing);
router.delete("/:id", deleteSalesListing);
export default router;
