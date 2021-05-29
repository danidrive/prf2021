import { Component, OnInit } from '@angular/core';
import { NodeBackendService } from "../../services/node-backend.service";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  constructor(private nodeBackend: NodeBackendService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  register() {
    if (this.usernameFormControl.valid && this.emailFormControl.valid
      && this.passwordFormControl.valid && this.passwordConfirmFormControl.valid)
    {
      this.nodeBackend.register(this.usernameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value).subscribe(next => {
        this.snackBar.open('Successful registration! Now please log in.', 'OK');
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
