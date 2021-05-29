import { Component, OnInit } from '@angular/core';
import { NodeBackendService } from "../../services/node-backend.service";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MyErrorStateMatcher} from "../../utils/Matcher";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^[a-z0-9_\-]+$/i)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  passwordConfirmFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private nodeBackend: NodeBackendService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() { }

  register() {
    if (this.usernameFormControl.valid && this.emailFormControl.valid
      && this.passwordFormControl.valid && this.passwordConfirmFormControl.valid)
    {
      this.nodeBackend.register(this.usernameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value).subscribe(next => {
        this.snackBar.open('Successful registration! Now please log in.', 'OK');
        this.router.navigateByUrl('/login');
      },
      error => {
        if (error.error.message){
          this.snackBar.open(error.error.message, 'OK');
        } else {
          console.log(error.error);
          this.snackBar.open('Unknown error.', 'OK');
        }
      });
    }
  }
}
