import { DeliveryRepository } from "../../../domain/delivery.repository";
import { UUID } from "node:crypto";
import { DeactivateDeliveryOutputDto } from "./deactivate-delivery.dto";

export class DeactivateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(deliveryId: UUID): Promise<DeactivateDeliveryOutputDto> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    delivery.deactivate();
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
