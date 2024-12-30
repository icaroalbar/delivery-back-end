import { UUID } from "node:crypto";

export enum PaymentType {
  DEBITO = 1,
  CREDITO = 2,
  PIX = 3,
  DINHEIRO = 4,
}

type PaymentProps = {
  id: UUID;
  type: PaymentType;
  value: number;
};

export class Payment {
  private readonly _payment: PaymentProps;

  constructor(payment: PaymentProps) {
    this.validatorPayment(payment);
    this._payment = payment;
  }

  private validatorPayment(payment: PaymentProps): void {
    if (
      ![
        PaymentType.DEBITO,
        PaymentType.CREDITO,
        PaymentType.PIX,
        PaymentType.DINHEIRO,
      ].includes(payment.type)
    ) {
      throw new Error("Tipo de pagamento inválido");
    }

    if (!payment.value || payment.value <= 0) {
      throw new Error(
        "Valor do pagamento é obrigatório e não pode ser menor ou igual a zero"
      );
    }
  }

  getId(): UUID {
    return this._payment.id;
  }

  getType(): PaymentType {
    return this._payment.type;
  }

  getValue(): number {
    return this._payment.value;
  }
}
