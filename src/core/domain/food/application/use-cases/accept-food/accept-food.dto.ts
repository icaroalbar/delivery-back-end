import { UUID } from "node:crypto";
import { StatusType } from "../../../domain/food.entity";

export interface AcceptFoodOutputDto {
  id: UUID;
  status: StatusType;
  estimatedDeliveryTime: string;
}
