import { UUID } from "node:crypto";
import { StatusType } from "../../../domain/food.entity";

export interface DeliveredFoodOutputDto {
  id: UUID;
  status: StatusType;
  estimatedDeliveryTime: string;
}
