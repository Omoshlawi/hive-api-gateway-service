import { Router } from "express";
import { checkStatus, makeMpesaPayment } from "../controllers";

const router = Router();
router.post("/mpesa/make-payment", makeMpesaPayment);
router.post("/mpesa/query-status", checkStatus);
export default router;
