import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Person } from "../entities";

class PersonRepository implements Repository<Person, string> {
  create(entity: Partial<Person>): Promise<Person> {
    return ServiceClient.callService("hive-auth-service", {
      method: "POST",
      url: `person`,
      data: entity,
    });
  }
  findOneById(id: string): Promise<Person | undefined> {
    return ServiceClient.callService("hive-auth-service", {
      method: "GET",
      url: `person/${id}`,
    });
  }
  findAll(): Promise<Person[]> {
    return ServiceClient.callService("hive-auth-service", {
      method: "GET",
      url: `person`,
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Person[]> {
    return ServiceClient.callService("hive-auth-service", {
      method: "GET",
      url: `person`,
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<Person>
  ): Promise<Person | undefined> {
    return ServiceClient.callService("hive-auth-service", {
      method: "PUT",
      url: `person/${id}`,
      data: updates,
    });
  }
  async deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-auth-service", {
      method: "DELETE",
      url: `person/${id}`,
    });
  }
  async exists(criteria: any): Promise<boolean> {
    throw new Error("Not implemented exception");
  }
}

export default PersonRepository;
