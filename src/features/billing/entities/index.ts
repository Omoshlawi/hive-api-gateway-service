import { Entity } from "../../../shared/types";

export interface Payment extends Entity {
  id: string;
  amount: number;
  user: string;
  complete: boolean;
  description?: string;
  subscription?: Record<string, any>;
  mpesaTransaction?: MpesaTransaction;
}

export interface MpesaTransaction extends Entity {
  id: string;
  merchantRequestId: string;
  checkoutRequestId: string;
  resultCode: string;
  resultDescription?: string;
  mpesareceiptNumber?: string;
  transactionDate?: string;
  phoneNumber?: string;
  paymentId?: string;
  payment?: Payment;
}
