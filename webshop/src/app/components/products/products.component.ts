import { Component, OnInit } from '@angular/core';
import {NodeBackendService} from "../../services/node-backend.service";
import {Product} from "../../models/Product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private nodeBackend: NodeBackendService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nodeBackend.listProducts().subscribe(
      response => {
        response.forEach(product => product.amount = 0);
        this.products = response;
      },
        error => {
        console.log(error.error);
      }
    );
  }

  addToCart(product: Product){

    if (product.amount <= 0){
      this.snackBar.open('You must set the amount first!', 'OK');
      return;
    }

    this.nodeBackend.addToCart(product._id, product.amount).subscribe(
      next => {
        this.snackBar.open('Successfully added to your cart.', 'OK');
      },
      error => {
        if (error.error.message){
          this.snackBar.open(error.error.message, 'OK');
        } else {
          console.log(error);
          this.snackBar.open('Unknown error.', 'OK');
        }
      }
    )
  }
}
