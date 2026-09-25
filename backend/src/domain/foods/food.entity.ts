export class Food {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public price: number,
  ) {}
}
