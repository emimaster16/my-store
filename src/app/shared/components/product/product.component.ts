/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Product } from '../../../models/produc.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  @Input() product: Product = {
    description: '',
    category: {
      id: '',
      name: ''
    },
    images: [],
    title: '',
    price: 0,
    id: '',
    taxes: 0,
  };

  constructor() { }

  ngOnInit() {

  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id)
  }

}
