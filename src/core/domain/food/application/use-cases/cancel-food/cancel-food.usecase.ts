import { FoodRepository } from "../../../domain/food.repository";
import { CancelFoodOutputDto } from "./cancel-food.dto";

export class CancelFoodUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(id: string): Promise<CancelFoodOutputDto> {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new Error("Pedido não encontrado");
    }

    food.cancel();
    await this.foodRepository.update(food);

    return {
      id: food.getId(),
      status: food.getStatus(),
    };
  }
}
