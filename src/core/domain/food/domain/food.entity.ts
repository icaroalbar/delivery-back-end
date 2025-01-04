import { UUID } from "node:crypto";
import { Address } from "../../address/address.valueobject";
import { Menu } from "../../menu/menu.entity";
import { Payment } from "../../payment/payment.entity";
import { Delivery } from "../../delivery/delivery.entity";

export enum StatusType {
  AGUARDANDO_ACEITE = 1,
  PREPARANDO = 2,
  RECUSADO = 3,
  AGUARDANDO_ENTREGADOR = 4,
  COM_ENTREGADOR = 5,
  ENTREGUE = 6,
  CANCELADO = 7,
}

type FoodProps = {
  id: UUID;
  date: Date;
  phone: string;
  name: string;
  products: Menu[];
  address: Address;
  payment: Payment;
  delivery: Delivery | null;
  status: StatusType;
};

export class Food {
  private _food: FoodProps;

  constructor(food: Omit<FoodProps, "status" | "delivery">) {
    this._food = {
      ...food,
      status: StatusType.AGUARDANDO_ACEITE,
      delivery: null,
    };

    this.validatorFood(this._food);
  }

  private validatorFood(food: FoodProps) {
    if (!food.name || food.name.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!food.phone || !phoneRegex.test(food.phone)) {
      throw new Error(
        "Telefone é obrigatório e deve estar em um formato válido"
      );
    }

    if (!Object.values(StatusType).includes(food.status)) {
      throw new Error("Tipo de status inválido");
    }

    if (this.totalFood() !== this.getPayment().getValue()) {
      throw new Error(
        `Valor tem que ser igual R$${this.totalFood()}. Falta R$${
          this.totalFood() - this.getPayment().getValue()
        }`
      );
    }
  }

  estimatedDelivery(): string {
    const maxPreparationTime = Math.max(
      ...this._food.products.map((product) => product.getPreparationTime())
    );

    const estimatedDeliveryTime = 20;
    const calculateDeliveryTime = maxPreparationTime + estimatedDeliveryTime;

    const deliveryDate = new Date(this._food.date);
    deliveryDate.setMinutes(deliveryDate.getMinutes() + calculateDeliveryTime);

    return deliveryDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private updateStatus(status: StatusType): void {
    this._food = { ...this._food, status };
  }

  private updateDelivery(delivery: Delivery): void {
    this._food = { ...this._food, delivery };
  }

  private totalFood(): number {
    return this._food.products.reduce(
      (total, menu) => total + menu.getTotal(),
      0
    );
  }

  getId(): UUID {
    return this._food.id;
  }

  getDate(): Date {
    return this._food.date;
  }

  getName(): string {
    return this._food.name;
  }

  getPhone(): string {
    return this._food.phone;
  }

  getAddress(): Address {
    return this._food.address;
  }

  getProducts(): Menu[] {
    return this._food.products;
  }

  getPayment(): Payment {
    return this._food.payment;
  }

  getDelivery(): Delivery | null {
    return this._food.delivery;
  }

  getStatus(): StatusType {
    return this._food.status;
  }

  getTotal(): number {
    return this.totalFood();
  }

  addDelivery(delivery: Delivery): void {
    if (this._food.delivery) {
      throw new Error("Entregador já foi adicionado");
    }

    if (this._food.status !== StatusType.AGUARDANDO_ENTREGADOR) {
      throw new Error("Status inválido para enviar ao entregador");
    }

    this.updateDelivery(delivery);
    this.updateStatus(StatusType.COM_ENTREGADOR);
  }

  changeDelivery(delivery: Delivery): void {
    if (!this._food.delivery) {
      throw new Error("Nenhuma entrega para ser alterada");
    }
    this.updateDelivery(delivery);
  }

  accepted(): void {
    if (this._food.status !== StatusType.AGUARDANDO_ACEITE) {
      throw new Error("Status inválido para aceite");
    }
    this.updateStatus(StatusType.PREPARANDO);
  }

  refuse(): void {
    if (this._food.status !== StatusType.AGUARDANDO_ACEITE) {
      throw new Error("Status inválido para recusa");
    }
    this.updateStatus(StatusType.RECUSADO);
  }

  ready(): void {
    if (this._food.status !== StatusType.PREPARANDO) {
      throw new Error("Status inválido para pronto");
    }
    this.updateStatus(StatusType.AGUARDANDO_ENTREGADOR);
  }

  cancel(): void {
    if (this._food.status === StatusType.ENTREGUE) {
      throw new Error("Pedido já foi entregue, não pode ser cancelado");
    }
    this.updateStatus(StatusType.CANCELADO);
  }

  delivered(): void {
    if (this._food.status !== StatusType.COM_ENTREGADOR) {
      throw new Error("Status inválido para entregue");
    }
    this.updateStatus(StatusType.ENTREGUE);
  }

  toJSON() {
    return {
      id: this._food.id,
      date: this._food.date,
      phone: this._food.phone,
      name: this._food.name,
      products: this._food.products.map((product) => product.toJSON()),
      address: this._food.address,
      payment: this._food.payment,
      delivery: this._food.delivery,
      status: this._food.status,
      estimatedDelivery: this.estimatedDelivery(),
    };
  }
}
