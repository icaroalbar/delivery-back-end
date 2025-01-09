import { FoodRepository } from "../../../domain/food.repository";
import { Food } from "../../../domain/food.entity";
import { randomUUID } from "node:crypto";
import { Menu } from "../../../../menu/menu.entity";
import { Category } from "../../../../category/category.entity";
import { Address } from "../../../../address/address.valueobject";
import { Payment, PaymentType } from "../../../../payment/payment.entity";
import { DeliveredFoodUseCase } from "./delivered-food.usecase";
import { Delivery } from "../../../../delivery/delivery.entity";

const product = new Menu({
  id: randomUUID(),
  name: "Pizza calabreza",
  category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
  price: 50,
  quantity: 1,
  preparationTime: 20,
});

const address = new Address({
  id: randomUUID(),
  street: "Rua X",
  number: "123",
  district: "district",
});

const payment = new Payment({
  id: randomUUID(),
  type: PaymentType.DEBITO,
  value: 50,
});

const delivery = new Delivery({
  id: randomUUID(),
  name: "João",
  plate: "ABC-1234",
});

const mockFood = new Food({
  id: randomUUID(),
  phone: "+5511999999999",
  date: new Date(),
  name: "Pedido Teste",
  products: [product],
  address,
  payment,
});

const mockFoodRepository: jest.Mocked<FoodRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe("DeliveredFoodUseCase", () => {
  let deliveredFoodUseCase: DeliveredFoodUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deliveredFoodUseCase = new DeliveredFoodUseCase(mockFoodRepository);
  });

  it("Deve mudar o status para entregue", async () => {
    mockFood.accepted();
    mockFood.ready();
    mockFood.addDelivery(delivery);
    mockFoodRepository.findById.mockResolvedValue(mockFood);
    const result = await deliveredFoodUseCase.execute(mockFood.getId());

    expect(mockFoodRepository.findById).toHaveBeenCalledWith(mockFood.getId());
    expect(mockFoodRepository.update).toHaveBeenCalledWith(mockFood);
    expect(result.status).toBe(6);
  });
});
