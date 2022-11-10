import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token: string) {
    console.log(token);

    this.cookieService.set('token', token);
  }

  getToken() {
    return this.cookieService.get('token');
  }

}
