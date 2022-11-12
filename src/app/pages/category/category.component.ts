import { Product } from './../../models/produc.model';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>`,
})
export class CategoryComponent implements OnInit {

  limit = 10;
  offset = 0;
  products: Product[] = [];
  categoryId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      })
    ).subscribe(data => {
      this.products = data;
    });
  }
  onLoadMore() {
    if (this.categoryId) {
      this.productService.getByCategory(this.categoryId, this.limit, this.offset).subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
  }

}
