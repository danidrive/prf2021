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

  getProducts(){
    return this.httpClient.get<Product[]>(environment.nodeApiUri + '/products');
  }

}
