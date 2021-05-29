import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";
import {LoginResponse} from "../models/LoginResponse";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class NodeBackendService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string){
    return this.httpClient.post<LoginResponse>(environment.nodeApiUri + '/login', {
      username: username,
      password: password
    });
  }

  register(username: string, email: string, password: string){
    return this.httpClient.post(environment.nodeApiUri + '/register', {
      username: username,
      email: email,
      password: password
    });
  }

  listProducts(){
    return this.httpClient.get<Product[]>(environment.nodeApiUri + '/products');
  }

  addToCart(productId: string, amount: number){
    return this.httpClient.post(environment.nodeApiUri + '/cart', {
      product : productId,
      amount: amount
    });
  }

  listCart(){
    return this.httpClient.get<Product []>(environment.nodeApiUri + '/cart');
  }

  modifyCart(id: string, amount: number){
    return this.httpClient.put(environment.nodeApiUri + `/cart/${id}`, {
      amount: amount
    });
  }

  removeFromCart(id: string){
    return this.httpClient.delete(environment.nodeApiUri + `/cart/${id}`);
  }

  emptyCart(){
    return this.httpClient.delete(environment.nodeApiUri + `/cart`);
  }
}
