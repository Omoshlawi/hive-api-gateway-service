import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { UserSubscription } from "../entities";

export class userSubscriptionRepository
  implements Repository<UserSubscription, string>
{
  create(entity: UserSubscription, token?: string): Promise<UserSubscription> {
    return ServiceClient.callService("hive-sass-service", {
      url: `pricing/subscriptions`,
      method: "POST",
      data: entity,
      headers: { "x-access-token": token },
    });
  }

  findOneById(id: string): Promise<UserSubscription | undefined> {
    throw new Error("Method not implemented.");
  }
  findUserSubscriptions(
    userId: string,
    token?: string
  ): Promise<UserSubscription[]> {
    return ServiceClient.callService("hive-sass-service", {
      url: `pricing/subscriptions`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  cancelUserSubscription(
    userId: string,
    subscriptionId: string,
    token?: string
  ): Promise<UserSubscription[]> {
    return ServiceClient.callService("hive-sass-service", {
      url: `pricing/subscriptions/${subscriptionId}`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  findAll(token?: string): Promise<UserSubscription[]> {
    return ServiceClient.callService("hive-sass-service", {
      url: `pricing/subscriptions`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    token?: string
  ): Promise<UserSubscription[]> {
    return ServiceClient.callService("hive-sass-service", {
      url: `pricing/subscriptions`,
      method: "GET",
    });
  }
  updateById(
    id: string,
    updates: Partial<UserSubscription>
  ): Promise<UserSubscription | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const userSubscriptionsRepo = new userSubscriptionRepository();
