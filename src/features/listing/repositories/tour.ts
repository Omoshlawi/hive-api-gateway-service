import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { TourSchedule } from "../entities";

export class TourScgeduleRepository implements Repository<TourSchedule, string> {
  create(entity: Partial<TourSchedule>, listingId:string, token:string): Promise<TourSchedule> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours/${listingId}`,
        method: "POST",
        data: entity,
        headers: {"x-access-token": token}
      });
  }
  async findOneById(id: string, token:string): Promise<TourSchedule | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours/${id}`,
        method: "GET",
        headers: {"x-access-token": token}
      });
  }
  findAll(token:string): Promise<TourSchedule[]> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours`,
        method: "GET",
        headers: {"x-access-token": token}
      });
  }
  findByCriteria(
    criteria: Record<string, any>,
    token:string
  ): Promise<TourSchedule[]> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours`,
        method: "GET",
        params: criteria,
        headers: {"x-access-token": token}
      });
  }
  updateById(
    id: string,
    updates: Partial<TourSchedule>
  ): Promise<TourSchedule | undefined> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours/${id}`,
        method: "PUT",
        data: updates,
      });
  }
  async deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-property-listing-service", {
        url: `listings/tours/${id}`,
        method: "DELETE",
      });
  }
}

