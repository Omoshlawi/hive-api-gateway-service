import { Entity } from "../../../shared/types";
import { Person } from "../../auth/entities";

export interface Resource extends Entity {
  id: string;
  name: string;
  pathName: string;
  description: string | null;
}

export interface Search extends Entity {
  id: string;
  resourceId: string;
  resource: Resource;
  person: Person;
  params: SearchParam[];
  results: SearchResult[];
}

export interface SearchParam extends Entity {
  id: number;
  searchId: string;
  search?: Search;
  name: string;
  value: string;
}

export interface SearchResult extends Entity {
  id: string;
  searchId: string;
  search?: Search;
  results: string[];
}
