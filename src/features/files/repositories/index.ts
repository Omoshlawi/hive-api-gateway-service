import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { objectToFormData } from "../../../utils";
import { FileUpload } from "../entities";

export class FileUploadRepository implements Repository<FileUpload, string> {
  async create(entity: FileUpload): Promise<FileUpload>;
  async create(data: FormData): Promise<FileUpload>;
  async create(arg: FileUpload | FormData): Promise<FileUpload> {
    return await ServiceClient.callService("hive-files-service", {
      method: "POST",
      url: `files/upload/array`,
      data: arg,
    });
  }
  async createMany(data: {
    files: File[];
    path?: string;
    serviceName: string;
    serviceVersion: string;
    fieldName: string;
  }): Promise<FileUpload[]> {
    return await ServiceClient.callService("hive-files-service", {
      method: "POST",
      url: `files/upload/array`,
      data: objectToFormData(data),
    });
  }
  findOneById(id: string): Promise<FileUpload | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<FileUpload[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(criteria: Record<string, any>): Promise<FileUpload[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<FileUpload>
  ): Promise<FileUpload | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export const fileRepo = new FileUploadRepository();
