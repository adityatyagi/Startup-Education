import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { DataTableResource } from 'angular-4-data-table';
import { DataTableResource } from '../../data-table';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: AngularFireList<{}>;
  // products:  Observable<any[]>;
  // filteredProducts: Observable<any[]>;
  products:  Product[];
  // filteredProducts: any[];

  // table of products objects
  tableResource: DataTableResource<Product>;

  observaleData: Observable<any>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();

    // initially setting the filtered products to the entire product list
    this.observaleData = this.products$.snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const value = a.payload.val();
          const key = a.payload.key;
          return {key, ...value};
        });
      })
    );

    // sending the data in array format
    this.observaleData.subscribe(data => {
      this.products = data;
      this.initializeTable(data);
    });
   }

   private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
      this.tableResource.query({ offset: 0})
        .then(items => this.items = items);

        // count() returns the total no. of records in the table
        this.tableResource.count()
          .then(count => this.itemCount = count);
   }

   reloadItems(params) {
    if (!this.tableResource) {
      return;
    }

    this.tableResource.query(params)
    .then(items => this.items = items);
   }

   filter(query: string) {
     console.log(query);
     const filteredProducts = this.products.filter(function(element) {
      return element.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
     });

     this.initializeTable(filteredProducts);
   }

  ngOnInit() {
  }

}
