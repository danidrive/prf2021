import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/Product";
import {NodeBackendService} from "../../services/node-backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  products: Product[] = [];
  sum: number = 0;

  constructor(private nodeBackend: NodeBackendService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nodeBackend.listCart().subscribe(
      response => {
        this.products = response;
        for (const product of this.products) {
          this.sum += product.price * product.amount;
        }

        if (response.length === 0) {
          this.snackBar.open('Your cart is empty. Please visit the store first.', 'OK');
        }
      },
      error => {
        console.log(error.error);
      }
    );
  }

  order(){
    if (this.products.length === 0){
      this.snackBar.open('Your cart is empty. Please visit the store first.', 'OK');
      return;
    }

    this.nodeBackend.emptyCart().subscribe(
      next => {
        this.snackBar.open("Congratulations, you've just ordered a bunch of useless stuff! Thanks for your money!", 'OK');
        this.products = [];
        this.sum = 0;
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
