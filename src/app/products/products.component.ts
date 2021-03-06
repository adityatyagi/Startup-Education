import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: AngularFireList<{}>;
  // categories$: AngularFireList<{}>; //  list of objects
  // categories;
  // observaleDataCategories: Observable<any>;
  observaleDataProducts: Observable<any>;
  category: string; // used for highlighting the currently selected category
  products:  Product[] = [];
  filteredProducts: Product[];
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

    // sending the data in array format
    // this.observaleDataProducts.subscribe(data => {
    //   this.products = data;
    // // as we are dealing with two async requests, first we need to ensure that we get the products from the db and then use the category from the url to filter it
    // // get the url params
    // route.queryParamMap.subscribe(params => {
    // // getting the value of the category in query parameter
    // this.category = params.get('category');
    // this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
    // });
    // });
  }

  private populateProducts() {
    this.products$ = this.productService.getAll();

    this.observaleDataProducts = this.products$.snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const value = a.payload.val();
          const key = a.payload.key;
          return {key, ...value};
        });
      })
    );

    this.observaleDataProducts.pipe(
      switchMap(data => {
        this.products = data;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      // initialising the category field, thus using it in the components - product-filter and products
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }
}
