import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Transaction} from "../models/Transaction";

@Injectable({
  providedIn: 'root'
})
export class SpringBackendService {

  constructor(private httpClient: HttpClient) { }

  addTransaction(transaction: object){
    console.log(transaction);
    return this.httpClient.post(environment.springApiUri + '/transactions', transaction);
  }

  listTransactions(username: string){
    return this.httpClient.get<Transaction[]>(environment.springApiUri + '/transactions/' + username);
  }
}
