import { Entity } from "../../../shared/types";
import { Property } from "../../properties/entities";

export interface Owner extends Entity {
  id: string;
  firstName: string;
  lastName: string;
  user?: string;
  email: string;
  phoneNumber: string;
  address: string;
  ownerShips: OwnerShip[];
}

export interface OwnerShip extends Entity {
  id: string;
  ownerId: string;
  property: Partial<Property>;
  type: "individual" | "joint";
  note?: string;
  shares?: number;
  coOwnershipAggrement: Record<string, any>;
  owner?: Owner;
}
