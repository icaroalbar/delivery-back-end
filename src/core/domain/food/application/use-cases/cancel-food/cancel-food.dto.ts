import { UUID } from "node:crypto";
import { StatusType } from "../../../domain/food.entity";

export interface CancelFoodOutputDto {
  id: UUID;
  status: StatusType;
}
