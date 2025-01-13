import { randomUUID } from "node:crypto";
import { Delivery } from "../../../domain/delivery.entity";
import { DeliveryRepository } from "../../../domain/delivery.repository";
import { ActiveDeliveryUseCase } from "./active-delivery.usecase";

describe("ActiveDeliveryUseCase", () => {
  const mockDeliveryRepository: jest.Mocked<DeliveryRepository> = {
    save: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  let activeDeliveryUseCase: ActiveDeliveryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    activeDeliveryUseCase = new ActiveDeliveryUseCase(mockDeliveryRepository);
  });

  it("Deve ativar uma entrega com sucesso", async () => {
    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    mockDeliveryRepository.findById.mockResolvedValue(delivery);

    mockDeliveryRepository.update.mockResolvedValue();

    const result = await activeDeliveryUseCase.execute(delivery.getId());

    expect(mockDeliveryRepository.findById).toHaveBeenCalledWith(
      delivery.getId()
    );

    expect(mockDeliveryRepository.update).toHaveBeenCalledWith(delivery);

    expect(result.id).toBe(delivery.getId());
    expect(result.name).toBe(delivery.getName());
    expect(result.plate).toBe(delivery.getPlate());

    expect(result.available).toBe(true);
  });
});
