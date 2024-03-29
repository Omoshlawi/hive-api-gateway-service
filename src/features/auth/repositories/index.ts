import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { User } from "../entities";

export class AuthRepository implements Repository<User, string> {
  create(entity: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(criteria: Record<string, any>): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  updateById(id: string, updates: Partial<User>): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async credentialsSignUp(data: any) {
    return await ServiceClient.callService("hive-auth-service", {
      url: "api/auth/signup",
      method: "POST",
      data,
    });
  }
  async googleSignin(params: Record<string, any>) {
    return await ServiceClient.callService("hive-auth-service", {
      url: "api/auth/signin/google",
      method: "GET",
      params: params,
    });
  }

  async login(data: any) {
    return await ServiceClient.callService("hive-auth-service", {
      url: "api/auth/signin/credentials",
      method: "POST",
      data,
    });
  }

  /**
   * Decordes jwt token to extract Id and gets user with Id
   * @param token {string}
   * @throws Unauthorized exception with status 401
   * @returns {User} object
   */
  async getUserByToken(token: string) {
    return await ServiceClient.callService("hive-auth-service", {
      url: "users/profile",
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
  }
  async refreshUserToken(token: string) {
    return await ServiceClient.callService("hive-auth-service", {
      url: "api/auth/refresh-token",
      method: "GET",
      headers: {
        "x-refresh-token": token,
      },
    });
  }
}

export const authRepo = new AuthRepository();
