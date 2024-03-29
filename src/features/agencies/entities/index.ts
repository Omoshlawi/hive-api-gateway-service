import { Entity } from "../../../shared/types";
import { Agent } from "../../agents/entities";
import { FileUpload, UploadFile } from "../../files/entities";

export interface Agency extends Entity {
  id: string;
  name: string;
  description?: string;
  memberShips: AgencyMembership[];
  website?: string;
  logo: UploadFile;
  specialties: string[];
  tags: string[];
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  state: string;
  zipCode?: string;
  achievements: AgencyArchievement[];
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

export interface AgencyArchievement extends Entity {
  id: string;
  agencyId?: string;
  agency?: Agency;
  attachments: Record<string, any>;
  description: string;
}

export interface AgencyMembership extends Entity {
  id: string;
  agencyId?: string;
  agency?: Agency;
  agent: Partial<Agent>;
  note?: string;
}
