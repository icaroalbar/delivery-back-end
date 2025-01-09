import { FoodRepository } from "../../../domain/food.repository";
import { ReadyFoodOutputDto } from "./ready-food.dto";

export class ReadyFoodUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(id: string): Promise<ReadyFoodOutputDto> {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new Error("Pedido não encontrado");
    }

    food.ready();
    await this.foodRepository.update(food);

    return {
      id: food.getId(),
      status: food.getStatus(),
      estimatedDeliveryTime: food.estimatedDelivery(),
    };
  }
}
