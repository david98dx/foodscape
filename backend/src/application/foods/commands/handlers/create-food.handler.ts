import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateFoodCommand } from '../create-food.command';
import { IFoodRepository } from '../../../domain/foods/food.repository.interface';
import { Injectable, Inject } from '@nestjs/common';

@CommandHandler(CreateFoodCommand)
@Injectable()
export class CreateFoodHandler implements ICommandHandler<CreateFoodCommand> {
  constructor(@Inject('IFoodRepository') private readonly repo: IFoodRepository, private readonly events: EventBus) {}

  async execute(command: CreateFoodCommand) {
    const { name, description, price } = command;
    const created = await this.repo.create({ name, description, price } as any);

    // emit a domain event into the EventBus and persist to event store as needed
    this.events.publish({ type: 'FoodCreated', payload: { id: created.id, name, price } });

    return created;
  }
}
