export class Transaction {
  id: string | undefined;
  timestamp: string | undefined;
  products: ProductsToBuy[] | undefined;
}

export class ProductsToBuy {
  id: string = '';
  name: string ='';
  price: number = 0.0;
  amount: number = 0;

  constructor(id: string, name: string, price: number, amount: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}
