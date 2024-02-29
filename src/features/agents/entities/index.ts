import { Entity } from "../../../shared/types";
import { FileUpload, UploadFile } from "../../files/entities";

export interface Agent extends Entity {
  id: string;
  firstName: string;
  lastName: string;
  user: string;
  profilePic?: UploadFile;
  specialties: string[];
  licenses?: UploadFile; // TODO  REPLACE WITH actual model
  achievements?: string[]; // TODO  REPLACE WITH actual model
  bio?: string;
}

export interface AgentContact extends Entity {
  id: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface AgencyMembership extends Entity {
  id: string;
  note?: string;
  agency: string;
}
