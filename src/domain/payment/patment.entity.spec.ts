import { randomUUID } from "node:crypto";
import { Payment, PaymentType } from "./payment.entity";
import { uuidMatch } from "../../shared/uuidMatch";

describe("Payment entity", () => {
  it("Deve criar um novo pagamento", () => {
    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.PIX,
      value: 50,
    });

    expect(payment.getId()).toMatch(uuidMatch);
    expect(payment.getType()).toBe(3);
    expect(payment.getValue()).toBe(50);
  });

  it("Deve lançar um erro quando o preço estiver vazio, menor que zero ou igual a zero", () => {
    expect(() => {
      new Payment({
        id: randomUUID(),
        type: PaymentType.PIX,
        value: 0,
      });
    }).toThrow(
      "Valor do pagamento é obrigatório e não pode ser menor ou igual a zero"
    );
  });
});
