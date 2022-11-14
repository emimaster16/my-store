import { SharedModule } from './../../../shared/shared.module';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
