import { UUID } from "node:crypto";

type CategoryProps = {
  id: UUID;
  name: string;
};

export class Category {
  private readonly _category: CategoryProps & { available: boolean };

  constructor(category: CategoryProps) {
    if (!category.name) {
      throw new Error("Nome da categoria é obrigatório");
    }

    this._category = { ...category, available: true };
  }
  getId(): UUID {
    return this._category.id;
  }

  getName(): string {
    return this._category.name;
  }

  isAvailable(): boolean {
    return this._category.available;
  }

  activate(): void {
    this._category.available = true;
  }

  deactivate(): void {
    this._category.available = false;
  }
}
