import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Transaction} from "../../models/Transaction";
import {SpringBackendService} from "../../services/spring-backend.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private springBackend: SpringBackendService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if (username === null){
      console.log('null');
      return;
    }

    this.springBackend.listTransactions(username).subscribe(
      response => {
        this.transactions = response;
      },
      error => {
        console.log(error.error);
      }
    );
  }
}
