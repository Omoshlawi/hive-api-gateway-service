import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { SearchResult } from "../entities";

export class SearchResultsRepository
  implements Repository<SearchResult, string>
{
  create(entity: SearchResult, ...args: any[]): Promise<SearchResult> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string, ...args: any[]): Promise<SearchResult | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(personId: string): Promise<SearchResult[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `/user-searches/${personId}`,
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    personId: string
  ): Promise<SearchResult[]> {
    return ServiceClient.callService("hive-recommender-service", {
      method: "GET",
      url: `/user-searches/${personId}`,
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<SearchResult>,
    ...args: any[]
  ): Promise<SearchResult | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string, ...args: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
