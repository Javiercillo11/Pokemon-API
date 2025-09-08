import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myForm: FormGroup;
  loading = false;

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

  public onLogin(): void {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      this.authService.login(email, password).subscribe((success) => {
        if (success) {
          this.fakeLoading();
        } else {
          this.error();
          this.myForm.reset();
        }
      });
    }
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
