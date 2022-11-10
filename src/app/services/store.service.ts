import { Product } from '../models/produc.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  // instancia el behavior subject || esot es reactividad entre componentes
  private myCart = new BehaviorSubject<Product[]>([]);

  // Se asigna para la suscripcion
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    // se transmite la lista de productos a los que esten interesados
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => (sum += item.price), 0);
  }

  getMyShoppingCart() {
    return this.myShoppingCart;
  }

}
