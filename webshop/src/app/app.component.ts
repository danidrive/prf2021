import { Component } from '@angular/core';
import {SessionService} from "./services/session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private session: SessionService) { }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  isLoggedOut() {
    return this.session.isLoggedOut();
  }

  logOut() {
    this.session.destroy();
  }
}
