import { Address } from "../../address/address.valueobject";
import { Menu } from "../../menu/menu.entity";
import { Payment, PaymentType } from "../../payment/payment.entity";
import { Category } from "../../category/category.entity";
import { Food } from "./food.entity";
import { randomUUID } from "node:crypto";
import { Delivery } from "../../delivery/domain/delivery.entity";

describe("Food entity", () => {
  it("Deve criar uma instância válida de Food", () => {
    const product1 = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 2,
      preparationTime: 10,
    });

    const product2 = new Menu({
      id: randomUUID(),
      name: "Pizza de chocolate",
      category: new Category({ id: randomUUID(), name: "Pizza doce" }),
      price: 50,
      quantity: 2,
      preparationTime: 10,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 200,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product1, product2],
      address,
      payment,
    });

    expect(food.getId()).toBeDefined();
    expect(food.getName()).toBe("Pedido Teste");
    expect(food.getPhone()).toBe("+5511999999999");
    expect(food.getAddress()).toEqual(address);
    expect(food.getPayment()).toEqual(payment);
    expect(food.getProducts()).toEqual([product1, product2]);
    expect(food.getStatus()).toBe(1);
    expect(food.getDelivery()).toBeNull();
    expect(food.getTotal()).toBe(200);
    expect(food.estimatedDelivery()).toBeDefined();
    expect(food.toJSON()).toBeDefined();
  });

  it("Deve mudar o status para recusado", () => {
    const product1 = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 2,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 100,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product1],
      address,
      payment,
    });

    food.refuse();
    expect(food.getStatus()).toBe(3);
  });

  it("Deve mudar o status para preparando", () => {
    const product1 = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 1,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 50,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product1],
      address,
      payment,
    });

    food.accepted();
    expect(food.getStatus()).toBe(2);
  });

  it("Deve mudar status para aguardando entregador", () => {
    const product1 = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 2,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 100,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product1],
      address,
      payment,
    });

    food.accepted();
    food.ready();
    expect(food.getStatus()).toBe(4);
  });

  it("Deve adicionar um entregador e mudar o status para com entregador", () => {
    const product1 = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 100,
      quantity: 2,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 200,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product1],
      address,
      payment,
    });

    food.accepted();
    food.ready();

    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    food.addDelivery(delivery);

    expect(food.getDelivery()).toBe(delivery);
    expect(food.getStatus()).toBe(5);
  });

  it("Deve mudar o status para entregue", () => {
    const product = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 1,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 50,
    });

    const food = new Food({
      id: randomUUID(),
      phone: "+5511999999999",
      date: new Date(),
      name: "Pedido Teste",
      products: [product],
      address,
      payment,
    });

    food.accepted();
    food.ready();

    const delivery = new Delivery({
      id: randomUUID(),
      name: "João",
      plate: "ABC-1234",
    });

    food.addDelivery(delivery);
    food.delivered();
    expect(food.getDelivery()).toBe(delivery);
    expect(food.getStatus()).toBe(6);
  });

  it("Deve lançar um erro quando o pagamento estiver diferente do valor total do pedido", () => {
    const product = new Menu({
      id: randomUUID(),
      name: "Pizza calabreza",
      category: new Category({ id: randomUUID(), name: "Pizza salgada" }),
      price: 50,
      quantity: 2,
      preparationTime: 20,
    });

    const address = new Address({
      id: randomUUID(),
      street: "Rua X",
      number: "123",
      district: "district",
    });

    const payment = new Payment({
      id: randomUUID(),
      type: PaymentType.DEBITO,
      value: 50,
    });

    expect(() => {
      new Food({
        id: randomUUID(),
        phone: "+5511999999999",
        date: new Date(),
        name: "Pedido Teste",
        products: [product],
        address,
        payment,
      });
    }).toThrow("Valor tem que ser igual R$100. Falta R$50");
  });
});
