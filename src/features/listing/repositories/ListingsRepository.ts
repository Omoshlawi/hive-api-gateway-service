import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Listing } from "../entities";

class ListingsRepository implements Repository<Listing, string> {
  create(entity: Listing): Promise<Listing> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings`,
      method: "POST",
      data: entity,
    });
  }
  findOneById(id: string): Promise<Listing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<Listing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings`,
      method: "GET",
    });
  }
  findByCategory(category:string): Promise<Listing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/categories/${category}`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Listing[]> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings`,
      method: "GET",
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<Listing>
  ): Promise<Listing | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-property-listing-service", {
      url: `listings/${id}`,
      method: "DELETE",
    });
  }
}


export default ListingsRepository