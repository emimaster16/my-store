import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from './../../../services/categories.service';
import { StoreService } from './../../../services/store.service';
import { AuthService } from './../../../services/auth.service';
import { Category } from './../../../models/produc.model';
import { User } from './../../../models/user.model';


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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })

    this.authService.user$
      .subscribe(data => {
        this.profile = data;
      })

    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('emimaster16@gmail.com', '123456')
      .subscribe(() => {
        this.router.navigate(['/profile'])
      });
  }

  logout() {
    this.profile = null;
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  getAllCategories() {
    this.categoriesService.getAll(this.limit, this.offset).subscribe(data => {
      this.categories = data;
    })
  }
}
