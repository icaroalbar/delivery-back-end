import { Food } from "./food.entity";

export interface FoodRepository {
  save(food: Food): Promise<Food>;
  findById(id: string): Promise<Food>;
  update(food: Food): Promise<void>;
}
