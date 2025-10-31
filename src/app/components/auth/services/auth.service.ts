import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   getUsers(): Observable<User[]> {
    return this.http.get<any[]>('http://localhost:3000/usuarios')
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/registro', user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        return users.some(u => u.email === email && u.password === password);
      })
    );
  }

}