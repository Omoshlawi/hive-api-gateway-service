import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { AgencyArchievement } from "../entities";

class AgencyArchievementRepository
  implements Repository<AgencyArchievement, string>
{
  create(
    entity: Partial<AgencyArchievement>,
    agencyId: string
  ): Promise<AgencyArchievement> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "POST",
      url: `agencies/${agencyId}/archivements`,
      data: entity,
    });
  }
  async findOneById(
    id: string,
    agencyId: string
  ): Promise<AgencyArchievement | undefined> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/archivements/${id}`,
    });
  }
  findAll(agencyId: string): Promise<AgencyArchievement[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/archivements`,
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    agencyId: string
  ): Promise<AgencyArchievement[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/archivements`,
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<AgencyArchievement>,
    agencyId: string
  ): Promise<AgencyArchievement | undefined> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "PUT",
      url: `agencies/${agencyId}/archivements/${id}`,
      data: updates,
    });
  }
  async deleteById(id: string, agencyId: string): Promise<void> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "DELETE",
      url: `agencies/${agencyId}/archivements/${id}`,
    });
  }
  async exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Not implemted exceptions");
  }
}

export default AgencyArchievementRepository;
