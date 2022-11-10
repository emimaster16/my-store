import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Product } from './models/produc.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private userService: UsersService) { }

  imgParent: string = '';

  age = 30;
  name = 'Eminson';
  btnDisabled = true;
  img = 'https://source.unsplash.com/random';

  person = {
    avatar: 'https://source.unsplash.com/random',
    name: 'Eminson Mendoza',
    age: 25,
  };

  register = {
    name: '',
    email: '',
    password: '',
  };

  newName: string = '';
  names: string[] = [
    'maissie',
    'john',
    'luisa',
    'nellys',
    'jessica'
  ];

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  incrementAge() {
    this.person.age++;
  }

  addName() {
    console.log(this.newName);
    if (this.newName) {
      this.names.push(this.newName);
      this.newName = '';
    }
  }

  deleteName(index: number) {
    this.names.splice(index, 1);
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);

  }
  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value
  }

  onRegister() {
    console.log(this.register)
  }

  onLoaded(img: string) {
    console.log('Log parent:' + img);

  }

  createUser() {
    this.userService.create({
      name: 'Eminson Mendoza',
      email: 'emimaster16@gmail.com',
      password: '123456'
    })
      .subscribe(response => {
        console.log(response);
      });
  }
}
