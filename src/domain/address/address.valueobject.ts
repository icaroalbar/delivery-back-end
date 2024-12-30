import { UUID } from "node:crypto";

type AddressProps = {
  id: UUID;
  street: string;
  number: string;
  complement?: string;
  district: string;
  zipCode?: string;
};

export class Address {
  private readonly _address: AddressProps;

  constructor(address: AddressProps) {
    this.validatorAddress(address);
    this._address = address;
  }

  getId(): UUID {
    return this._address.id;
  }

  getStreet(): string {
    return this._address.street;
  }

  getNumber(): string {
    return this._address.number;
  }

  getComplement(): string | undefined {
    return this._address.complement;
  }

  getDistrict(): string {
    return this._address.district;
  }

  getZipCode(): string | undefined {
    return this._address.zipCode;
  }

  private validatorAddress(address: AddressProps): void {
    if (!address.street) {
      throw new Error("Nome da rua é obrigatório");
    }

    if (!address.number) {
      throw new Error("Número é obrigatório");
    }

    if (!address.district) {
      throw new Error("Bairro é obrigatório");
    }
  }
}
