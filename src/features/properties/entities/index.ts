import { Entity } from "../../../shared/types";

interface PropertyAttribute extends Entity {
  name: string;
  value: string;
}

export interface Location extends Entity {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  longitude: number;
  latitude: number;
}

export interface Property extends Entity {
  title: string;
  types: string[];
  description?: string;
  sqftSize?: number;
  date_build?: Date;
  published: boolean;
  amenities: string[];
  images: string[];
  location: Location;
  attributes: PropertyAttribute[];
}
