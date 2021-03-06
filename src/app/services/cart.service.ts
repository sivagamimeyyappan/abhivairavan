import { Injectable } from '@angular/core';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  public order: Order = new Order();

  addToCart(product) {
    this.order.items.push(product);
  }

  getItems() {
    return this.order.items;
  }

  clearCart() {
    this.order = new Order();
  }
}
