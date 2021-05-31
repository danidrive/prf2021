export class Transaction {
  id: string | undefined;
  timestamp: string | undefined;
  products: ProductsToBuy[] | undefined;
}

export class ProductsToBuy {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  amount: number | undefined;

  constructor(id: string | undefined, name: string | undefined, price: number | undefined, amount: number | undefined) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}
