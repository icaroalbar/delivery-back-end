import { UUID } from "node:crypto";
import { Category } from "../category/category.entity";

interface MenuProps {
  id: UUID;
  name: string;
  description?: string;
  category: Category;
  price: number;
  image?: string;
  quantity: number;
}

export class Menu {
  private readonly _menu: MenuProps & { available: boolean };

  constructor(menu: MenuProps) {
    this.validatorMenu(menu);
    this._menu = { ...menu, available: true };
  }

  getId(): UUID {
    return this._menu.id;
  }

  getName(): string {
    return this._menu.name;
  }

  getDescription(): string | undefined {
    return this._menu.description;
  }

  getCategory(): string {
    return this._menu.category.getName();
  }

  getQuantity(): number {
    return this._menu.quantity;
  }

  changeQuantity(quantity: number): void {
    if (quantity < 1) {
      throw new Error("A quantidade deve ser pelo menos 1");
    }
    this._menu.quantity = quantity;
  }

  getPrice(): number {
    return this._menu.price;
  }

  getTotal(): number {
    return this._menu.price * this._menu.quantity;
  }

  getImage(): string | undefined {
    return this._menu.image;
  }

  isAvailable(): boolean {
    return this._menu.available;
  }

  active(): void {
    if (!this._menu.available) {
      this._menu.available = true;
    }
  }

  deactivate(): void {
    if (this._menu.available) {
      this._menu.available = false;
    }
  }

  private validatorMenu(menu: MenuProps): void {
    if (!menu.name) {
      throw new Error("Nome do cardápio é obrigatório");
    }

    if (!menu.price || menu.price <= 0) {
      throw new Error(
        "O preço é obrigatório e não pode ser menor ou igual a zero"
      );
    }

    if (
      !menu.quantity ||
      menu.quantity < 1 ||
      !Number.isInteger(menu.quantity)
    ) {
      throw new Error("A quantidade deve ser um número inteiro positivo");
    }
  }
}
