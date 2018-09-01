import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories$: AngularFireList<{}>; //  list of objects
  categories;
  observaleDataCategories: Observable<any>;
  @Input('category') category;

  constructor(categoryService: CategoryService) {

    this.categories$ = categoryService.getAll();
    this.observaleDataCategories = this.categories$.snapshotChanges().pipe(
      map(items => {
        return items.map(a => {
          const value = a.payload.val();
          const key = a.payload.key;
          return {key, ...value};
        });
      }));

    // sending the data in array format
    this.observaleDataCategories.subscribe(data => {
      this.categories = data;
    });
   }
}
