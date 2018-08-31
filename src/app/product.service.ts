import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  // create new product
  create(product) {
    this.db.list('/products').push(product);
  }

  // fetch all the products for product list
  getAll() {
    return this.db.list<Product>('/products');
  }

  // get a particular product
  get(productId) {
    return this.db.object('/products/' + productId);
  }

  // updating product
  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  // delete product
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
