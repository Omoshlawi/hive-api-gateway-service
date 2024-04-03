import { Entity } from "../../../shared/types";
import { UploadFile } from "../../files/entities";

export interface Account extends Entity {
  id: string;
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
  id: string;
  username?: string;
  person?: Person;
  accountVerified?: Date;
  password?: string;
  lastLogin?: Date;
  active: boolean;
  accounts: Account[];
}

export interface Person extends Entity {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: "MALE" | "FEMALE" | "UNKNOWN";
  image?: UploadFile;
  phoneNumber?: string;
}
