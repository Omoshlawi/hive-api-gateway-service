import OwnershipRepository from "./OwnerShipRepository";
import OwnerRepository from "./OwnerRepository";

export { default as OwnershipRepository } from "./OwnerRepository";

export const ownerRepo = new OwnerRepository();
export const ownerShipRepo = new OwnershipRepository();
