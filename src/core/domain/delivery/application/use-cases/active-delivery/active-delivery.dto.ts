import { UUID } from "node:crypto";

export interface ActiveDeliveryOutputDto {
  id: UUID;
  name: string;
  plate: string;
  available: boolean;
  createdAt: Date;
}
