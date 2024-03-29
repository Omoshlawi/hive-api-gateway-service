import { Entity } from "../../../shared/types";
import { FileUpload, UploadFile } from "../../files/entities";

export interface Agent extends Entity {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  user?: string;
  profilePic: UploadFile;
  specialties?: string[];
  licenseNumber?: string | null;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  state: string;
  zipCode?: string;
  achievements: AgentArchievement[];
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

export interface AgentArchievement extends Entity {
  id: string;
  agentId?: string;
  agent?: Agent;
  attachments: Record<string, any>;
  description: string;
}