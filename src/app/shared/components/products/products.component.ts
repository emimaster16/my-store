import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { Product, CreateProductDto, UpdateProductDto } from '../../../models/produc.model';
import { StoreService } from './../../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  total: number = 0;
  today = new Date();
  showProductDetail = false;

  productChosen: Product = {
    description: '',
    category: {
      id: '',
      name: ''
    },
    images: [],
    title: '',
    price: 0,
    id: '',
  };

  @Output() loadMore = new EventEmitter();
  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  myShoppingCart: Product[] = [];

  constructor(private storeService: StoreService, private productService: ProductsService) {
    this.myShoppingCart = storeService.getMyShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onToggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getOne(id).subscribe(
      (data) => {
        this.productChosen = data;
      },
      (errorMsg) => {
        window.alert(errorMsg);
      });
  }

  createNewProduct() {
    const productDto: CreateProductDto = {
      images: ['https://www.shutterstock.com/image-vector/hola-vector-hand-drawn-lettering-600w-1794090130.jpg'],
      description: 'lorem impsum 2',
      title: 'Nuevo producto',
      categoryId: 1,
      price: 50000,
    };
    this.productService.create(productDto).subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDto = {
      title: 'Titulo maravilloso!'
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);

      this.products[productIndex] = data;
      this.productChosen = data;

    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

}
