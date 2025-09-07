import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  sendForm() {
    if(this.myForm.valid){
      console.log(this.myForm.value);
    }
  }
}
