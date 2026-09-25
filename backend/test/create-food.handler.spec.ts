import { CreateFoodHandler } from '../src/application/foods/commands/handlers/create-food.handler';
import { CreateFoodCommand } from '../src/application/foods/commands/create-food.command';

class MockRepo {
  created: any = null;
  async create(data: any) {
    this.created = { id: 'uuid-1', ...data };
    return this.created;
  }
  async findById() { return null; }
  async list() { return []; }
}

class MockEventBus { events: any[] = []; publish(e: any) { this.events.push(e); } }

describe('CreateFoodHandler', () => {
  it('creates a food and publishes event', async () => {
    const repo = new MockRepo();
    const events = new MockEventBus();
    const handler = new CreateFoodHandler(repo as any, events as any, undefined as any);

    const cmd = new CreateFoodCommand('Pizza', 'Delicious', 9.99);
    const result = await handler.execute(cmd as any);

    expect(result).toBeDefined();
    expect(result.id).toBe('uuid-1');
    expect(events.events.length).toBe(1);
    expect(events.events[0].type).toBe('FoodCreated');
  });
});
