import { Router } from "express";
import { checkStatus, makeMpesaPayment, stkCallBack } from "../controllers";
import { requireAuthenticated } from "../../../middlewares";

const router = Router();
router.post("/mpesa/make-payment", requireAuthenticated, makeMpesaPayment);
router.post("/mpesa/query-status", requireAuthenticated, checkStatus);
router.post("/mpesa/callback", stkCallBack);
export default router;
