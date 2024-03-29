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
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Repository<T extends Entity, ID> {
  create(entity: T, ...args: any[]): Promise<T>;
  findOneById(id: string, ...args: any[]): Promise<T | undefined>;
  findAll(...args: any[]): Promise<T[]>;
  findByCriteria(criteria: Record<string, any>, ...args: any[]): Promise<T[]>;
  updateById(
    id: ID,
    updates: Partial<T>,
    ...args: any[]
  ): Promise<T | undefined>;
  deleteById(id: ID, ...args: any[]): Promise<void>;
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

export interface Token {
  accessToken: string;
  refreshToken: string;
}
