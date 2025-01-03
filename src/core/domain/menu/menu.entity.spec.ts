import { randomUUID } from "node:crypto";
import { Category } from "../category/category.entity";
import { Menu } from "./menu.entity";
import { uuidMatch } from "../../shared/uuidMatch";

describe("Menu entity", () => {
  it("Deve criar uma nova opção no cardápio", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      description: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      image: "http://foto.com",
      quantity: 1,
      preparationTime: 20,
    });

    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBe("Hamburger de costela");
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBe("http://foto.com");
    expect(menu.isAvailable()).toBe(true);
    expect(menu.getQuantity()).toBe(1);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
    expect(menu.toJSON()).toBeDefined();
  });

  it("Deve desativar a opção no cardápio", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      description: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      image: "http://foto.com",
      quantity: 1,
      preparationTime: 20,
    });

    menu.deactivate();

    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBe("Hamburger de costela");
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBe("http://foto.com");
    expect(menu.isAvailable()).toBe(false);
    expect(menu.getQuantity()).toBe(1);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
  });

  it("Deve ativar a opção no cardápio", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      description: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      image: "http://foto.com",
      quantity: 1,
      preparationTime: 20,
    });

    menu.deactivate();
    expect(menu.isAvailable()).toBe(false);

    menu.active();
    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBe("Hamburger de costela");
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBe("http://foto.com");
    expect(menu.isAvailable()).toBe(true);
    expect(menu.getQuantity()).toBe(1);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
  });

  it("Deve lançar um erro quando o nome estiver vazio", () => {
    expect(() => {
      new Menu({
        id: randomUUID(),
        name: "",
        description: "Hamburger de costela",
        category: new Category({ id: randomUUID(), name: "Hamburger" }),
        price: 30,
        image: "http://foto.com",
        quantity: 1,
        preparationTime: 20,
      });
    }).toThrow("Nome do cardápio é obrigatório");
  });

  it("Deve lançar um erro quando a categoria estiver vazio", () => {
    expect(() => {
      new Menu({
        id: randomUUID(),
        name: "Hamburger de costela",
        description: "Hamburger de costela",
        category: new Category({ id: randomUUID(), name: "" }),
        price: 30,
        image: "http://foto.com",
        quantity: 1,
        preparationTime: 20,
      });
    }).toThrow("Nome da categoria é obrigatório");
  });

  it("Deve lançar um erro quando o preço estiver vazio, menor que zero ou igual a zero", () => {
    expect(() => {
      new Menu({
        id: randomUUID(),
        name: "Hamburger de costela",
        description: "Hamburger de costela",
        category: new Category({ id: randomUUID(), name: "Hamburger" }),
        price: 0,
        image: "http://foto.com",
        quantity: 1,
        preparationTime: 20,
      });
    }).toThrow("O preço é obrigatório e não pode ser menor ou igual a zero");
  });

  it("Deve criar uma nova opção no cardápio sem descrição", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      image: "http://foto.com",
      quantity: 1,
      preparationTime: 20,
    });

    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBeUndefined();
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBe("http://foto.com");
    expect(menu.isAvailable()).toBe(true);
    expect(menu.getQuantity()).toBe(1);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
  });

  it("Deve criar uma nova opção no cardápio sem imagem", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      description: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      quantity: 2,
      preparationTime: 20,
    });

    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBe("Hamburger de costela");
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBeUndefined();
    expect(menu.isAvailable()).toBe(true);
    expect(menu.getQuantity()).toBe(2);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
  });

  it("Deve mudar a quantidade no cardápio", () => {
    const menu = new Menu({
      id: randomUUID(),
      name: "Hamburger de costela",
      description: "Hamburger de costela",
      category: new Category({ id: randomUUID(), name: "Hamburger" }),
      price: 30,
      quantity: 1,
      preparationTime: 20,
    });

    menu.changeQuantity(3);

    expect(menu.getId()).toMatch(uuidMatch);
    expect(menu.getName()).toBe("Hamburger de costela");
    expect(menu.getDescription()).toBe("Hamburger de costela");
    expect(menu.getCategory()).toBe("Hamburger");
    expect(menu.getPrice()).toBe(30);
    expect(menu.getImage()).toBeUndefined();
    expect(menu.isAvailable()).toBe(true);
    expect(menu.getQuantity()).toBe(3);
    expect(menu.getPreparationTime()).toBe(20);
    expect(menu.getTotal()).toBe(menu.getQuantity() * menu.getPrice());
  });
});
