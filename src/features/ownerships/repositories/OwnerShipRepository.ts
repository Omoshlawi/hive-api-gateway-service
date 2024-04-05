import { isEmpty } from "lodash";
import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { OwnerShip } from "../entities";

class OwnershipRepository implements Repository<OwnerShip, string> {
  create(entity: OwnerShip): Promise<OwnerShip> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "POST",
      url: `ownerships`,
      data: entity,
    });
  }
  findOneById(id: string): Promise<OwnerShip | undefined> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `ownerships/${id}`,
    });
  }
  findAll(): Promise<OwnerShip[]> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `ownerships`,
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<OwnerShip[]> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `ownerships`,
      params: criteria,
    });
  }
  findByIds(id: string, params: Record<string, any>): Promise<OwnerShip[]> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "GET",
      url: `ownerships/by/${id}`,
      params: params,
    });
  }
  updateById(
    id: string,
    updates: Partial<OwnerShip>
  ): Promise<OwnerShip | undefined> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "PUT",
      url: `ownerships/${id}`,
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("hive-ownership-service", {
      method: "DELETE",
      url: `ownerships/${id}`,
    });
  }
}

export default OwnershipRepository;
