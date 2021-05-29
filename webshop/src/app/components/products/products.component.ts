import { Component, OnInit } from '@angular/core';
import {NodeBackendService} from "../../services/node-backend.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private nodeBackend: NodeBackendService) { }

  ngOnInit(): void {
    this.nodeBackend.getProducts().subscribe(
      response => {
        response.forEach(product => product.amount = 0);
        this.products = response;
        console.log(this.products);
      },
        error => {
        console.log(error.error);
      }
    );
  }
}
