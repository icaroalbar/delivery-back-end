import { UUID } from "node:crypto";
import { StatusType } from "../../../domain/food.entity";

export interface ReadyFoodOutputDto {
  id: UUID;
  status: StatusType;
  estimatedDeliveryTime: string;
}
