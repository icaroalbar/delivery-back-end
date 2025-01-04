import { FoodRepository } from "../../../domain/food.repository";
import { AcceptFoodOutputDto } from "./accept-food.dto";

export class AcceptFoodUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(id: string): Promise<AcceptFoodOutputDto> {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new Error("Pedido não encontrado");
    }

    food.accepted();
    await this.foodRepository.update(food);

    return {
      id: food.getId(),
      status: food.getStatus(),
      estimatedDeliveryTime: food.estimatedDelivery(),
    };
  }
}
