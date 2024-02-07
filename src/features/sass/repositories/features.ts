import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Pricing } from "../entities";

export class PricingRepository implements Repository<Pricing, string> {
  /**
   * Creates pricing
   * @todo Assert no other pricing with similar name
   * @param entity
   * @throws
   * @returns
   */
  async create(entity: Partial<Pricing>): Promise<Pricing> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing`,
      method: "POST",
      data: entity,
    });
  }
  async findOneById(id: string): Promise<Pricing | undefined> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/${id}`,
      method: "GET",
    });
  }
  async findAll(): Promise<Pricing[]> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing`,
      method: "GET",
    });
  }
  async findByCriteria(criteria: Record<string, any>): Promise<Pricing[]> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing`,
      method: "GET",
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<Pricing>
  ): Promise<Pricing | undefined> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  async deleteById(id: string): Promise<void> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/${id}`,
      method: "DELETE",
    });
  }
  /**
   * Adds feature limit only if no other similar limit
   * @todo Check if the limite featre exist on db
   *
   * @param pricing
   * @param limits
   * @returns
   */
}

