import { UUID } from "node:crypto";

export interface DeactivateDeliveryOutputDto {
  id: UUID;
  name: string;
  plate: string;
  available: boolean;
  createdAt: Date;
}
