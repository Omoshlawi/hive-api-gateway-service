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
  findAll(...args: any[]): Promise<SearchResult[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(
    criteria: Record<string, any>,
    ...args: any[]
  ): Promise<SearchResult[]> {
    throw new Error("Method not implemented.");
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
