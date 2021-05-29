import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  create(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  destroy() {
    localStorage.removeItem("jwt");
  }

  public isLoggedIn() {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
