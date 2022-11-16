import { OnExit } from './../../../guards/exit.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit() {
    let rta = confirm('Deseas salir');
    return rta;
  }

}
