import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  sendForm() {
  if (this.myForm.valid) {
    const formData = this.myForm.value;

    this.authservice.register(formData).subscribe({
      next: (response) => {
        this.router.navigate(['auth/login']);
      },
      error: (err) => {
        console.error('Error en el registro', err);
      }
    });
  } else {
    console.warn('Formulario inválido');
    this.myForm.markAllAsTouched();
  }
}

}
