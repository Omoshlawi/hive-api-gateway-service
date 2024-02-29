import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Agent } from "../entities";

export class AgentRepository implements Repository<Agent, string> {
  create(entity: Agent): Promise<Agent> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents`,
      method: "POST",
      data: entity,
    });
  }
  findOneById(id: string): Promise<Agent | undefined> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<Agent[]> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Agent[]> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents`,
      method: "GET",
      params: criteria,
    });
  }
  updateById(id: string, updates: Partial<Agent>): Promise<Agent | undefined> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-agents-service", {
      url: `agents/${id}`,
      method: "DELETE",
    });
  }
}
