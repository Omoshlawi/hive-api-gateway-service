import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Resource } from "../entities";

export class ResourceRepository implements Repository<Resource, string> {
  create(entity: Resource): Promise<Resource> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "POST",
      url: `resources`,
      data: entity,
    });
  }
  findOneById(id: string, ...args: any[]): Promise<Resource | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Resource[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `resources`,
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    ...args: any[]
  ): Promise<Resource[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `resources`,
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<Resource>,
    ...args: any[]
  ): Promise<Resource | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string, ...args: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
