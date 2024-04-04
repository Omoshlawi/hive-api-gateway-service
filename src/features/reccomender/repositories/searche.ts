import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Search } from "../entities";

export class SearchRepository implements Repository<Search, string> {
  create(entity: Search, ...args: any[]): Promise<Search> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string, ...args: any[]): Promise<Search | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(personId: string): Promise<Search[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `user-searches/${personId}`,
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    personId: string
  ): Promise<Search[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `user-searches/${personId}`,
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<Search>,
    ...args: any[]
  ): Promise<Search | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string, ...args: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
