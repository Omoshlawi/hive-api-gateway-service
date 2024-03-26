import PersonRepository from "./PersonRepository";
import UserRepository from "./UserRepository";
export * from "./UserRepository";
export const userRepo = new UserRepository();
export const personRepo = new PersonRepository();
