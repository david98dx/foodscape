export class CreateFoodCommand {
  constructor(
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
  ) {}
}
