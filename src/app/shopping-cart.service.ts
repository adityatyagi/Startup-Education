import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // create cart - priavte because we dont want anyone to call this method from outside
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  // get cartid
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    // send object of user's cart identified by cartId containg the items sub-object, which have a list of items
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map(x => new ShoppingCart(x['items']))
    );
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    // if there is no cartId in localStorage, create the shopping cart for the user and save the token
    if (!cartId) {
      const result = await this.create(); // calling an async method synchronously
      localStorage.setItem('cartId', result.key);
      return result.key;
      }

    return cartId;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
    // // reference to user's shopping cart
    // const cartId = await this.getOrCreateCartId();
    // // console.log('productKey: ' + product.key);
    // // console.log('cartId: ' + cartId);
    // const item$ = this.getItem(cartId, product.key);
    // const item = item$.valueChanges();
    // item.pipe(take(1)).subscribe(x => {

    //   // LESS EFFICIENT WAY TO WRITE THE CODE
    //   if (x) {
    //     // console.log('product is present, increase quantity:' + JSON.stringify(y['quantity']));
    //     item$.update({ quantity: x['quantity'] + 1});
    //   } else {
    //     // console.log('add product to items in cart');
    //     item$.set({
    //       product: product,
    //       quantity: 1
    //     });
    //   }

    //   // console.log('product is present, increase quantity:' + JSON.stringify(y['quantity']));
    //   // item$.update({ product: product, quantity: (x['quantity'] || 0) + 1});

    // });
  }

  async removeFromCart(product: Product) {
      this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
       // reference to user's shopping cart
       const cartId = await this.getOrCreateCartId();
       const item$ = this.getItem(cartId, product.key);
       const item = item$.valueChanges();
       item.pipe(take(1)).subscribe(x => {
         if (x) {
           // console.log('product is present, increase quantity:' + JSON.stringify(y['quantity']));
           item$.update({ quantity: x['quantity'] + change});
         } else {
           // console.log('add product to items in cart');
           item$.set({
             product: product,
             quantity: 1
           });
         }
       });
  }

}
