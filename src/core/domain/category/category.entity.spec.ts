import { randomUUID } from "node:crypto";
import { Category } from "./category.entity";
import { uuidMatch } from "../../shared/uuidMatch";

describe("Category entity", () => {
  it("Deve criar uma nova categoria", () => {
    const category = new Category({ id: randomUUID(), name: "Pizza" });

    expect(category.getId()).toMatch(uuidMatch);
    expect(category.getName()).toBe("Pizza");
    expect(category.isAvailable()).toBe(true);
  });

  it("Deve lançar um erro se o nome estiver vazio", () => {
    expect(() => {
      new Category({ id: randomUUID(), name: "" });
    }).toThrow("Nome da categoria é obrigatório");
  });

  it("Deve desativar uma categoria", () => {
    const category = new Category({ id: randomUUID(), name: "Pizza" });

    category.deactivate();

    expect(category.getId()).toMatch(uuidMatch);
    expect(category.getName()).toBe("Pizza");
    expect(category.isAvailable()).toBe(false);
  });

  it("Deve ativar uma categoria", () => {
    const category = new Category({ id: randomUUID(), name: "Pizza" });

    category.deactivate();

    category.activate();
    expect(category.getId()).toMatch(uuidMatch);
    expect(category.getName()).toBe("Pizza");
    expect(category.isAvailable()).toBe(true);
  });
});
