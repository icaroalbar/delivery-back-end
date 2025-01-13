import { Delivery } from "./delivery.entity";
import { UUID } from "node:crypto";

export interface DeliveryRepository {
  save(newDelivery: Delivery): Promise<Delivery>;
  findById(deliveryId: UUID): Promise<Delivery>;
  update(newDelivery: Delivery): Promise<void>;
}
