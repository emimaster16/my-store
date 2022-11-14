import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from './../../../models/produc.model';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  productId: string | null = null;
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.onLoadMore();

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  onLoadMore() {
    this.productService.getAllProducts(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
