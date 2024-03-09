import { FeaturesRepository } from "./features";
import { PricingRepository } from "./pricing";
import { userSubscriptionRepository } from "./subscriptions";
export * from "./features";
export * from "./pricing";
export const pricingRepo = new PricingRepository();
export const featuresRepo = new FeaturesRepository();
export const userSubscriptionsRepo = new userSubscriptionRepository();
