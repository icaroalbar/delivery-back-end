import { Delivery } from "../../../domain/delivery.entity";
import { DeliveryRepository } from "../../../domain/delivery.repository";
import {
  CreateDeliveryInputDto,
  CreateDeliveryOutputDto,
} from "./create-delivery.dto";
import { randomUUID } from "node:crypto";

export class CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(
    input: CreateDeliveryInputDto
  ): Promise<CreateDeliveryOutputDto> {
    const delivery = new Delivery({
      id: randomUUID(),
      name: input.name,
      plate: input.plate,
    });

    const newDelivery = await this.deliveryRepository.save(delivery);

    return {
      id: newDelivery.getId(),
      name: newDelivery.getName(),
      plate: newDelivery.getPlate(),
      available: newDelivery.isAvailable(),
      createdAt: newDelivery.getCreatedAt(),
    };
  }
}
