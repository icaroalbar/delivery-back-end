import { randomUUID } from "node:crypto";
import { Delivery } from "../../../domain/delivery.entity";
import { CreateDeliveryInputDto } from "./create-delivery.dto";
import { DeliveryRepository } from "../../../domain/delivery.repository";
import { CreateDeliveryUseCase } from "./create-delivery.usecase";

describe("DeliveredFoodUseCase", () => {
  const mockDeliveryRepository: jest.Mocked<DeliveryRepository> = {
    save: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  let createDeliveryUseCase: CreateDeliveryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createDeliveryUseCase = new CreateDeliveryUseCase(mockDeliveryRepository);
  });

  it("Deve criar e salvar uma nova entrega", async () => {
    const input: CreateDeliveryInputDto = {
      name: "João",
      plate: "ABC-1234",
    };

    const delivery = new Delivery({
      id: randomUUID(),
      name: input.name,
      plate: input.plate,
    });
    mockDeliveryRepository.save.mockResolvedValue(delivery);

    const result = await createDeliveryUseCase.execute(input);

    expect(result.id).toBe(result.id);
    expect(result.name).toBe(result.name);
    expect(result.plate).toBe(result.plate);
    expect(result.available).toBe(true);
  });
});
