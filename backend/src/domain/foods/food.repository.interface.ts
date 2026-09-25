import { Food } from './food.entity';

export interface IFoodRepository {
  create(food: Omit<Food, 'id'>): Promise<Food>;
  findById(id: string): Promise<Food | null>;
  list(): Promise<Food[]>;
}
