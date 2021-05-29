import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NodeBackendService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string){
    return this.httpClient.post(environment.nodeApiUri + '/login', {
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
}
