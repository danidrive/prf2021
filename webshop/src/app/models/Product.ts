export class Product {

  id: string;
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  stock: number;
  amount: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.manufacturer = '';
    this.price = 0;
    this.stock = 0;
    this.amount = 1;
  }
}
