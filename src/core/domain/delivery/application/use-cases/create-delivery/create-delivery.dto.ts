import { UUID } from "node:crypto";

export interface CreateDeliveryInputDto {
  name: string;
  plate: string;
}

export interface CreateDeliveryOutputDto {
  id: UUID;
  name: string;
  plate: string;
  available: boolean;
  createdAt: Date;
}
