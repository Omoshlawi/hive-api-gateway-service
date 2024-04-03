import { Entity } from "../../../shared/types";
import { Person } from "../../users/entities";

export interface Listing extends Entity {
  id: string;
  title: string;
  description: string;
  available: boolean;
  price: number;
  tags: string[];
  amenities: string[];
  coverImage: string;
  published: boolean;
  properties: ListingProperty[];
  rentalListings?: RentalListing[];
  saleListings?: SaleListing;
}

export interface ListingProperty extends Entity {
  id: string;
  listing: Listing;
  property: string;
  note?: string;
}

export interface RentalListing extends Entity {
  id: string;
  listing: Listing;
  depositRequired: number;
  renewalInterval: number;
}

export interface SaleListing extends Entity {
  id: string;
  listing: Listing;
  downPaymentRequired: number;
  closingDate: Date;
  mortgageOptions?: string;
}

export interface TourSchedule extends Entity {
  id: string;
  listingId: string;
  date: Date;
  time: string;
  person?: Person;
  notes?: string;
}
