import { DeliveryRepository } from "../../../domain/delivery.repository";
import { UUID } from "node:crypto";
import { ActiveDeliveryOutputDto } from "./active-delivery.dto";

export class ActiveDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(deliveryId: UUID): Promise<ActiveDeliveryOutputDto> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    delivery.active();
    await this.deliveryRepository.update(delivery);

    return {
      id: delivery.getId(),
      name: delivery.getName(),
      plate: delivery.getPlate(),
      createdAt: delivery.getCreatedAt(),
      available: delivery.isAvailable(),
    };
  }
}
