import ListingsRepository from "./ListingsRepository";
import RentalRepository from "./RentalsRepository";
import SalesRepository from "./SalesRepository";

export const salesListingRepo = new SalesRepository();
export const rentalListingRepo = new RentalRepository();
export const listingRepo = new ListingsRepository();
