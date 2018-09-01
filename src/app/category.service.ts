import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/render3/query';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  // itemsRef;
  // items;
  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name'));
    }
  }

