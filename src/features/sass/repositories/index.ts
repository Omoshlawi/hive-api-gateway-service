import { FeaturesRepository } from "./features";
import { PricingRepository } from "./pricing";
export * from "./features";
export * from "./pricing";
export const pricingRepo = new PricingRepository();
export const featuresRepo = new FeaturesRepository();
