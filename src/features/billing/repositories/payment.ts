import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Payment } from "../entities";

export class PaymentsRepository implements Repository<Payment, string> {
  create(entity: Payment, token?: string): Promise<Payment> {
    return ServiceClient.callService("hive-billing-service", {
      method: "POST",
      url: `payments/mpesa/make-payment`,
      headers: { "x-access-token": token },
    });
  }
  findOneById(id: string, token?: string): Promise<Payment | undefined> {
    return ServiceClient.callService("hive-billing-service", {
      method: "POST",
      url: `payments/mpesa/make-payment`,
      headers: { "x-access-token": token },
    });
  }
  findAll(token?: string): Promise<Payment[]> {
    return ServiceClient.callService("hive-billing-service", {
      method: "GET",
      url: `payments`,
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Payment[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Payment>
  ): Promise<Payment | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
