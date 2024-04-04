import { isEmpty } from "lodash";
import ServiceClient from "../../../shared/ServiceClient";
import { Owner } from "../entities";
import { Repository } from "../../../shared/types";

class OwnerRepository implements Repository<Owner, string> {
  async create(entity: Partial<Owner>): Promise<Owner> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "POST",
      url: `owners`,
      data: entity,
    });
  }

  async findOneById(
    id: string,
    params: Record<string, any>
  ): Promise<Owner | undefined> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `owners/${id}`,
      params,
    });
  }
  async findAll(): Promise<Owner[]> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `owners`,
    });
  }
  async findByCriteria(criteria: Record<string, any>): Promise<Owner[]> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `owners`,
      params: criteria,
    });
  }
  async updateById(
    id: string,
    updates: Partial<Owner>
  ): Promise<Owner | undefined> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "PUT",
      url: `owners/${id}`,
      data: updates,
    });
  }
  async deleteById(id: string): Promise<void> {
    return await ServiceClient.callService("hive-ownership-service", {
      method: "DELETE",
      url: `owners/${id}`,
    });
  }
  async exists(criteria: Record<string, any>): Promise<boolean> {
    throw Error("Unimplemented error");
  }
}

export default OwnerRepository;
