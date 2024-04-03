import { Repository } from "../../../shared/types";
import { Search } from "../entities";

export class SearchRepository implements Repository<Search, string>{
    create(entity: Search, ...args: any[]): Promise<Search> {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string, ...args: any[]): Promise<Search | undefined> {
        throw new Error("Method not implemented.");
    }
    findAll(...args: any[]): Promise<Search[]> {
        throw new Error("Method not implemented.");
    }
    findByCriteria(criteria: Record<string, any>, ...args: any[]): Promise<Search[]> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, updates: Partial<Search>, ...args: any[]): Promise<Search | undefined> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string, ...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}