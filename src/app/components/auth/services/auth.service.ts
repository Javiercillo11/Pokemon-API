import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<string> = new BehaviorSubject<string>('no user');
  public user$: Observable<string> = this.user.asObservable();

  constructor() {}

  public login(email: string, password: string): void {
    const username = this.extractUsernameFromEmail(email);
    this.user.next(username);
  }

  private extractUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }
}
