import { UUID } from "node:crypto";
import { Menu } from "../../../../menu/menu.entity";
import { Address } from "../../../../address/address.valueobject";
import { Payment } from "../../../../payment/payment.entity";
import { StatusType } from "../../../domain/food.entity";

export interface CreateFoodInputDto {
  id: UUID;
  date: Date;
  phone: string;
  name: string;
  products: Menu[];
  address: Address;
  payment: Payment;
}

export interface CreateFoodOutputDto {
  id: UUID;
  date: Date;
  phone: string;
  name: string;
  products: Menu[];
  address: Address;
  payment: Payment;
  status: StatusType;
  estimatedDeliveryTime: string;
}
