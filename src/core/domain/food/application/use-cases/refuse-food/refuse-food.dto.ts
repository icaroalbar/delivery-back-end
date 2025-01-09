import { UUID } from "node:crypto";
import { StatusType } from "../../../domain/food.entity";

export interface RefuseFoodOutputDto {
  id: UUID;
  status: StatusType;
}
