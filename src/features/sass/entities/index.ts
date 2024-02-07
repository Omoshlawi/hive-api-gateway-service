import { Entity } from "../../../shared/types";

export interface Pricing extends Entity {
  id: string;
  name: string;
  billingInterval: "yearly" | "monthly";
  price: number;
  description: string | null;
  featurePricing: FeaturePricing[];
}

export interface Feature extends Entity {
  id: string;
  name: string;
  code: "listings" | "properties" | "groups";
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  featurePricing: FeaturePricing[]

}

export interface FeaturePricing {
    id: string;
    pricingId?: string;
    featureId?: string;
    limit?: number;
    included?: boolean;
    pricing?:Pricing
    
}
