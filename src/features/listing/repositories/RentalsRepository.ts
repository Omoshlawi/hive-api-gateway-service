import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { RentalListing } from "../entities";

class RentalRepository implements Repository<RentalListing, string> {
  create(entity: RentalListing): Promise<RentalListing> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals`,
      method: "POST",
      data: entity,
    });
  }
  findOneById(id: string): Promise<RentalListing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<RentalListing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<RentalListing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals`,
      method: "GET",
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<RentalListing>
  ): Promise<RentalListing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/rentals/${id}`,
      method: "DELETE",
    });
  }
}

export default RentalRepository;
