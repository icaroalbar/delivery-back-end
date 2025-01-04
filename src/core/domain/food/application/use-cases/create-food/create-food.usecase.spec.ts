import { Address } from "../../../../address/address.valueobject";
import { Category } from "../../../../category/category.entity";
import { Menu } from "../../../../menu/menu.entity";
import { Payment, PaymentType } from "../../../../payment/payment.entity";
import { FoodRepository } from "../../../domain/food.repository";
import { CreateFoodInputDto } from "./create-food.dto";
import { CreateFoodUseCase } from "./create-food.usecase";
import { randomUUID } from "node:crypto";

const mockFoodRepository: jest.Mocked<FoodRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe("CreateFoodUseCase", () => {
  let createFoodUseCase: CreateFoodUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createFoodUseCase = new CreateFoodUseCase(mockFoodRepository);
  });

  it("Deve criar um novo pedido", async () => {
    const input: CreateFoodInputDto = {
      id: randomUUID(),
      phone: "+5511999999999",
      name: "Pedido Teste",
      products: [
        new Menu({
          id: randomUUID(),
          name: "Pizza Calabresa",
          category: new Category({ id: randomUUID(), name: "Pizza Salgada" }),
          price: 50,
          quantity: 2,
          preparationTime: 30,
        }),
        new Menu({
          id: randomUUID(),
          name: "Pizza Chocolate",
          category: new Category({ id: randomUUID(), name: "Pizza Doce" }),
          price: 60,
          quantity: 1,
          preparationTime: 20,
        }),
      ],
      address: new Address({
        id: randomUUID(),
        street: "Rua X",
        number: "123",
        district: "Centro",
      }),
      payment: new Payment({
        id: randomUUID(),
        type: PaymentType.DEBITO,
        value: 160,
      }),
      date: new Date(),
    };

    const result = await createFoodUseCase.execute(input);

    expect(mockFoodRepository.save).toHaveBeenCalledTimes(1);

    expect(result.id).toBe(input.id);
    expect(result.date).toBe(input.date);
    expect(result.phone).toBe(input.phone);
    expect(result.name).toBe(input.name);
    expect(result.products).toBe(input.products);
    expect(result.address).toBe(input.address);
    expect(result.payment).toBe(input.payment);
    expect(result.status).toBe(1);
    expect(result.estimatedDeliveryTime).toBeDefined();
  });
});
