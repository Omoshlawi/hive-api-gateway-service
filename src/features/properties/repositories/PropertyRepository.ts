import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Property } from "../entities";

export class PropertyRepository implements Repository<Property, string> {
  async create(entity: Property): Promise<Property> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties`,
      method: "POST",
      data: entity,
    });
  }
  async findOneById(id: string): Promise<Property | undefined> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/${id}`,
      method: "GET",
    });
  }
  async findAll(): Promise<Property[]> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties`,
      method: "GET",
    });
  }
  async findByCriteria(criteria: Record<string, any>): Promise<Property[]> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties`,
      method: "GET",
    });
  }
  async updateById(
    id: string,
    updates: Partial<Property>
  ): Promise<Property | undefined> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/${id}`,
      method: "PUT",
      data: updates, 
    });
  }
  async deleteById(id: string): Promise<void> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/${id}`,
      method: "DELETE",
    });
  }
}

export default PropertyRepository;
