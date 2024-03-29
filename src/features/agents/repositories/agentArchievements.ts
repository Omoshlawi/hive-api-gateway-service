import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { AgentArchievement } from "../entities";

class AgentArchievementRepository
  implements Repository<AgentArchievement, string>
{
  create(
    entity: Partial<AgentArchievement>,
    agentId: string
  ): Promise<AgentArchievement> {
    return ServiceClient.callService("hive-agents-service", {
      method: "POST",
      url: `agents/${agentId}/archivements`,
      data: entity,
    });
  }
  async findOneById(
    id: string,
    agentId: string
  ): Promise<AgentArchievement | undefined> {
    return ServiceClient.callService("hive-agents-service", {
      method: "GET",
      url: `agents/${agentId}/archivements/${id}`,
    });
  }
  findAll(agentId: string): Promise<AgentArchievement[]> {
    return ServiceClient.callService("hive-agents-service", {
      method: "GET",
      url: `agents/${agentId}/archivements`,
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    agentId: string
  ): Promise<AgentArchievement[]> {
    return ServiceClient.callService("hive-agents-service", {
      method: "GET",
      url: `agents/${agentId}/archivements`,
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<AgentArchievement>,
    agentId: string
  ): Promise<AgentArchievement | undefined> {
    return ServiceClient.callService("hive-agents-service", {
      method: "PUT",
      url: `agents/${agentId}/archivements/${id}`,
      data: updates,
    });
  }
  async deleteById(id: string, agentId: string): Promise<void> {
    return ServiceClient.callService("hive-agents-service", {
      method: "DELETE",
      url: `agents/${agentId}/archivements/${id}`,
    });
  }
  async exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Not implemted exceptions");
  }
}

export default AgentArchievementRepository;
