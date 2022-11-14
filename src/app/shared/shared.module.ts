import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ImgComponent } from './components/img/img.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
  ],
  imports: [
    SwiperModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
  ]
})
export class SharedModule { }
