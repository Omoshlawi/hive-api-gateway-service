import { ResourceRepository } from "./resource";
import { SearchRepository } from "./searche";
import { SearchResultsRepository } from "./searchResults";

export const searchRepo = new SearchRepository();
export const searchResultsRepo = new SearchResultsRepository();
export const resourceRepo = new ResourceRepository();
