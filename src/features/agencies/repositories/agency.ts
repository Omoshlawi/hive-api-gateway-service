import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Agency } from "../entities";

class AgencyRepository implements Repository<Agency, string> {
  create(entity: Agency): Promise<Agency> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "POST",
      url: `agencies`,
      data: entity,
    });
  }
  findOneById(id: string): Promise<any> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${id}`,
    });
  }
  findAll(): Promise<Agency[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies`,
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Agency[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies`,
      params: criteria,
    });
  }
  updateById(id: string, updates: Agency): Promise<any> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "PUT",
      url: `agencies/${id}`,
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "DELETE",
      url: `agencies/${id}`,
    });
  }
}

export default AgencyRepository;
