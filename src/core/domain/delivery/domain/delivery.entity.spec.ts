import { randomUUID } from "node:crypto";
import { Delivery } from "./delivery.entity";
import { uuidMatch } from "../../../shared/uuidMatch";

describe("Delivery entity", () => {
  it("Deve criar um novo entregador", () => {
    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    expect(delivery.getId()).toMatch(uuidMatch);
    expect(delivery.getName()).toBe("João");
    expect(delivery.getPlate()).toBe("ABC-1234");
    expect(delivery.isAvailable()).toBe(true);
  });

  it("Deve ativar o entregador", () => {
    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    delivery.deactivate();
    expect(delivery.isAvailable()).toBe(false);

    delivery.active();

    expect(delivery.getId()).toMatch(uuidMatch);
    expect(delivery.getName()).toBe("João");
    expect(delivery.getPlate()).toBe("ABC-1234");
    expect(delivery.isAvailable()).toBe(true);
  });

  it("Deve desativar o entregador", () => {
    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    delivery.deactivate();

    expect(delivery.getId()).toMatch(uuidMatch);
    expect(delivery.getName()).toBe("João");
    expect(delivery.getPlate()).toBe("ABC-1234");
    expect(delivery.isAvailable()).toBe(false);
  });

  it("Deve lançar um erro se o nome estiver vazio", () => {
    expect(() => {
      new Delivery({
        id: randomUUID(),
        name: "",
        plate: "ABC-1234",
      });
    }).toThrow("Nome do entregador é obrigatório");
  });

  it("Deve lançar um erro se a placa estiver vazio", () => {
    expect(() => {
      new Delivery({
        id: randomUUID(),
        name: "João",
        plate: "",
      });
    }).toThrow("Placa do entregador é obrigatório");
  });

  it("Deve trocar o nome do entregador", () => {
    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    delivery.changeName("Maria");

    expect(delivery.getId()).toMatch(uuidMatch);
    expect(delivery.getName()).toBe("Maria");
    expect(delivery.getPlate()).toBe("ABC-1234");
    expect(delivery.isAvailable()).toBe(true);
  });
});
