import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CategoryService } from '../../category.service';
import { map } from 'rxjs/operators';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: AngularFireList<{}>; //  list of objects
  categories: Observable<any[]>;

  // we should have a blank object - useful when we are adding a new product, because when we are adding a new product, we are not going to get an object from the DB
  product = {};
  
  id;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
        this.productService.get(this.id).valueChanges().subscribe(item => {
          console.log(JSON.stringify(item));
          this.product = item;
        });

        // take(1).snapshotChanges().subscribe(p => this.product = p);
    }


    this.categories$ = categoryService.getCategories();
    this.categories = this.categories$.snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const value = a.payload.val();
          const key = a.payload.key;
          return {key, ...value};
        });
      }));
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
