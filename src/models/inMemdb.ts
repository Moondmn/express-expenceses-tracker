import { z, ZodSchema, ZodError } from "zod";

export class InMemoryDatabase<T extends { id: number }> {
  private data: T[] = [];
  private schema: ZodSchema<T>;

  constructor(schema: ZodSchema<T>) {
    this.schema = schema;
  }

  public getNextId(): number {
    return this.data.length + 1;
  }

  public create(item: T): T {
    const validatedItem = this.schema.parse({ ...item, id: this.getNextId() });
    this.data.push(validatedItem);
    return validatedItem;
  }

  public findById(id: number): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  public find(format: (item: T) => boolean): T[] {
    return this.data.filter(format);
  }

  public list(): T[] {
    return [...this.data];
  }

  public update(id: number, updateData: Partial<T>): T | undefined {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.data[index], ...updateData };
    const validatedItem = this.schema.parse(updatedItem);
    this.data[index] = validatedItem;
    return validatedItem;
  }

  public delete(id: number): T | undefined {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const [deletedItem] = this.data.splice(index, 1);
    return deletedItem;
  }
}
