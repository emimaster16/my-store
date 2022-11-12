import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../models/produc.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params) => {
        this.productId = params.get('id');
        if (this.productId) {
          return this.productsService.getOne(this.productId);
        }
        return [null];
      })
    ).subscribe(data => {
      this.product = data;
    })

  }

  goToBack() {
    this.location.back();
  }

}
