import { FoodRepository } from "../../../domain/food.repository";
import { Food } from "../../../domain/food.entity";
import { randomUUID } from "node:crypto";
import { Menu } from "../../../../menu/menu.entity";
import { Category } from "../../../../category/category.entity";
import { Address } from "../../../../address/address.valueobject";
import { Payment, PaymentType } from "../../../../payment/payment.entity";
import { ReadyFoodUseCase } from "./ready-food.usecase";

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

describe("ReadyFoodUseCase", () => {
  let readyFoodUseCase: ReadyFoodUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    readyFoodUseCase = new ReadyFoodUseCase(mockFoodRepository);
  });

  it("Deve mudar o status do pedido para aguardando entregador", async () => {
    mockFood.accepted();
    mockFoodRepository.findById.mockResolvedValue(mockFood);
    const result = await readyFoodUseCase.execute(mockFood.getId());

    expect(mockFoodRepository.findById).toHaveBeenCalledWith(mockFood.getId());
    expect(mockFoodRepository.update).toHaveBeenCalledWith(mockFood);
    expect(result.status).toBe(4);
  });
});
