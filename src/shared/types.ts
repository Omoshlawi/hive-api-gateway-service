import { Request } from "express";

export interface Service {
  host: string;
  port: number;
  name: string;
  version: string;
  timestamp?: number;
}

export interface UserRequest extends Request {
  user: any;
}

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Repository<T extends Entity, ID> {
  create(entity: T): Promise<T>;
  findOneById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  findByCriteria(criteria: Record<string, any>): Promise<T[]>;
  updateById(id: ID, updates: Partial<T>): Promise<T | undefined>;
  deleteById(id: ID): Promise<void>;
}

export abstract class BaseEntity implements Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
