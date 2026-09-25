import { Injectable } from '@nestjs/common';
import { IFoodRepository } from '../../domain/foods/food.repository.interface';
import { Food } from '../../domain/foods/food.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaFoodRepository implements IFoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(foodData: Omit<Food, 'id'>): Promise<Food> {
    const record = await this.prisma.food.create({ data: { ...foodData } as any });
    return new Food(record.id, record.name, record.description ?? null, record.price);
  }

  async findById(id: string): Promise<Food | null> {
    const record = await this.prisma.food.findUnique({ where: { id } });
    if (!record) return null;
    return new Food(record.id, record.name, record.description ?? null, record.price);
  }

  async list(): Promise<Food[]> {
    const rows = await this.prisma.food.findMany();
    return rows.map(r => new Food(r.id, r.name, r.description ?? null, r.price));
  }
}
