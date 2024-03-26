import { Entity } from "../../../shared/types";

export interface Account extends Entity {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

export interface User extends Entity {
  person?: Person;
  username?: string;
  accountVerified?: Date;
  password?: string;
  lastLogin?: Date;
  active: boolean;
  accounts: Account[];
}

export interface Person extends Entity {
  userId?: string;
  user?: User;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: "MALE" | "FEMALE" | "UKNOWN";
  image?: string;
}
