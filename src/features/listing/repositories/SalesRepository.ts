import ServiceClient from "../../../shared/ServiceClient";
import { Entity, Repository } from "../../../shared/types";
import { SaleListing } from "../entities";

class SalesRepository implements Repository<SaleListing, string> {
  create(entity: SaleListing): Promise<SaleListing> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales`,
      method: "POST",
      data: entity,
    });
  }
  findOneById(id: string): Promise<SaleListing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<SaleListing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<SaleListing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales`,
      method: "GET",
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<SaleListing>
  ): Promise<SaleListing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/sales/${id}`,
      method: "DELETE",
    });
  }
}

export default SalesRepository;
