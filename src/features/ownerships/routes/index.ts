import { Router } from "express";
import {
  addOwner,
  addOwnerShip,
  deleteOwner,
  deleteOwnerShip,
  getOwner,
  getOwnerShips,
  getOwners,
  updateOwner,
  updateOwnerShip,
  getOwnershipsByIds
} from "../controllers";
const router = Router();
const ownerBaseUrl = "/owners";
const ownerShipBaseUrl = "/ownerships";

router.get(`${ownerBaseUrl}`, getOwners);
router.get(`${ownerBaseUrl}/:id`, getOwner);
router.post(`${ownerBaseUrl}`, addOwner);
router.put(`${ownerBaseUrl}/:id`, updateOwner);
router.delete(`${ownerBaseUrl}/:id`, deleteOwner);

router.get(`${ownerShipBaseUrl}`, getOwnerShips);
router.post(`${ownerShipBaseUrl}`, addOwnerShip);
router.get(`${ownerShipBaseUrl}/by/:id`, getOwnershipsByIds);
router.put(`${ownerShipBaseUrl}/:id`, updateOwnerShip);
router.delete(`${ownerShipBaseUrl}/:id`, deleteOwnerShip);
export default router;
