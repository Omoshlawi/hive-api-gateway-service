import { Repository } from "../../../shared/types";
import { Resource } from "../entities";

export class ResourceRepository implements Repository<Resource, string> {
  create(entity: Resource, ...args: any[]): Promise<Resource> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string, ...args: any[]): Promise<Resource | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(...args: any[]): Promise<Resource[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(
    criteria: Record<string, any>,
    ...args: any[]
  ): Promise<Resource[]> {
    throw new Error("Method not implemented.");
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
