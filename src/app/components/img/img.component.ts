import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent {

  @Input() img: string = '';

  @Output() loaded = new EventEmitter<string>();

  imgDefault = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor() {

  }


  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Log son');
    this.loaded.emit(this.img);
  }
}
