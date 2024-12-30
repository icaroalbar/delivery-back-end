import { UUID } from "node:crypto";

type DeliveryProps = {
  id: UUID;
  name: string;
  plate: string;
};

export class Delivery {
  private readonly _delivery: DeliveryProps & { available: boolean };

  constructor(delivery: DeliveryProps) {
    this.validatorDelivery(delivery);
    this._delivery = { ...delivery, available: true };
  }

  getId(): UUID {
    return this._delivery.id;
  }

  getName(): string {
    return this._delivery.name;
  }

  getPlate(): string {
    return this._delivery.plate;
  }

  isAvailable(): boolean {
    return this._delivery.available;
  }

  changeName(name: string): void {
    this.validatorName(name);
    this._delivery.name = name;
  }

  active(): void {
    this._delivery.available = true;
  }

  deactivate(): void {
    this._delivery.available = false;
  }

  private validatorDelivery(delivery: DeliveryProps): void {
    this.validatorName(delivery.name);

    if (!delivery.plate) {
      throw new Error("Placa do entregador é obrigatório");
    }
  }

  private validatorName(name: string): void {
    if (!name) {
      throw new Error("Nome do entregador é obrigatório");
    }
  }
}
