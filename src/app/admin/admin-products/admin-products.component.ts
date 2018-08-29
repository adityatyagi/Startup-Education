import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: AngularFireList<{}>;
  products:  Observable<any[]>;
  filteredProducts: Observable<any[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();

    // initially setting the filtered products to the entire product list
    this.filteredProducts = this.products = this.products$.snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const value = a.payload.val();
          const key = a.payload.key;
          return {key, ...value};
        });
      })
    );
   }

   filter(query: string) {
     console.log(query);
     this.filteredProducts = this.products.pipe(
      map(x => {
        return x.filter(y => y.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
      })
    );
   }

  ngOnInit() {
  }

}
