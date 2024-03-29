import { Repository } from "../../../shared/types";
import ServiceClient from "../../../shared/ServiceClient";
import { AgencyMembership } from "../entities";

class AgentAgentAgencyMembershipRepository
  implements Repository<AgencyMembership, string>
{
  async create(
    entity: Partial<AgencyMembership>,
    agencyId: string
  ): Promise<AgencyMembership> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "POST",
      url: `agencies/${agencyId}/membership`,
      data: entity,
    });
  }

  async findOneById(
    id: string,
    agencyId: string
  ): Promise<AgencyMembership | undefined> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/membership/${id}`,
    });
  }

  async findByCriteria(
    criteria: Record<string, any>,
    agencyId: string
  ): Promise<AgencyMembership[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/membership`,
      params: criteria,
    });
  }

  async findAll(agencyId: string): Promise<AgencyMembership[]> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "GET",
      url: `agencies/${agencyId}/membership`,
    });
  }

  async updateById(
    id: string,
    updates: Partial<AgencyMembership>,
    agencyId: string
  ): Promise<AgencyMembership | undefined> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "PUT",
      url: `agencies/${agencyId}/membership/${id}`,
      data: updates,
    });
  }

  async deleteById(id: string, agencyId: string): Promise<void> {
    return ServiceClient.callService("hive-agencies-service", {
      method: "DELETE",
      url: `agencies/${agencyId}/membership/${id}`,
    });
  }

  async exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Not implented exception");
  }
}

export default AgentAgentAgencyMembershipRepository;
