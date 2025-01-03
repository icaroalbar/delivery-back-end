import { uuidMatch } from "../../shared/uuidMatch";
import { Address } from "./address.valueobject";
import { randomUUID } from "node:crypto";

describe("Address value object", () => {
  it("Deve criar um novo endereço com complemento", () => {
    const address = new Address({
      id: randomUUID(),
      street: "Rua A",
      number: "100",
      zipCode: "12345-678",
      district: "Bairro A",
      complement: "Casa",
    });

    expect(address.getId()).toMatch(uuidMatch);
    expect(address.getStreet()).toBe("Rua A");
    expect(address.getNumber()).toBe("100");
    expect(address.getDistrict()).toBe("Bairro A");
    expect(address.getZipCode()).toBe("12345-678");
    expect(address.getComplement()).toBe("Casa");
  });

  it("Deve criar um novo endereço sem complemento", () => {
    const address = new Address({
      id: randomUUID(),
      street: "Rua A",
      number: "100",
      district: "Bairro A",
      zipCode: "12345-678",
    });

    expect(address.getId()).toMatch(uuidMatch);
    expect(address.getStreet()).toBe("Rua A");
    expect(address.getNumber()).toBe("100");
    expect(address.getDistrict()).toBe("Bairro A");
    expect(address.getZipCode()).toBe("12345-678");
    expect(address.getComplement()).toBeUndefined();
  });

  it("Deve criar um novo endereço sem CEP", () => {
    const address = new Address({
      id: randomUUID(),
      street: "Rua A",
      number: "100",
      district: "Bairro A",
    });

    expect(address.getId()).toMatch(uuidMatch);
    expect(address.getStreet()).toBe("Rua A");
    expect(address.getNumber()).toBe("100");
    expect(address.getDistrict()).toBe("Bairro A");
    expect(address.getZipCode()).toBeUndefined();
    expect(address.getComplement()).toBeUndefined();
  });

  it("Deve lançar um erro se a rua estiver vazio", () => {
    expect(() => {
      new Address({
        id: randomUUID(),
        street: "",
        number: "100",
        district: "Bairro A",
        zipCode: "12345-678",
      });
    }).toThrow("Nome da rua é obrigatório");
  });

  it("Deve lançar um erro se o número estiver vazio", () => {
    expect(() => {
      new Address({
        id: randomUUID(),
        street: "Rua A",
        number: "",
        district: "Bairro A",
        zipCode: "12345-678",
      });
    }).toThrow("Número é obrigatório");
  });

  it("Deve lançar um erro se o bairro estiver vazio", () => {
    expect(() => {
      new Address({
        id: randomUUID(),
        street: "Rua A",
        number: "100",
        district: "",
        zipCode: "12345-678",
      });
    }).toThrow("Bairro é obrigatório");
  });
});
