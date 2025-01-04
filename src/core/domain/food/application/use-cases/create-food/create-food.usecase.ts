import { Food } from "../../../domain/food.entity";
import { FoodRepository } from "../../../domain/food.repository";
import { CreateFoodInputDto, CreateFoodOutputDto } from "./create-food.dto";

export class CreateFoodUseCase {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(input: CreateFoodInputDto): Promise<CreateFoodOutputDto> {
    const food = new Food(input);
    await this.foodRepository.save(food);

    return {
      id: food.getId(),
      date: food.getDate(),
      phone: food.getPhone(),
      name: food.getName(),
      products: food.getProducts(),
      address: food.getAddress(),
      payment: food.getPayment(),
      status: food.getStatus(),
      estimatedDeliveryTime: food.estimatedDelivery(),
    };
  }
}
