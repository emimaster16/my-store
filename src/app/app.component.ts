import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private userService: UsersService) { }

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
