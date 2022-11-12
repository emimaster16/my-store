import { Category } from './../../models/produc.model';
import { CategoriesService } from './../../services/categories.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { StoreService } from 'src/app/services/store.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  profile: User | null = null;

  activeMenu = false;
  counter: number = 0;
  limit: number = 10;
  offset: number = 0;

  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private storeService: StoreService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })

    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('emimaster16@gmail.com', '123456')
      .subscribe(user => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService.getAll(this.limit, this.offset).subscribe(data => {
      this.categories = data;
    })
  }
}
