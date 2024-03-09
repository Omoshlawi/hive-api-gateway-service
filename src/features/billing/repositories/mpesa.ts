import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { MpesaTransaction } from "../entities";

export class MpesaTransactionRepository
  implements Repository<MpesaTransaction, string>
{
  create(entity: MpesaTransaction): Promise<MpesaTransaction> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(criteria: Record<string, any>): Promise<MpesaTransaction[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<MpesaTransaction>
  ): Promise<MpesaTransaction | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async makePayment(data: any, token?: string) {
    return await ServiceClient.callService("hive-billing-service", {
      method: "POST",
      url: `payments/mpesa/make-payment`,
      headers: { "x-access-token": token },
      data,
    });
  }
  async checkStatus(data: any, token?: string) {
    return await ServiceClient.callService("hive-billing-service", {
      method: "POST",
      url: `payments/mpesa/query-status`,
      headers: { "x-access-token": token },
      data,
    });
  }
  async stkCallback(data: any, token?: string) {
    return await ServiceClient.callService("hive-billing-service", {
      method: "POST",
      url: `payments/mpesa/callback`,
      headers: { "x-access-token": token },
      data,
    });
  }
  async findOneById(id: string): Promise<MpesaTransaction | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<MpesaTransaction[]> {
    throw new Error("Method not implemented.");
  }
}
