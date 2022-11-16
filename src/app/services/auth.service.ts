import { TokenService } from './token.service';
import { switchMap, tap, BehaviorSubject } from 'rxjs';
import { User } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}/api/auth`;
  // instancia el behavior subject || esot es reactividad entre componentes
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {
      email,
      password
    })
      .pipe(
        tap(response => this.tokenService.setToken(response.access_token))
      );
  }

  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.profile())
      );
  }

  logout() {
    this.tokenService.removeToken()
  }
}
