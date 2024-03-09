import { MpesaTransactionRepository } from "./mpesa";
import { PaymentsRepository } from "./payment";

export const paymentsRepo = new PaymentsRepository();
export const mpesaRepo = new MpesaTransactionRepository();
