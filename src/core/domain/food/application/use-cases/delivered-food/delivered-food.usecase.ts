import { FoodRepository } from "../../../domain/food.repository";
import { DeliveredFoodOutputDto } from "./delivered-food.dto";

export class CreateDeliveryUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(id: string): Promise<DeliveredFoodOutputDto> {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new Error("Pedido não encontrado");
    }

    food.delivered();
    await this.foodRepository.update(food);

    return {
      id: food.getId(),
      status: food.getStatus(),
      estimatedDeliveryTime: food.estimatedDelivery(),
    };
  }
}
