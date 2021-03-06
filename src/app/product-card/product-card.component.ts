import { ShoppingCart } from './../models/shopping-cart';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    // if the user logs out and logs-in again, after he has created the cart, then we store the cart id in local storage
    // once he logs in again, we get the cart-id from the local storage, and if there was no cartId in local Storage, then create one on addding products
    this.shoppingCartService.addToCart(this.product);
  }
}
