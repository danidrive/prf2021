import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../utils/Matcher";
import {NodeBackendService} from "../../services/node-backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required,]);
  passwordFormControl = new FormControl('', [Validators.required,]);
  matcher = new MyErrorStateMatcher();

  constructor(private nodeBackend: NodeBackendService,
              private session: SessionService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void { }

  login(){
    if (this.usernameFormControl.valid && this.passwordFormControl.valid)
    {
      this.nodeBackend.login(this.usernameFormControl.value, this.passwordFormControl.value).subscribe(
        response => {
          this.session.create(response.token, this.usernameFormControl.value);
          this.router.navigateByUrl('/products');
        },
        error => {
          if (error.status === 401){
            this.snackBar.open('Incorrect email or password. Please try again!', 'OK');
          } else if (error.error.message){
            this.snackBar.open(error.error.message, 'OK');
          } else {
            console.log(error);
            this.snackBar.open('Unknown error.', 'OK');
          }
        });
    }
  }
}
