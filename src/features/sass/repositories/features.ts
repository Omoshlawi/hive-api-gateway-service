import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Feature } from "../entities";

export class FeaturesRepository implements Repository<Feature, string> {
  /**
   * @todo Ensure no other feature with same name
   * @param entity
   * @returns
   */
  async create(entity: Partial<Feature>): Promise<Feature> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features`,
      method: "POST",
      data: entity,
    });
  }
  async findOneById(id: string): Promise<Feature | undefined> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features/${id}`,
      method: "GET",
    });
  }
  async findAll(): Promise<Feature[]> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features`,
      method: "GET",
    });
  }
  async findByCriteria(criteria: Record<string, any>): Promise<Feature[]> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features`,
      method: "GET",
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<Feature>
  ): Promise<Feature | undefined> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  async deleteById(id: string): Promise<void> {
    return await ServiceClient.callService("hive-sass-service", {
      url: `pricing/features/${id}`,
      method: "DELETE",
    });
  }
}
