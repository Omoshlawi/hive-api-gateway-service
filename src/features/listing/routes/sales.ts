import { Router } from "express";
import {
  addSalesListing,
  deleteSalesListing,
  getSalesListing,
  getSalesListings,
  updateSalesListing,
} from "../controllers";
import { uploader } from "../../../middlewares";

const router = Router();
router.get("/", getSalesListings);
router.post("/",uploader.memoryFile().single("coverImage"), addSalesListing);
router.get("/:id", getSalesListing);
router.put("/:id", updateSalesListing);
router.delete("/:id", deleteSalesListing);
export default router;
