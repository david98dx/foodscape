import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFoodCommand } from '../application/foods/commands/create-food.command';

class CreateFoodDto {
  name: string;
  description?: string;
  price: number;
}

@Controller('api/foods')
export class FoodsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async list() {
    // For now query handler not implemented; return 204 or empty
    return [];
  }

  @Post()
  async create(@Body() body: CreateFoodDto) {
    const cmd = new CreateFoodCommand(body.name, body.description ?? null, body.price);
    return this.commandBus.execute(cmd);
  }
}
