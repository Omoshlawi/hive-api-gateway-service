import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Location } from "./../entities/index";

class LocationRepository implements Repository<Location, string> {
  async create(entity: Location): Promise<Location> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/locations`,
      method: "POST",
    });
  }
  async findOneById(id: string): Promise<Location | undefined> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/locations/${id}`,
      method: "GET",
    });
  }
  async findAll(): Promise<Location[]> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties`,
      method: "GET",
    });
  }
  async findByCriteria(criteria: Record<string, any>): Promise<Location[]> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/locations`,
      method: "GET",
    });
  }
  async updateById(
    id: string,
    updates: Partial<Location>
  ): Promise<Location | undefined> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/locations/${id}`,
      method: "PUT",
    });
  }
  async deleteById(id: string): Promise<void> {
    return await ServiceClient.callService("hive-properties-service", {
      url: `properties/locations/${id}`,
      method: "DELETE",
    });
  }
}

export default LocationRepository;
