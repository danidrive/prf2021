import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/Product";
import {NodeBackendService} from "../../services/node-backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  constructor(private nodeBackend: NodeBackendService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nodeBackend.listCart().subscribe(
      response => {
        this.products = response;

        if (this.products.length === 0){
          this.snackBar.open('Your cart is empty. Please visit the store first.', 'OK');
        }
      },
      error => {
        console.log(error.error);
      }
    );
  }

  modifyCart(product: Product){
    this.nodeBackend.modifyCart(product._id, product.amount).subscribe(
      response => {
        this.snackBar.open('Successfully modified.', 'OK');
    }, error => {
        if (error.error.message){
          this.snackBar.open(error.error.message, 'OK');
        } else {
          console.log(error);
          this.snackBar.open('Unknown error.', 'OK');
        }
      });
  }

  removeFromCart(product: Product){
    this.nodeBackend.removeFromCart(product._id).subscribe(
      response => {
        this.products = this.products.filter(value => { return product._id !== value._id});
        this.snackBar.open('Successfully removed.', 'OK');
      }, error => {
        if (error.error.message){
          this.snackBar.open(error.error.message, 'OK');
        } else {
          console.log(error);
          this.snackBar.open('Unknown error.', 'OK');
        }
      });
  }
}
