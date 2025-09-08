import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/* ANGULAR MAT */
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pages', component: PokemonListComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
})
export class AuthModule {}
