import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from '../models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  myForm: FormGroup;
  loading = false;
  userData: User[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUser()
  }

  public onLogin(): void {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      this.authService.login(email, password).subscribe((success) => {
        if (success) {
          const fakeToken = '12$3NyQ6789a#bc91def';
          localStorage.setItem('token', fakeToken);
          this.fakeLoading();
        } else {
          this.error();
          this.myForm.reset();
        }
      });
    }
  }

  getUser(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  error() {
    this._snackBar.open('Usuario o contraseña incorrectos', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['auth/pages']);
    }, 1500);
  }
}
