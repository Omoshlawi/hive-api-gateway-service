import { Router } from "express";
import {
  addProperty,
  deleteProperty,
  getProperties,
  updateProperty,
  addLocation,
  deleteLocation,
  getLocations,
  updateLocation,
} from "../controllers";
import { uploader } from "../../../middlewares";

const router = Router();

router.get("/locations", getLocations);
router.post("/locations", addLocation);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

router.get("/", getProperties);
router.post("/", uploader.memoryFile().array("images"), addProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
export default router;
