import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public onLogin(): void {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      this.authService.login(email, password);
      this.router.navigate(['/auth/pages']);
    }
  }
}
