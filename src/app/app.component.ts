import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private userService: UsersService) { }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile()
        .subscribe();
    }

  }

  createUser() {
    this.userService.create({
      name: 'Eminson Mendoza',
      email: 'emimaster16@gmail.com',
      password: '123456',
      role: 'customer'
    })
      .subscribe(response => {
        console.log(response);
      });
  }
}
