import { FoodRepository } from "../../../domain/food.repository";
import { RefuseFoodOutputDto } from "./refuse-food.dto";

export class RefuseFoodUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(id: string): Promise<RefuseFoodOutputDto> {
    const food = await this.foodRepository.findById(id);

    if (!food) {
      throw new Error("Pedido não encontrado");
    }

    food.refuse();
    await this.foodRepository.update(food);

    return {
      id: food.getId(),
      status: food.getStatus(),
    };
  }
}
