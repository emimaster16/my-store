import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { Product, CreateProductDto, UpdateProductDto } from '../../models/produc.model';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  limit = 10;
  offset = 0;
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
  products: Product[] = [];
  myShoppingCart: Product[] = [];

  constructor(private storeService: StoreService, private productService: ProductsService) {
    this.myShoppingCart = storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onToggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productService.getProduct(id).subscribe(data => {
      this.onToggleProductDetail();
      this.productChosen = data;
    }, errorMsg => {
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
      console.log('created', data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDto = {
      title: 'Titulo maravilloso!'
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes).subscribe(data => {
      console.log('updated', data);

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

  loadMore() {
    this.productService.getAllProducts(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
