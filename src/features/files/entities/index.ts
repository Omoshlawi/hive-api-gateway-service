import { Entity } from "../../../shared/types";

export interface FileUpload extends Entity {
  fieldName: string;
  serviceName: string;
  serviceVersion: string;
  path?: string;
}
